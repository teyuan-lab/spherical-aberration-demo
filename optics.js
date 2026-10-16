(function(root){
'use strict';
const T=6;
function lens(q,n,bfl=100){const b=n-1,a=bfl*T*b*b/n*(q*q-1)/4,d=bfl*b+T*b*(q+1)/(2*n),k=2/(d+Math.sqrt(d*d+4*a));const c1=k*(q+1)/2,c2=k*(q-1)/2,P=b*(c1-c2+T*b*c1*c2/n);return {q,n,c1,c2,r1:c1?1/c1:Infinity,r2:c2?1/c2:Infinity,f:1/P,t:T,fp:T+bfl};}
function sag(c,y){return c*y*y/(1+Math.sqrt(1-c*c*y*y));}
function refract(d,c,y,eta){const normal=[Math.sqrt(1-c*c*y*y),-c*y],dot=d[0]*normal[0]+d[1]*normal[1],tx=eta*(d[0]-dot*normal[0]),ty=eta*(d[1]-dot*normal[1]),s=1-tx*tx-ty*ty;if(s<0)throw Error('Total internal reflection');return [tx+Math.sqrt(s)*normal[0],ty+Math.sqrt(s)*normal[1]];}
function trace(l,h){
 if(Math.abs(l.c1*h)>=1||Math.abs(l.c2*h)>=1)throw Error('Beam exceeds spherical surface');
 if(l.t+sag(l.c2,h)<=sag(l.c1,h))throw Error('Lens surfaces overlap at this beam height');
 const p1=[sag(l.c1,h),h],d1=refract([1,0],l.c1,h,1/l.n);
 let u;
 if(Math.abs(l.c2)<1e-14)u=(l.t-p1[0])/d1[0];
 else{const r=1/l.c2,dx=p1[0]-l.t-r,dy=h,b=dx*d1[0]+dy*d1[1],disc=b*b-(dx*dx+dy*dy-r*r);
 if(disc<0)throw Error('Ray misses rear surface');
 const candidates=[-b-Math.sqrt(disc),-b+Math.sqrt(disc)].filter(v=>v>1e-9).filter(v=>{const x=p1[0]+v*d1[0],y=h+v*d1[1];return Math.abs(x-l.t-sag(l.c2,y))<1e-7;});
 if(!candidates.length)throw Error('Ray misses rear surface');u=Math.min(...candidates);}
 if(!(u>0))throw Error('No forward rear-surface intersection');
 const p2=[p1[0]+u*d1[0],h+u*d1[1]],d2=refract(d1,l.c2,p2[1],l.n);
 const focus=h===0?l.fp:p2[0]-p2[1]*d2[0]/d2[1];if(!Number.isFinite(focus))throw Error('No finite transmitted focus');
 return {h,p1,p2,d1,d2,focus};
}
function safeTrace(l,h){try{return trace(l,h);}catch{return null;}}
function lsa(l,a){const r=safeTrace(l,a);return r?l.fp-r.focus:NaN;}
function optimum(n,a,bfl=100){let best={q:null,value:Infinity};for(let i=0;i<=1200;i++){const q=-3+i/200,v=Math.abs(lsa(lens(q,n,bfl),a));if(v<best.value)best={q,value:v};}return best;}
const api={lens,sag,trace,safeTrace,lsa,optimum};if(typeof module!=='undefined')module.exports=api;else root.Optics=api;
})(typeof window!=='undefined'?window:globalThis);
