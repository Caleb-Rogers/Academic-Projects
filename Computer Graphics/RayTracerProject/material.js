import * as RGB from "./rgbcolor.js";
import * as Vec from "./vecmath.js";

/* Representation of object's material properties */

export function LambertianMaterial(reflectanceColor) {
  this.diffuse = reflectanceColor;
}

export function BlinnPhongMaterial(reflectanceColor, specularColor, shininess) {
  LambertianMaterial.call(this, reflectanceColor);
  this.specular = specularColor;
  this.shininess = shininess;
}

export function ReflectiveBlinnPhongMaterial(reflectanceColor, specularColor, shininess, mirrorColor) {
  BlinnPhongMaterial.call(this, reflectanceColor, specularColor, shininess);
  this.reflection = mirrorColor;
}