import * as THREE from "three";
import { Config, pickRandom, ThreeHeights } from "../config";

export default class Tree extends THREE.Group {
  constructor() {
    super();

    this._height = pickRandom(ThreeHeights);
    this._build();
  }

  _build() {
    const { zoom } = Config;
    this._buildBody(zoom);
    this._buildLeaves(zoom);
  }

  _buildBody(zoom) {
    const geom = new THREE.BoxBufferGeometry(15 * zoom, 15 * zoom, 20 * zoom);
    const material = new THREE.MeshPhongMaterial({ color: 0x4d2926 });
    const body = new THREE.Mesh(geom, material);

    body.position.z = 10 * zoom;
    body.castShadow = true;
    body.receiveShadow = true;

    this.add((this._body = body));
  }

  _buildLeaves(zoom) {
    const geom = new THREE.BoxBufferGeometry(30 * zoom, 30 * zoom, this._height * zoom);
    const material = new THREE.MeshLambertMaterial({ color: 0x7aa21d });
    const head = new THREE.Mesh(geom, material);

    head.position.z = (this._height / 2 + 20) * zoom;
    head.castShadow = true;
    head.receiveShadow = false;

    this.add((this._head = head));
  }
}
