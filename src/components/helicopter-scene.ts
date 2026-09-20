import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
export async function mountHelicopter(host: HTMLElement, onReady: () => void) {
 const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<768?1.35:1.75));
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.setClearColor(0x000000,0); renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=0.9;
 host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(32,1,.1,100);
 camera.position.set(17,3.6,-9); camera.lookAt(0,-.15,0);
 const pmrem=new THREE.PMREMGenerator(renderer), room=new RoomEnvironment(), environment=pmrem.fromScene(room,.04);
 scene.environment=environment.texture; room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xdceaf0,0x173846,2.3));
 const sun=new THREE.DirectionalLight(0xfff4df,2.6);sun.position.set(-6,12,-8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;sun.shadow.normalBias=.025;scene.add(sun);
 const rim=new THREE.DirectionalLight(0xb3d9ec,2);rim.position.set(8,5,8);scene.add(rim);
 let disposed=false,frame=0,visible=true,model:THREE.Group|undefined;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)"),section=host.closest(".flight-sequence") as HTMLElement;
 const render=()=>{frame=0;if(disposed||!visible||document.hidden||!model)return;
  const p=reduced.matches?0:THREE.MathUtils.clamp(-section.getBoundingClientRect().top/(section.offsetHeight-innerHeight),0,1);
  model.rotation.set(.02+p*.035,-.15+p*.32,-.035+p*.045);model.position.set(p*.75,-p*.15,p*.5);renderer.render(scene,camera);
 };
 const requestRender=()=>{if(!frame&&!disposed)frame=requestAnimationFrame(render);};
 const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.fov=innerWidth<768?28:32;camera.position.set(17,3.6,-9);camera.updateProjectionMatrix();requestRender();};
 const ro=new ResizeObserver(resize);ro.observe(host);
 const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;requestRender();});io.observe(host);
 window.addEventListener("scroll",requestRender,{passive:true});document.addEventListener("visibilitychange",requestRender);reduced.addEventListener("change",requestRender);
 const lost=(e:Event)=>{e.preventDefault();host.dataset.failed="true";};renderer.domElement.addEventListener("webglcontextlost",lost);
 const cleanup=()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();window.removeEventListener("scroll",requestRender);document.removeEventListener("visibilitychange",requestRender);reduced.removeEventListener("change",requestRender);renderer.domElement.removeEventListener("webglcontextlost",lost);model?.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});environment.dispose();renderer.dispose();renderer.domElement.remove();};
 try {
  const gltf=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync("/models/helicopter.glb");model=gltf.scene;
  model.traverse(o=>{if(!(o instanceof THREE.Mesh))return;const old=o.material as THREE.MeshStandardMaterial;const m=new THREE.MeshPhysicalMaterial({color:old.color,metalness:old.metalness,roughness:old.roughness,clearcoat:1,clearcoatRoughness:.13,envMapIntensity:1.15,side:THREE.DoubleSide});if(old.name==="glass"){m.color.set("#16323c");m.metalness=.58;m.roughness=.09;m.envMapIntensity=1.8;}o.castShadow=true;o.receiveShadow=true;if(old.name==="paint"){
 m.color.set("#c5d0d2");m.metalness=.42;m.roughness=.26;
 m.onBeforeCompile=(shader)=>{
  shader.vertexShader=shader.vertexShader.replace("#include <common>","#include <common>\nvarying float vPaintHeight;").replace("#include <begin_vertex>","#include <begin_vertex>\nvPaintHeight=(modelMatrix*vec4(position,1.0)).y;");
  shader.fragmentShader=shader.fragmentShader.replace("#include <common>","#include <common>\nvarying float vPaintHeight;").replace("#include <color_fragment>","#include <color_fragment>\nfloat upper=smoothstep(-0.25,-0.21,vPaintHeight); diffuseColor.rgb *= mix(vec3(0.025,0.09,0.14),vec3(1.0),upper);");
 };
}o.material=m;old.dispose();});
  scene.add(model);resize();render();onReady();
 }catch(error){cleanup();throw error;}
 return cleanup;
}
