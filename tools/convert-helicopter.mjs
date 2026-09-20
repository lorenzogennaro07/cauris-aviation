import fs from 'node:fs';
import { DOMParser } from '@xmldom/xmldom';
import { Document, NodeIO } from '@gltf-transform/core';
import { dedup, weld, prune, meshopt } from '@gltf-transform/functions';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptEncoder } from 'meshoptimizer';
import { Matrix4, Matrix3, Vector3 } from 'three';
const xml=new DOMParser().parseFromString(fs.readFileSync('public/models/source/ec135/ec135.dae','utf8'),'text/xml');
const children=(n,tag)=>Array.from(n.childNodes).filter(c=>c.nodeType===1&&(!tag||c.tagName===tag));
const first=(n,tag)=>children(n,tag)[0];
const nums=n=>n.textContent.trim().split(/\s+/).map(Number);
const geometries=new Map(Array.from(xml.getElementsByTagName('geometry')).map(g=>[g.getAttribute('id'),g]));
const doc=new Document();const buffer=doc.createBuffer();
const mats={};
for(const [name,color,metal,rough] of [
 ['paint',[.82,.85,.84,1],.35,.27],['glass',[.016,.065,.085,1],.68,.12],
 ['black',[.015,.023,.03,1],.35,.32],['metal',[.22,.25,.27,1],.8,.26],
]) mats[name]=doc.createMaterial(name).setBaseColorFactor(color).setMetallicFactor(metal).setRoughnessFactor(rough).setDoubleSided(true);
const buckets={};const nodeStats=[];
const scene=doc.createScene('Executive light helicopter');
function visit(node,parent=new Matrix4()){
 const name=node.getAttribute('name')||node.getAttribute('id');
 if(/blurred|rotor_disc|SLLight|searchlight|Hemi|BigRadom|DoubleCargoHook|IBF|multifunctioncarrier|nosefl|roundstep|smallradom|triangle|windscreen_tri|wirecutter/i.test(name))return;
 const mat=first(node,'matrix');
 const world=parent.clone().multiply(mat?new Matrix4().fromArray(nums(mat)).transpose():new Matrix4());
 for(const inst of children(node,'instance_geometry')){
  const geom=geometries.get(inst.getAttribute('url').slice(1));if(!geom)continue;
  const mesh=first(geom,'mesh');
  const sources=new Map(children(mesh,'source').map(s=>[s.getAttribute('id'),{array:nums(first(s,'float_array')),stride:Number(s.getElementsByTagName('accessor')[0].getAttribute('stride'))}]));
  const verts=first(mesh,'vertices');const vertSource=first(verts,'input').getAttribute('source');
  const bindings=new Map(Array.from(inst.getElementsByTagName('instance_material')).map(m=>[m.getAttribute('symbol'),m.getAttribute('target')]));
  for(const poly of children(mesh).filter(p=>['polylist','triangles'].includes(p.tagName))){
   const inputs=children(poly,'input').map(i=>({semantic:i.getAttribute('semantic'),offset:Number(i.getAttribute('offset')),source:i.getAttribute('semantic')==='VERTEX'?vertSource:i.getAttribute('source')}));
   const stride=Math.max(...inputs.map(i=>i.offset))+1;const ids=nums(first(poly,'p'));
   const counts=poly.tagName==='triangles'?Array(Number(poly.getAttribute('count'))).fill(3):nums(first(poly,'vcount'));
   const target=bindings.get(poly.getAttribute('material'))||'';
   const key=/glas/i.test(target+name)?'glass':/Black|blade|Rotor|wiper/i.test(target+name)?'black':/Mast|Flex|exhaust|pitchlink|scissor|swash/i.test(target+name)?'metal':'paint';
   const b=buckets[key]??={p:[],n:[]};let cursor=0;
   const normalMatrix=new Matrix3().getNormalMatrix(world);
   for(const count of counts){
    for(let tri=1;tri<count-1;tri++) for(const index of [0,tri,tri+1]){
     for(const input of inputs.filter(i=>['VERTEX','NORMAL'].includes(i.semantic))){
      const source=sources.get(input.source.slice(1));const idx=ids[(cursor+index)*stride+input.offset]*source.stride;
      const v=new Vector3(...source.array.slice(idx,idx+3));
      if(input.semantic==='VERTEX'){v.applyMatrix4(world);b.p.push(v.x,v.z,-v.y);}
      else {v.applyMatrix3(normalMatrix).normalize();b.n.push(v.x,v.z,-v.y);}
     }
    }cursor+=count;
   }
   nodeStats.push({name,key,triangles:counts.reduce((s,n)=>s+n-2,0)});
  }
 }
 for(const child of children(node,'node'))visit(child,world);
}
const visual=xml.getElementsByTagName('visual_scene')[0];for(const n of children(visual,'node'))visit(n);
let min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
for(const b of Object.values(buckets))for(let i=0;i<b.p.length;i++) {const k=i%3;min[k]=Math.min(min[k],b.p[i]);max[k]=Math.max(max[k],b.p[i]);}
const center=min.map((v,i)=>(v+max[i])/2);
for(const [key,b] of Object.entries(buckets)){
 for(let i=0;i<b.p.length;i++)b.p[i]-=center[i%3];
 const prim=doc.createPrimitive().setAttribute('POSITION',doc.createAccessor().setType('VEC3').setArray(new Float32Array(b.p)).setBuffer(buffer)).setMaterial(mats[key]);
 if(b.n.length===b.p.length)prim.setAttribute('NORMAL',doc.createAccessor().setType('VEC3').setArray(new Float32Array(b.n)).setBuffer(buffer));
 scene.addChild(doc.createNode(key).setMesh(doc.createMesh(key).addPrimitive(prim)));
}
await MeshoptEncoder.ready;
await doc.transform(weld(),dedup(),prune(),meshopt({encoder:MeshoptEncoder,level:'high'}));
await new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder}).write('public/models/helicopter.glb',doc);
console.log(JSON.stringify({bounds:{min,max},nodes:nodeStats,bytes:fs.statSync('public/models/helicopter.glb').size},null,2));
