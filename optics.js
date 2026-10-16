(function(root){
'use strict';
const F=100,T=6;
function lens(q,n){const b=n-1,a=T*b*b/n*(q*q-1)/4,k=2/F/(b+Math.sqrt(b*b+4*a/F));const c1=k*(q+1)/2,c2=k*(q-1)/2;return {q,n,c1,c2,r1:c1?1/c1:Infinity,r2:c2?1/c2:Infinity,f:F,t:T,fp:T+F*(1-T*(n-1)*c1/n)};}
function sag(c,y){return c*y*y/(1+Math.sqrt(1-c*c*y*y));}
function refract(d,c,y,eta){const normal=[Math.sqrt(1-c*c*y*y),-c*y],dot=d[0]*normal[0]+d[1]*normal[1],tx=eta*(d[0]-dot*normal[0]),ty=eta*(d[1]-dot*normal[1]),s=1-tx*tx-ty*ty;if(s<0)throw Error('Total internal reflection');return [tx+Math.sqrt(s)*normal[0],ty+Math.sqrt(s)*normal[1]];}
function trace(l,h){const p1=[sag(l.c1,h),h],d1=refract([1,0],l.c1,h,1/l.n);let u=(l.t-p1[0])/d1[0];for(let i=0;i<12;i++){let y=p1[1]+u*d1[1],g=p1[0]+u*d1[0]-l.t-sag(l.c2,y);u-=g/(d1[0]-l.c2*y/Math.sqrt(1-l.c2*l.c2*y*y)*d1[1]);}const p2=[p1[0]+u*d1[0],p1[1]+u*d1[1]],d2=refract(d1,l.c2,p2[1],l.n);return {h,p1,p2,d1,d2,focus:h===0?l.fp:p2[0]-p2[1]*d2[0]/d2[1]};}
function lsa(l,a){return l.fp-trace(l,a).focus;}
function optimum(n,a){let best={q:0,value:Infinity};for(let i=0;i<=800;i++){const q=-2+i/200,v=Math.abs(lsa(lens(q,n),a));if(v<best.value)best={q,value:v};}return best;}
const api={lens,sag,trace,lsa,optimum};if(typeof module!=='undefined')module.exports=api;else root.Optics=api;
})(typeof window!=='undefined'?window:globalThis);
