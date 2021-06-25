import * as THREE from "three";
import { Config } from "../config";

export default class Wheel extends THREE.Mesh {
  constructor() {
    const { zoom } = Config;
    const geom = new THREE.BoxBufferGeometry(12 * zoom, 33 * zoom, 12 * zoom);
    const material = new THREE.MeshPhongMaterial({ color: 0x333333, flatShading: true });

    super(geom, material);
  }
}
