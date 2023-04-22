/** Vector arithmetic and operations. */

export function magnitude(a) {
  return Math.sqrt(dot(a, a));
}

export function norm(a) {
  const len = magnitude(a);
  const a_unit = new Array(a.length);
  for (let i = 0; i < a.length; ++i) {
    a_unit[i] = a[i] / len;
  }
  return a_unit;
  //return a.map(ai => ai / magnitude); // elegant but slower
}

export function mult(k, a) {
  const ka = new Array(a.length);
  for (let i = 0; i < a.length; ++i) {
    ka[i] = k * a[i];
  }
  return ka;
  //return a.map(ai => k * ai); // elegant but slower
}

export function add(a, b) {
  const a_plus_b = new Array(a.length);
  for (let i = 0; i < a.length; ++i) {
    a_plus_b[i] = a[i] + b[i];
  }
  return a_plus_b;
  //return a.reduce((c, ai, i) => { c.push(ai + b[i]); return c; }, []); // elegant but slower
}

export function diff(a, b) {
  const a_minus_b = new Array(a.length);
  for (let i = 0; i < a.length; ++i) {
    a_minus_b[i] = a[i] - b[i];
  }
  return a_minus_b;
  //return a.reduce((c, ai, i) => { c.push(ai - b[i]); return c; }, []); // elegant but slower
}

export function dot(a, b) {
  let r = 0;
  for (let i = 0; i < a.length; ++i) {
    r += a[i] * b[i];
  }
  return r;
  //return a.reduce((r, ai, i) => r + ai * b[i], 0); // elegant but slower
}

/* Defined only for three-component vectors. */
export function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}