import * as Vec from "./vecmath.js";

export default function Ray(origin, direction) {
    this.origin = origin;
    this.direction = direction;
}

Ray.prototype.evaluate = function (t) {
  return Vec.add(this.origin, Vec.mult(t, this.direction));
}