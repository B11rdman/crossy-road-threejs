import * as THREE from "three";
import { Config } from "../config";

export default class Camera {
  constructor(renderer) {
    this.threeCamera = this._getCamera();
    this._updateSize(renderer);

    window.addEventListener("resize", this._updateSize.bind(this, renderer), false);
  }

  _getCamera() {
    const { distance } = Config;
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      10000
    );

    camera.rotation.x = (50 * Math.PI) / 180;
    camera.rotation.y = (20 * Math.PI) / 180;
    camera.rotation.z = (10 * Math.PI) / 180;

    const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
    const initialCameraPositionX = Math.tan(camera.rotation.y) * Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);

    camera.position.set(initialCameraPositionX, initialCameraPositionY, distance);

    return camera;
  }

  _updateSize(renderer) {
    const { width, height } = renderer.domElement;
    this.threeCamera.aspect = width / height;
    this.threeCamera.updateProjectionMatrix();
  }
}
