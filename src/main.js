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

    this._setEvents();
  }

  _render() {
    requestAnimationFrame(this._render.bind(this));

    this.renderer.render(this.scene, this.camera.threeCamera);
  }

  _setEvents() {
    this._handleResize();
    this._handlePointer();
  }

  _handlePointer() {
    window.addEventListener("pointerdown", this.onPointerDown.bind(this));
  }

  onPointerDown(pointerEvent) {
    // const { x: downX, y: downY } = pointerEvent;
    window.removeEventListener("pointerup", this.onPointerUp.bind(this, downX, downY), true);

    // window.addEventListener("pointerup", (downX, downY, e) => {
    //   const { x: upX, y: upY } = pointer;
    //   let difX = upX - downX;
    //   let difY = upY - downY;
    //   // if (!this.pressed) {
    //   if (difX > 0 && difX > difY) {
    //     this.handleMove(1, 0);
    //   } else if (difX < 0 && Math.abs(difX) >= Math.abs(difY)) {
    //     this.handleMove(-1, 0);
    //   } else if (difY > 0 && Math.abs(difX) < Math.abs(difY)) {
    //     this.handleMove(0, 1);
    //   } else if (difY < 0 && Math.abs(difX) <= Math.abs(difY)) {
    //     this.handleMove(0, -1);
    //   }
    // });
  }

  onPointerUp(downX, downY, pointer) {
    this._removeEventListener(downX, downY);
  }

  _removeEventListener(downX, downY) {
    console.warn(window);
    console.warn(this.onPointerUp.bind(this));
  }

  handleMove(a, b) {
    console.warn(a, b);
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
