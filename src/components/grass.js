import * as THREE from "three";
import { BoardWidth, Config } from "../config";

export default class Grass extends THREE.Group {
  constructor() {
    super();

    this._build();
  }

  _build() {
    this.add((this._middle = this._getMiddleSection()));
    this.add((this._left = this._getLeftSection()));
    this.add((this._right = this._getRightSection()));

    this.position.z = 1.5 * Config.zoom;
  }

  _getMiddleSection() {
    const middle = this._createSection(0xbaf455);
    middle.receiveShadow = true;

    return middle;
  }

  _getLeftSection() {
    const left = this._createSection(0x99c846);
    left.position.x = -BoardWidth * Config.zoom;

    return left;
  }

  _getRightSection() {
    const right = this._createSection(0x99c846);
    right.position.x = BoardWidth * Config.zoom;

    return right;
  }

  _createSection(color) {
    const { zoom, positionWidth } = Config;

    const geom = new THREE.PlaneBufferGeometry(BoardWidth * zoom, positionWidth * zoom);
    const material = new THREE.MeshPhongMaterial({ color });
    const section = new THREE.Mesh(geom, material);

    return section;
  }
}
