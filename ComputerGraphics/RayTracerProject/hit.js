import * as Vec from "./vecmath.js";

/* Hit record structure */
export default function Hit(t, r, s) {
  this.r = r; // ray: origin(e) & direction
  this.t = t; // intersection
  this.s = s; // sphere: center, radius, material(diffuse,specular,shininess)
  this.p = r.evaluate(this.t); // point p
  this.n = s.normal(this.p); // surface normal vector at point p
}
