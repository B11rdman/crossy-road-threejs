import * as THREE from "three";
import { Config } from "../config";

export default class VehicleTexture extends THREE.CanvasTexture {
  constructor(config) {
    const { zoom } = Config;
    const { width, height, pointsArr, color1, color2 } = config;
    const canvas = document.createElement("canvas");
    canvas.width = width * zoom;
    canvas.height = height * zoom;
    const context = canvas.getContext("2d");

    context.fillStyle = color1;
    context.fillRect(0, 0, width * zoom, height * zoom);

    context.fillStyle = color2;
    pointsArr.forEach((p) => {
      context.fillRect(p.x * zoom, p.y * zoom, p.w * zoom, p.y * zoom);
    });

    super(canvas);
  }
}
