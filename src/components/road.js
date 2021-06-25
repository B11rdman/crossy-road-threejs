import * as THREE from "three";
import Config from "../config";

export default class Road extends THREE.Group {
  constructor() {
    super();

    this._build();
  }

  _build() {
    this.add((this._middle = this._getMiddleSection()));
    this.add((this._left = this._getLeftSection()));
    this.add((this._right = this._getRightSection()));

    this.position.z = 1.5 * zoom;
  }

  _getMiddleSection() {
    const middle = this._createSection(0x454a59);
    middle.receiveShadow = true;

    return middle;
  }

  _getLeftSection() {
    const left = this._createSection(0x393d49);
    left.position.x = -BoardWidth * zoom;

    return left;
  }

  _getRightSection() {
    const right = this._createSection(0x393d49);
    right.position.x = BoardWidth * zoom;

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
