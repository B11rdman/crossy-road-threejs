import * as THREE from "three";
import {
  BoardWidth,
  CarsPerLane,
  Config,
  LaneSpeeds,
  LaneType,
  LaneTypes,
  pickRandom,
  PositionWidth,
  TreesPerLane,
  TrucksPerLane,
} from "../config";
import Car from "./car";
import Grass from "./grass";
import Road from "./road";
import Tree from "./tree";
import Truck from "./truck";

export default class Lane extends THREE.Group {
  constructor(index) {
    super();
    this.index = index;
    this.type = index <= 0 ? LaneType.Field : pickRandom(LaneTypes);

    this.vehicles = [];
    this._occupiedPositions = new Set();

    this._build();
  }

  animateVehicle() {
    const { zoom } = Config;
    const startLine = (-BoardWidth * zoom) / 2 - PositionWidth * 2 * zoom;
    const endLine = (BoardWidth * zoom) / 2 + PositionWidth * 2 * zoom;

    this.vehicles.forEach((v) => {
      if (this._direction) {
        v.position.x += this._speed;
        v.position.x > endLine && (v.position.x = startLine);
      } else {
        v.position.x -= this._speed;
        v.position.x < startLine && (v.position.x = endLine);
      }
    });
  }

  _build() {
    switch (this.type) {
      case LaneType.Field:
        this._buildField();
        break;
      case LaneType.Forest:
        this._buildForest();
        break;
      case LaneType.Car:
        this._buildCar();
        break;
      case LaneType.Truck:
        this._buildTruck();
        break;

      default:
        break;
    }
  }

  _buildField() {
    this.mesh = new Grass();
  }

  _buildForest() {
    this.mesh = new Grass();

    for (let i = 0; i < TreesPerLane; i += 1) {
      const three = this._getElements(this.type);
      this.mesh.add(three);
    }
  }

  _buildCar() {
    this.mesh = new Road();
    this._direction = Math.random() >= 0.5;

    for (let i = 0; i < CarsPerLane; i += 1) {
      const vehicle = this._getElements(this.type);
      !this._direction && (vehicle.rotation.z = Math.PI);
      this.mesh.add(vehicle);
      this.vehicles.push(vehicle);
    }

    this._speed = pickRandom(LaneSpeeds);
  }

  _buildTruck() {
    this.mesh = new Road();
    this._direction = Math.random() >= 0.5;

    for (let i = 0; i < TrucksPerLane; i += 1) {
      const vehicle = this._getElements(this.type);
      !this._direction && (vehicle.rotation.z = Math.PI);
      this.mesh.add(vehicle);
      this.vehicles.push(vehicle);
    }

    this._speed = pickRandom(LaneSpeeds);
  }

  _getElements(type) {
    const { columns, zoom } = Config;
    let element = null;
    let position = null;

    switch (type) {
      case LaneType.Car:
        element = new Car();
        break;
      case LaneType.Forest:
        element = new Tree();
        break;
      case LaneType.Truck:
        element = new Truck();
        break;

      default:
        break;
    }

    do {
      position = Math.floor((Math.random() * columns) / 2);
    } while (this._occupiedPositions.has(position));

    this._occupiedPositions.add(position);
    element.position.x = (position * PositionWidth * 2 + PositionWidth / 2) * zoom - (BoardWidth * zoom) / 2;

    return element;
  }
}
