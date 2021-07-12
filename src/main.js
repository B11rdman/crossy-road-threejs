import * as THREE from "three";
import Camera from "./components/camera";
import Chick from "./components/chick";
import Lane from "./components/lane";
import Light from "./components/light";
import Plane from "./components/plane";
import Renderer from "./components/renderer";
import { Config, LanesConfig, Move, PositionWidth } from "./config";

export class Main {
  constructor(container) {
    this.scene = new THREE.Scene();
    this.container = container;
    this._isPressed = false;

    this._initMainComponents();
    this._initValues();
    this._initEvents();

    this._onPointerUp = this._onPointerUp.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._render = this._render.bind(this);

    this._render();
  }

  _render(timestamp) {
    requestAnimationFrame(this._render);

    // !this._previousTimestamp && (this._previousTimestamp = timestamp);
    // this._delta = timestamp - this._previousTimestamp;
    this._moveVehicles();
    this.renderer.render(this.scene, this.camera.threeCamera);
  }

  _initValues() {
    this._lanes = this._generateLanes();
    this._currentLane = 0;
    this._currentColumn = Math.floor(Config.columns / 2);
    this._previousTimestamp = null;
    this._startMoving = false;
    this._stepStartTimestamp = null;

    this.chick.position.x = 0;
    this.chick.position.y = 0;
  }

  _generateLanes() {
    const { zoom } = Config;
    const lanes = [];
    for (let i = LanesConfig.From; i < LanesConfig.To; i += 1) {
      const lane = new Lane(i);
      lane.mesh.position.y = i * PositionWidth * zoom;
      this.scene.add(lane.mesh);
      lanes.push(lane);
    }

    return lanes.filter((lane) => lane.index >= 0);
  }

  _initEvents() {
    this._handleResize();
    this._handlePointer();
    this._handleKeyboard();
  }

  _handlePointer() {
    window.addEventListener("pointerdown", this._onPointerDown);
    window.addEventListener("pointerup", this._onPointerUp);
  }

  _onPointerDown(pointerEvent) {
    const { x: downX, y: downY } = pointerEvent;
    this._downX = downX;
    this._downY = downY;
    this._isPressed = true;
  }

  _onPointerUp(pointerEvent) {
    if (this._isPressed) {
      const { x: upX, y: upY } = pointerEvent;
      const difX = upX - this._downX;
      const difY = upY - this._downY;
      if (difX > 15 && difX > difY) {
        this._handleMove(Move.Right);
      } else if (difX < -15 && Math.abs(difX) >= Math.abs(difY)) {
        this._handleMove(Move.Left);
      } else if (difY > 15 && Math.abs(difX) < Math.abs(difY)) {
        this._handleMove(Move.Backward);
      } else if (difY < -15 && Math.abs(difX) <= Math.abs(difY)) {
        this._handleMove(Move.Forward);
      }
      this._isPressed = false;
    }
  }

  _handleKeyboard() {
    window.addEventListener("keydown", (KeyboardEvent) => {
      switch (KeyboardEvent.key) {
        case "ArrowUp":
          this._handleMove(Move.Forward);
          break;
        case "ArrowDown":
          this._handleMove(Move.Backward);
          break;
        case "ArrowLeft":
          this._handleMove(Move.Left);
          break;
        case "ArrowRight":
          this._handleMove(Move.Right);
          break;

        default:
          break;
      }
    });
  }

  _handleMove(direction) {
    console.warn(direction);
  }

  _handleResize() {
    window.addEventListener("resize", () => {
      const { cameraWidth } = this.camera.threeCamera;
      const newAspectRatio = this.container.offsetWidth / this.container.offsetHeight;
      const adjustedCameraHeight = cameraWidth / newAspectRatio;

      this.camera.threeCamera.top = adjustedCameraHeight / 2;
      this.camera.threeCamera.bottom = adjustedCameraHeight / -2;
      this.camera.threeCamera.updateProjectionMatrix();

      this.renderer.updateSize();
      this.renderer.threeRenderer.render(this.scene, this.camera.threeCamera);
    });
  }

  _moveVehicles() {
    this._lanes.forEach((lane) => {
      if (lane.type === "car" || lane.type === "truck") {
        lane.animateVehicle(this._delta);
      }
    });
  }

  _initMainComponents() {
    this.renderer = new Renderer(this.scene, this.container);
    this.camera = new Camera(this.renderer.threeRenderer);
    this.plane = new Plane();
    this.light = new Light();
    this.chick = new Chick();

    this.scene.add(this.plane.plane);
    this.scene.add(this.chick);
    this.light.addLights(this.scene);

    this.camera.threeCamera.lookAt(this.scene.position);

    this.container.appendChild(this.renderer.threeRenderer.domElement);
  }
}
