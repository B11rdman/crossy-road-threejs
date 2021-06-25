import * as THREE from "three";
import { CarTextureConfig, pickRandom, VehicleColors } from "../config";
import VehicleTexture from "./texture";
import Wheel from "./wheel";

export default class Car extends THREE.Group {
  constructor() {
    super();

    this._build();
  }

  _build() {
    this._buildWheels();
    this._buildBody();
    this._buildCabin();
  }

  _buildWheels() {
    this.add((this._backWheel = this._getWheel("back")));
    this.add((this._frontWheel = this._getWheel("front")));
  }

  _buildBody() {
    const geom = new THREE.BoxBufferGeometry(60, 30, 15);
    const color = pickRandom(VehicleColors);
    const material = new THREE.MeshLambertMaterial({ color });

    this._body = new THREE.Mesh(geom, material);
    this._body.position.set(0, 0, 12);

    this._body.castShadow = true;
    this._body.receiveShadow = false;

    this.add(this._body);
  }

  _buildCabin() {
    const frontTexture = new VehicleTexture(CarTextureConfig["face"]);
    frontTexture.center = new THREE.Vector2(0.5, 0.5);
    frontTexture.rotation = Math.PI / 2;

    const backTexture = new VehicleTexture(CarTextureConfig["face"]);
    backTexture.center = new THREE.Vector2(0.5, 0.5);
    backTexture.rotation = -Math.PI / 2;

    const rightTexture = new VehicleTexture(CarTextureConfig["side"]);
    const leftTexture = new VehicleTexture(CarTextureConfig["side"]);
    leftTexture.flipY = false;

    const geom = new THREE.BoxBufferGeometry(33, 24, 12);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });

    this._cabin = new THREE.Mesh(geom, [
      new THREE.MeshLambertMaterial({ map: frontTexture }),
      new THREE.MeshLambertMaterial({ map: backTexture }),
      new THREE.MeshLambertMaterial({ map: leftTexture }),
      new THREE.MeshLambertMaterial({ map: rightTexture }),
      material,
      material,
    ]);
    this._cabin.position.set(-6, 0, 25.5);

    this._cabin.castShadow = false;
    this._cabin.receiveShadow = false;

    this.add(this._cabin);
  }

  _getWheel(place) {
    const x = place === "back" ? -18 : 18;
    const wheel = new Wheel();
    wheel.position.set(x, 0, 6);
    wheel.castShadow = false;
    wheel.receiveShadow = false;

    return wheel;
  }
}
