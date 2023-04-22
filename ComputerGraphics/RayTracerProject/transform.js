export function rotate2D(angle = 0) {
  return [
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1]
  ];
}

export function shearX(sx) {
  return [
    [1, sx, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
}

export function shearY(sy) {
  return [
    [1, 0, 0],
    [sy, 1, 0],
    [0, 0, 1]
  ];
}

export function scale2D(sx = 1, sy = 1) {
  return [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1]
  ];
}

export function translate2D(dx = 0, dy = 0) {
  return [
    [1, 0, dx],
    [0, 1, dy],
    [0, 0, 1]
  ];
}

export function rotate(angle = 0, axis = "z") {
  switch (axis) {
    case "z":
    case "w":
    case 2:
      return [
        [Math.cos(angle), -Math.sin(angle), 0, 0],
        [Math.sin(angle), Math.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];
    case "y":
    case "v":
    case 1:
      return [
        [Math.cos(angle), 0, Math.sin(angle), 0],
        [0, 1, 0, 0],
        [-Math.sin(angle), 0, Math.cos(angle), 0],
        [0, 0, 0, 1]
      ];
    case "x":
    case "u":
    case 0:
      return [
        [1, 0, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle), 0],
        [0, Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 0, 1]
      ];
  }
}

export function scale(sx = 1, sy = 1, sz = 1) {
  return [
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1]
  ];
}

export function translate(dx = 0, dy = 0, dz = 0) {
  return [
    [1, 0, 0, dx],
    [0, 1, 0, dy],
    [0, 0, 1, dz],
    [0, 0, 0, 1]
  ];
}
