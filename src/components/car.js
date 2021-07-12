import * as THREE from "three";
import { CarTextureConfig, Config, pickRandom, VehicleColors } from "../config";
import VehicleTexture from "./texture";
import Wheel from "./wheel";

export default class Car extends THREE.Group {
  constructor() {
    super();

    this._build();
  }

  _build() {
    const { zoom } = Config;
    this._buildWheels(zoom);
    this._buildBody(zoom);
    this._buildCabin(zoom);
  }

  _buildWheels(zoom) {
    this.add((this._backWheel = this._getWheel("back", zoom)));
    this.add((this._frontWheel = this._getWheel("front", zoom)));
  }

  _buildBody(zoom) {
    const geom = new THREE.BoxBufferGeometry(60 * zoom, 30 * zoom, 15 * zoom);
    const color = pickRandom(VehicleColors);
    const material = new THREE.MeshLambertMaterial({ color });

    this._body = new THREE.Mesh(geom, material);
    this._body.position.set(0 * zoom, 0 * zoom, 12 * zoom);

    this._body.castShadow = true;
    this._body.receiveShadow = false;

    this.add(this._body);
  }

  _buildCabin(zoom) {
    const frontTexture = new VehicleTexture(CarTextureConfig["face"]);
    frontTexture.center = new THREE.Vector2(0.5 * zoom, 0.5 * zoom);
    frontTexture.rotation = Math.PI / 2;

    const backTexture = new VehicleTexture(CarTextureConfig["face"]);
    backTexture.center = new THREE.Vector2(0.5 * zoom, 0.5 * zoom);
    backTexture.rotation = -Math.PI / 2;

    const rightTexture = new VehicleTexture(CarTextureConfig["side"]);
    const leftTexture = new VehicleTexture(CarTextureConfig["side"]);
    leftTexture.flipY = false;

    const geom = new THREE.BoxBufferGeometry(33 * zoom, 24 * zoom, 12 * zoom);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });

    this._cabin = new THREE.Mesh(geom, [
      new THREE.MeshLambertMaterial({ map: frontTexture }),
      new THREE.MeshLambertMaterial({ map: backTexture }),
      new THREE.MeshLambertMaterial({ map: leftTexture }),
      new THREE.MeshLambertMaterial({ map: rightTexture }),
      material,
      material,
    ]);
    this._cabin.position.set(-6 * zoom, 0 * zoom, 25.5 * zoom);

    this._cabin.castShadow = false;
    this._cabin.receiveShadow = false;

    this.add(this._cabin);
  }

  _getWheel(place, zoom) {
    const x = place === "back" ? -18 : 18;
    const wheel = new Wheel();
    wheel.position.set(x * zoom, 0 * zoom, 6 * zoom);
    wheel.castShadow = false;
    wheel.receiveShadow = false;

    return wheel;
  }
}
