import * as THREE from "three";

export default class VehicleTexture extends THREE.CanvasTexture {
  constructor(config) {
    const { width, height, pointsArr, color1, color2 } = config;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    context.fillStyle = color1;
    context.fillRect(0, 0, width, height);

    context.fillStyle = color2;
    pointsArr.forEach((p) => {
      context.fillRect(p.x, p.y, p.w, p.y);
    });

    super(canvas);
  }
}
