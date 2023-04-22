import * as RGB from "./rgbcolor.js";
import * as Vec from "./vecmath.js";
import Ray from "./ray.js";

export function UnLight() {}

UnLight.prototype.shade = function (hit) {
  if (typeof hit === "undefined") return undefined;
  return hit.object.material.color;
}

export function PointLight(position, color) {
  this.position = position;
  this.intensity = color;
}

PointLight.prototype.shade = function (hit) {
  if (typeof hit === "undefined") return undefined;

  let shadedColor;
  let l = Vec.diff(this.position, hit.p);

  // Shadows
  const shadowRay = new Ray(hit.p, l);
  if (hit.scene.intersect(shadowRay, 100 * Number.EPSILON, 1)) {
    return shadedColor;
  }

  const r = Vec.magnitude(l);
  const v = Vec.norm(Vec.mult(-1, hit.r.direction));
  l = Vec.norm(l);

  const E = Vec.mult(Math.max(0, Vec.dot(hit.n, l)) / r ** 0, this.intensity);
  const h = Vec.norm(Vec.add(l, v));
  const k = RGB.add(hit.s.material.diffuse, Vec.mult(Vec.dot(hit.n, h) ** hit.s.material.shininess, hit.s.material.specular));
  const kE = RGB.mult(k, E);
  return kE;
}
export function LightGroup() {
  this.lights = [];
}

LightGroup.prototype.addLight = function (light) {
  this.lights.push(light);
}

LightGroup.prototype.shade = function (hit) {
  if (typeof hit === "undefined") return undefined;
  let L = [0, 0, 0];
  this.lights.forEach(light => {
    const Li = light.shade(hit);
    if (Li) L = Vec.add(L, Li);
  });
  return L;
}

export function AmbientLight(color) {
  this.color = color;
}

AmbientLight.prototype.shade = function (hit) {
  if (typeof hit === "undefined") return undefined;
  return RGB.mult(this.color, hit.s.material.diffuse);
}

