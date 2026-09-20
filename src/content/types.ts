export interface SiteContent {
 brandName:string;description:string;skip:string;
 nav:{connection:string;experience:string;hospitality:string;company:string;contact:string;menu:string;close:string;upcoming:string;label:string};
 hero:{title:[string,string];supporting:string;cta:string;aviation:string;contact:string;modelAlt:string;caption:string};
 transition:{lead:string;title:[string,string]};
 departure:{label:string;title:string;copy:string;alt:string;location:string};
 crossing:{label:string;title:string;copy:string;cockpitAlt:string};
 map:{title:string;accessible:string};
 arrival:{title:[string,string];alt:string;edits:string};
 credits:{title:string;source:string;adaptation:string;note:string};
}
