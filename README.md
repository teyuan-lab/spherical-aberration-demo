# Shape factor & spherical aberration

Interactive, dependency-free English teaching demo. [Open demo](https://teyuan-lab.github.io/spherical-aberration-demo/).

Adjust lens shape factor, refractive index, and collimated-beam radius; compare symmetric, plano-convex, and meniscus forms. Exact ray paths, a magnified focus view, and a shape sweep update together. The minimum button finds the least absolute marginal longitudinal spherical aberration over q = -2 to +2 in steps of 0.005.

## Model

Light travels left to right; positive radii have curvature centers to the right. q = (R2 + R1)/(R2 - R1) = (c1 + c2)/(c1 - c2). q=+1 is curved-face-first plano-convex. The effective focal length stays 100 mm and center thickness stays 6 mm. For each q and n, solve P=(n-1)[c1-c2+t(n-1)c1*c2/n]=1/100 for the curvatures. Paraxial back focal length is [1-t(n-1)c1/n]/P. Exact spherical sag intersections and vector Snell refraction determine each finite ray. Longitudinal SA is paraxial BFL minus marginal BFL. The close-up coordinate origin is the rear vertex.

The minimum depends on aperture, index, and thickness. It is not a universal thin-lens shape optimum or a minimum-wavefront-error result. Flip reverses q within this fixed-EFL family, recomputing the radii. Diagrams use independent horizontal/vertical scales. No diffraction, dispersion, Fresnel losses, or off-axis aberrations. All computation stays in the browser.

## Run and verify

Open index.html directly, or use `node serve.cjs` for http://127.0.0.1:8790. Run `node verify.cjs` for the physical checks. No build or installation is required.

## References

- [University of Denver: Topics in Ray Optics](https://mysite.du.edu/~etuttle/optics/geop.htm).
- [Edmund Optics: Optics Application Examples](https://www.edmundoptics.eu/knowledge-center/application-notes/optics/optics-application-examples/).


