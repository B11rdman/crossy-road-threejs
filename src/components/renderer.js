import * as THREE from "three";

export default class Renderer {
  constructor(scene, container) {
    this._scene = scene;
    this._container = container;
    this.threeRenderer = this._initRenderer();
    this._container.appendChild(this.threeRenderer.domElement);
  }

  updateSize() {
    this.threeRenderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
  }

  render(scene, camera) {
    this.threeRenderer.render(scene, camera);
  }

  _initRenderer() {
    const threeRenderer = new THREE.WebGLRenderer();

    threeRenderer.setClearColor(0xeeeeee, 1.0);
    threeRenderer.setSize(innerWidth, innerHeight);

    threeRenderer.shadowMap.enabled = true;
    threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    return threeRenderer;
  }
}
