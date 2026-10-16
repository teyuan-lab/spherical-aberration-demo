# Shape factor & spherical aberration

Interactive, dependency-free English teaching demo. [Open demo](https://teyuan-lab.github.io/spherical-aberration-demo/).

Adjust lens shape factor, refractive index, paraxial back focal length (25–200 mm), and collimated-beam radius; compare symmetric, plano-convex, and meniscus forms. Exact ray paths, a magnified focus view, and a shape sweep update together. The minimum button finds the least absolute marginal longitudinal spherical aberration over q = -3 to +3 in steps of 0.005.

## Model

Light travels left to right; positive radii have curvature centers to the right. q = (R2 + R1)/(R2 - R1) = (c1 + c2)/(c1 - c2). q=+1 is curved-face-first plano-convex. The selected paraxial BFL stays fixed (default 100 mm) while q or n changes; center thickness stays 6 mm. Effective focal length is derived and displayed separately. Let B be the selected BFL, t=6 mm, b=n-1, c1=k(q+1)/2, and c2=k(q-1)/2. Solve A*k^2+D*k-1=0 with A=B*t*b^2*(q^2-1)/(4*n), D=B*b+t*b*(q+1)/(2*n), and the stable root k=2/(D+sqrt(D^2+4*A)). Power is P=b[c1-c2+t*b*c1*c2/n], EFL=1/P, and BFL=[1-t*b*c1/n]/P. Exact spherical sag intersections and vector Snell refraction determine each finite ray. Longitudinal SA is paraxial BFL minus marginal BFL. The close-up coordinate origin is the rear vertex.

The minimum depends on aperture, index, and thickness. It is not a universal thin-lens shape optimum or a minimum-wavefront-error result. Flip reverses q within this fixed-BFL family, recomputing the radii. Diagrams use independent horizontal/vertical scales. No diffraction, dispersion, Fresnel losses, or off-axis aberrations. All computation stays in the browser.

## Run and verify

Open index.html directly, or use `node serve.cjs` for http://127.0.0.1:8790. Run `node verify.cjs` for the physical checks. No build or installation is required.

## References

- [University of Denver: Topics in Ray Optics](https://mysite.du.edu/~etuttle/optics/geop.htm).
- [Edmund Optics: Optics Application Examples](https://www.edmundoptics.eu/knowledge-center/application-notes/optics/optics-application-examples/).



At short BFL or extreme bending, some beam radii exceed the physical spherical lens or undergo total internal reflection. The demo marks an unavailable marginal focus, omits those curve segments, and excludes them from the optimum search. Reduce beam radius to recover a transmitted marginal ray.

## Movable screen

The screen slider sets its distance 10–250 mm from the rear vertex. A green plane in the ray diagram and an image of the on-axis point source update together. The paraxial-focus button places the screen at the selected BFL. The image samples 4,096 equal-area entrance-pupil rays over a uniformly illuminated circular beam, rotates meridional ray intercepts around the axis, and bins them into screen pixels. Invalid rays and rays whose exit point lies beyond the screen are excluded. The field-width selector fixes the physical image scale; changing screen position does not auto-rescale the image. The readout reports geometric RMS radius over all rays reaching the screen, sampled ray fraction, and any light outside the displayed field. Brightness uses a logarithmic scale with automatic exposure; no diffraction, sensor response, Fresnel losses, or absolute photometry is modeled.
