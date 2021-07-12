import * as THREE from "three";
import { Config } from "../config";

export default class Chick extends THREE.Group {
  constructor() {
    super();

    this._build();
  }

  _build() {
    this._buildBody();
    this._buildHead();
  }

  _buildBody() {
    const { chickenSize, zoom } = Config;

    const geom = new THREE.BoxBufferGeometry(chickenSize * zoom, chickenSize * zoom, 20 * zoom);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(geom, material);

    body.position.z = 10 * zoom;
    body.castShadow = true;
    body.receiveShadow = true;

    this.add((this._body = body));
  }

  _buildHead() {
    const { zoom } = Config;

    const geom = new THREE.BoxBufferGeometry(2 * zoom, 4 * zoom, 2 * zoom);
    const material = new THREE.MeshPhongMaterial({ color: 0xf5314b });
    const head = new THREE.Mesh(geom, material);

    head.position.z = 21 * zoom;
    head.castShadow = true;
    head.receiveShadow = true;

    this.add((this._head = head));
  }
}
