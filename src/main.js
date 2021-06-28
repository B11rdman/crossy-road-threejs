import * as THREE from "three";
import Camera from "./components/camera";
import Chick from "./components/chick";
import Light from "./components/light";
import Plane from "./components/plane";
import Renderer from "./components/renderer";

export class Main {
  constructor(container) {
    this.scene = new THREE.Scene();
    this.container = container;

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

    this._render();

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this._setEvents();
  }

  _render() {
    requestAnimationFrame(this._render.bind(this));

    this.renderer.render(this.scene, this.camera.threeCamera);
  }

  _setEvents() {
    this._handleResize();
    this._handlePointer();
    this._handleKeyboard();
  }

  _handlePointer() {
    window.addEventListener("pointerdown", this.onPointerDown);
  }

  onPointerDown(pointerEvent) {
    const { x: downX, y: downY } = pointerEvent;
    this._downX = downX;
    this._downY = downY;
    window.addEventListener("pointerup", this.onPointerUp);
  }

  onPointerUp(pointerEvent) {
    window.removeEventListener("pointerup", this.onPointerUp);

    const { x: upX, y: upY } = pointerEvent;
    let difX = upX - this._downX;
    let difY = upY - this._downY;
    // if (!this.pressed) {
    if (difX > 0 && difX > difY) {
      this.handleMove("right");
    } else if (difX < 0 && Math.abs(difX) >= Math.abs(difY)) {
      this.handleMove("left");
    } else if (difY > 0 && Math.abs(difX) < Math.abs(difY)) {
      this.handleMove("backwards");
    } else if (difY < 0 && Math.abs(difX) <= Math.abs(difY)) {
      this.handleMove("forward");
    }
  }

  handleMove(direction) {
    console.warn(direction);
  }

  _handleKeyboard() {
    window.addEventListener("keydown", (KeyboardEvent) => {
      switch (KeyboardEvent.key) {
        case "ArrowUp":
          this.handleMove("forward");
          break;
        case "ArrowDown":
          this.handleMove("backward");
          break;
        case "ArrowLeft":
          this.handleMove("left");
          break;
        case "ArrowRight":
          this.handleMove("right");
          break;

        default:
          break;
      }
    });
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
}
