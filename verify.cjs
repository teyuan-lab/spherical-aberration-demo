const assert=require('node:assert/strict'),O=require('./optics.js');
let cases=0;
for(const n of [1.45,1.5,1.6,1.8])for(const q of [-2,-1,0,.7,1,2])for(const a of [2,6,10,12]){
 const l=O.lens(q,n),P=(n-1)*(l.c1-l.c2+l.t*(n-1)/n*l.c1*l.c2);
 assert.ok(Math.abs(P-.01)<1e-12,'fixed EFL');assert.ok(Math.abs(O.trace(l,.0001).focus-l.fp)<1e-6,'paraxial limit');
 const r=O.trace(l,a),neg=O.trace(l,-a);assert.ok(Math.abs(r.focus-neg.focus)<1e-10,'symmetry');
 assert.ok(Number.isFinite(r.focus)&&r.focus>l.t,'real focus');assert.ok(l.t+O.sag(l.c2,a)-O.sag(l.c1,a)>0,'positive edge thickness');
 const s1=Math.abs(r.d1[0]*a*l.c1+r.d1[1]*Math.sqrt(1-(a*l.c1)**2));assert.ok(Math.abs(s1*n-Math.abs(a*l.c1))<1e-12,'Snell first surface');
 cases++;
}
assert.ok(O.lsa(O.lens(1,1.5),10)<O.lsa(O.lens(-1,1.5),10),'correct plano-convex orientation');
assert.ok(O.lsa(O.lens(0,1.5),5)<O.lsa(O.lens(0,1.5),10),'stopping down');
const best=O.optimum(1.5,10);assert.ok(best.q>.5&&best.q<1,'expected best-form range');
console.log(`${cases} physical configurations passed; best q=${best.q}, LSA=${best.value.toFixed(6)} mm`);
