import * as Vec from "./vecmath.js";
import Hit from "./hit.js";

/* Representation of a group of surfaces */

export function Group() {
  this.surfaces = [];
}

Group.prototype.intersect = function (ray, tmin = 1, tmax = Infinity, match = "nearest") {
  let nearest = undefined;
  if (match === "nearest") {
    for (let obj of this.surfaces) {
      const hit = obj.intersect(ray, tmin, tmax, match);
      if (hit) {
        nearest = hit;
        tmax = nearest.t;
      }
    }
  } else if (match === "any") {
    for (let obj of this.surfaces) {
      nearest = obj.intersect(ray, tmin, tmax, match);
      if (nearest) break;
    }
  }
  return nearest;
};

Group.prototype.addSurface = function (s) {
  this.surfaces.push(s);
  return this;
}

/* Representation of spherical surface */

export function Sphere(center, radius, material) {
  this.center = center;
  this.radius = radius;
  this.material = material;
}

Sphere.prototype.intersect = function (ray, tmin = 1, tmax = Infinity) {
  // terms needed for the quadratic formula
  const A = Vec.dot(ray.direction, ray.direction);
  const ec = Vec.diff(ray.origin, this.center);
  const B = Vec.dot(ray.direction, ec);
  const C = Vec.dot(ec, ec) - this.radius * this.radius;

  const discriminant = B * B - A * C;
  if (discriminant >= 0) {
    // parameter t for the intersection
    const t = (-B - Math.sqrt(discriminant)) / A;
    if (t > tmin && t < tmax) {
      return new Hit(t, ray, this);
    }
  }
};

Sphere.prototype.normal = function (p) {
  const n = Vec.mult(1 / this.radius, Vec.diff(p, this.center));
  return n;
}

export function Plane(p0, n, material) {
  this.n = Vec.norm(n);
  this.p0_dot_n = Vec.dot(p0, this.n);
  this.material = material;
}

Plane.prototype.intersect = function (ray, tmin = 1, tmax = Infinity) {
  const d_dot_n = Vec.dot(ray.direction, this.n);
  if (Math.abs(d_dot_n) > 100 * Number.EPSILON) {
    const t = (this.p0_dot_n - Vec.dot(ray.origin, this.n)) / d_dot_n;
    if (t > tmin && t < tmax)
      return new Hit(t, ray, this);
  }
}

Plane.prototype.normal = function (p) {
  return this.n;
}



