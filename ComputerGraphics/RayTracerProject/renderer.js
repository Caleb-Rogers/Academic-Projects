import {
  degreesToRadians
} from "./genmath.js";
import * as Vec from "./vecmath.js";
import * as RGB from "./rgbcolor.js";
import Ray from "./ray.js";

/* Scene representation */
export function Renderer(light, camera, action) {
  this.epsilon = 0.0001;

  // default background color when no intersection is found
  this.backgroundColor = [0.6, 0.8, 0.9, 1];

  // a Light object (must have a valid shade method)
  this.light = light;
  this.lights = [];

  // simple definition for a linear-perspective viewer
  this.camera = camera;

  // the scene is just a Surface object (must have a valid intersect() method)
  this.action = action;
}

/* Basic ray tracing algorithm. */
Renderer.prototype.render = function (viewport) {
  const context = viewport.getContext("2d");
  const imgBuffer = context.createImageData(viewport.width, viewport.height);
  this.camera.target(viewport);
  // for each pixel... (top to bottom, left to right, scanline order)
  this.nsamples = 4;
  for (let j = 0; j < viewport.height; j++)
    for (let i = 0; i < viewport.width; i++) {
      let color = [0, 0, 0];
      for (let k = 0; k < this.nsamples; k++) {
        // 1. ray generation
        const ray = this.camera.project(i,j);

        // 2. compute intersections (hit) and determine shading color
        const shadeColor = this.shade(ray);

        // 3. shading
        color = RGB.add(color, Vec.mult(1 / this.nsamples, shadeColor));
      }
      this.drawPixel(imgBuffer, i, j, color);
    }

  context.putImageData(imgBuffer, 0, 0);
};

Renderer.prototype.addLight = function (light) {
  this.lights.push(light);
}

Renderer.prototype.shade = function (ray, tmin = 1, tmax = Infinity) {
  const hit = this.action.intersect(ray, tmin, tmax);
  let color = this.backgroundColor;
  if (hit) {
    hit.scene = this.action;
    color = [0, 0, 0];

    // Multiple lights
    for (let light of this.lights) {
      const ci = light.shade(hit);
      if (ci)
      color = RGB.add(color, ci);
    }
    if (Math.min(color[0], color[1], color[2]) > 0.8) {
      const a = color;
    }

    /**
    * Mirror Reflections:
    *   - compute reflection from ray's hit
    *   - then, add new mirror material that uses this
    * Transparency:
    *   - use compositing formula
    */

    // Mirror Reflection
    if (hit.s.material.reflection) {
      const r = Vec.diff(ray.direction, Vec.mult(2 * Vec.dot(ray.direction, hit.n), hit.n));
      const reflectRay = new Ray(hit.p, r);
      color = RGB.add(color, RGB.mult(hit.s.material.reflection, this.shade(reflectRay, 100 * Number.EPSILON)));
    }

    // Transparency
    color[3] = hit.s.material.diffuse[3];
    if (color[3] < 1) {
      const cb = this.shade(ray, hit.t);
      color = RGB.blend(color, cb);
    }

  }
  return color;
}

/* Draw a single pixel on the embedded canvas context. */
Renderer.prototype.drawPixel = function (buffer, i, j, color) {
  let pixelIndex = (j * buffer.width + i) * 4;
  buffer.data[pixelIndex++] = color[0] * 255;
  buffer.data[pixelIndex++] = color[1] * 255;
  buffer.data[pixelIndex++] = color[2] * 255;
  buffer.data[pixelIndex] = 255;
}
