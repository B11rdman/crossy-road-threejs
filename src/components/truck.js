import * as THREE from "three";
import { pickRandom, TruckTextureConfig, VehicleColors } from "../config";
import VehicleTexture from "./texture";
import Wheel from "./wheel";
const WheelConfig = {
  front: {
    x: 38,
    y: 0,
    z: 6,
  },
  middle: {
    x: 0,
    y: 0,
    z: 6,
  },
  back: {
    x: -30,
    y: 0,
    z: 6,
  },
};

export default class Truck extends THREE.Group {
  constructor() {
    super();

    this._build();
  }

  _build() {
    this._buildWheels();
    this._buildTrailer();
    this._buildConnector();
    this._buildCabin();
  }

  _buildWheels() {
    this.add((this._backWheel = this._getWheel("back")));
    this.add((this._middleWheel = this._getWheel("middle")));
    this.add((this._frontWheel = this._getWheel("front")));
  }

  _buildTrailer() {
    const geom = new THREE.BoxBufferGeometry(60, 30, 30);
    const color = pickRandom(VehicleColors);
    const material = new THREE.MeshLambertMaterial({ color });

    this._trailer = new THREE.Mesh(geom, material);

    this._trailer.position.set(-15, 0, 20);
    this._trailer.castShadow = true;
    this._trailer.receiveShadow = true;

    this.add(this._trailer);
  }

  _buildConnector() {
    const geom = new THREE.BoxBufferGeometry(40, 15, 5);
    const material = new THREE.MeshLambertMaterial({ color: 0x999999 });

    this._connector = new THREE.Mesh(geom, material);
    this._connector.position.set(20, 0, 9);

    this.add(this._connector);
  }

  _buildCabin() {
    const color = pickRandom(VehicleColors);

    const faceConfig = TruckTextureConfig["face"];
    faceConfig.color1 = color;
    faceConfig.color2 = "#000000";

    const sideConfig = TruckTextureConfig["side"];
    sideConfig.color1 = color;
    sideConfig.color2 = "#000000";

    const frontTexture = new VehicleTexture(faceConfig);
    frontTexture.center = new THREE.Vector2(0.5, 0.5);
    frontTexture.rotation = Math.PI / 2;

    const backTexture = new VehicleTexture(faceConfig);
    backTexture.center = new THREE.Vector2(0.5, 0.5);
    backTexture.rotation = -Math.PI / 2;

    const rightTexture = new VehicleTexture(sideConfig);
    const leftTexture = new VehicleTexture(sideConfig);
    leftTexture.flipY = false;

    const geom = new THREE.BoxBufferGeometry(28, 30, 30);
    const material = new THREE.MeshLambertMaterial({ color });

    this._cabin = new THREE.Mesh(geom, [
      new THREE.MeshLambertMaterial({ map: frontTexture }),
      new THREE.MeshLambertMaterial({ map: backTexture }),
      new THREE.MeshLambertMaterial({ map: leftTexture }),
      new THREE.MeshLambertMaterial({ map: rightTexture }),
      material,
      material,
    ]);

    this._cabin.position.set(40, 0, 20);
    this._cabin.castShadow = true;
    this._cabin.receiveShadow = true;

    this.add(this._cabin);
  }

  _getWheel(type) {
    const { x, y, z } = WheelConfig[type];

    const wheel = new Wheel();

    wheel.position.set(x, y, z);
    wheel.castShadow = false;
    wheel.receiveShadow = false;

    return wheel;
  }
}
