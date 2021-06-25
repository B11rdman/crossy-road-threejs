import * as THREE from "three";

export default class Light {
  constructor() {
    this.dirLight = this._initDirLight();
    this.hemiLight = this._initHemiLight();
    this.backLight = this._initBackLight();
  }

  addLights(scene) {
    scene.add(this.dirLight);
    scene.add(this.hemiLight);
    scene.add(this.backLight);
  }

  setDirLightTarget(target) {
    this.dirLight.target = target;
  }

  _initDirLight() {
    const initialDirLightPositionX = -100;
    const initialDirLightPositionY = -100;
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(initialDirLightPositionX, initialDirLightPositionY, 200);
    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    const d = 500;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    return dirLight;
  }

  _initHemiLight() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);

    return hemiLight;
  }

  _initBackLight() {
    const backLight = new THREE.DirectionalLight(0x000000, 0.4);
    backLight.position.set(200, 200, 50);
    backLight.castShadow = true;

    return backLight;
  }
}
