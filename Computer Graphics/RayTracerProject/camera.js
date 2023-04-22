import {
  degreesToRadians
} from "./genmath.js";
import * as Vec from "./vecmath.js";
import Ray from "./ray.js";

function Camera(e, u, v, w, d) {
  this.e = e;
  this.u = u;
  this.v = v;
  this.w = w;
  this.d = d;
}

/* Convert from screen/pixel coordinates to camera coordinates. */
Camera.prototype.screenToCamera = function (i, j) {
  // u-coordinate for the pixel's image
  const u = this.left + (this.right - this.left) * (i + 0.5) / this.viewport.width;
  // v-coordinate for the pixel's image
  const v = this.top - (this.top - this.bottom) * (j + 0.5) / this.viewport.height;
  return [u, v];
}

export function LinearPerspectiveCamera(eye, ref, up, fov, near, far) {
  const w = Vec.norm(Vec.diff(eye, ref));
  const u = Vec.norm(Vec.cross(up, w));
  const v = Vec.cross(w, u);

  Camera.call(this, eye, u, v, w, near);

  this.fov = degreesToRadians(fov);
}

LinearPerspectiveCamera.prototype = Object.create(Camera.prototype);

LinearPerspectiveCamera.prototype.target = function (viewport) {
  this.viewport = viewport;
  // bounds of the image rectangle in World Space coordinates
  this.top = this.d * Math.tan(this.fov / 2);
  this.right = this.top * viewport.width / viewport.height;
  this.bottom = -this.top;
  this.left = -this.right;
}

/* Generate viewing ray through the pixel with given coordinates */
LinearPerspectiveCamera.prototype.project = function (i, j) {
  const [u, v] = this.screenToCamera(i, j);
  const dx = Vec.mult(u, this.u);
  const dy = Vec.mult(v, this.v);
  const dz = Vec.mult(this.d, this.w);
  return new Ray(this.e, Vec.diff(Vec.add(dx, dy), dz));
};
