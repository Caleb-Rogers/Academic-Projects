/** RGB color operations. */

export function complement(c) {
  const c1 = new Array(c.length);
  for (let i = 0; i < c.length; ++i) {
    c1[i] = 1.0 - c[i];
  }
  return c1;
  //return a.map(ai => 1.0 - ai);
}

// af * cf + ab * (1 - af) * cb
// 1 * cf + 1 * 0 * cb = cf
export function add(c1, c2) {
  const c3 = new Array(c1.length);
  for (let i = 0; i < c1.length; ++i) {
    c3[i] = Math.min(c1[i] + c2[i], 1.0);
  }
  return c3;
  //return a.reduce((c, ai, i) => { c.push(Math.min(ai + b[i], 1.0)); return c; }, []);
}

export function diff(c1, c2) {
  const c3 = new Array(a.length);
  for (let i = 0; i < a.length; ++i) {
    c3[i] = Math.max(a[i] - c2[i], 0.0);
  }
  return c3;
  //return a.reduce((c, ai, i) => { c.push(Math.max(ai - b[i], 0.0)); return c; }, []);
}

export function mult(c1, c2) {
  const c3 = new Array(c1.length);
  for (let i = 0; i < c1.length; ++i) {
    c3[i] = c1[i] * c2[i];
  }
  return c3;
  //return c1.map((ci, i) => ci * c2[i]);
}

export function mult1(k, c) {
  const kc = new Array(c.length);
  for (let i = 0; i < c.length; ++i) {
    kc[i] = k * c[i];
  }
  return kc;
  //return c.map(ci => k * ci); // elegant but slower
}

export function blend(cf, cb) {
  const af = cf[3];
  const ab = cb[3];
  const fa = 1 - af;
  const a0 = af + ab * fa;
  return mult1(1 / a0, add(mult1(af, cf), mult1(fa, cb)));
}

export function str(a) {
  return "rgb(" + Math.round(255 * a[0])
    + "," + Math.round(255 * a[1])
    + "," + Math.round(255 * a[2])
    + ")";
}