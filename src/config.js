export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const LanesConfig = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const VehicleColors = ["#a52523", "#ef2d56", "#0ad3ff", "#ff9f1c", "#a52523", "#bdb638", "#78b14b"];
export const LaneTypes = ["car", "truck", "forest"];
export const LaneSpeeds = [2, 2.5, 3];
export const ThreeHeights = [20, 45, 60];

export const Config = {
  distance: 500,
  zoom: 2,
  chickenSize: 15,
  positionWidth: 42,
  columns: 17,
  stepTime: 200,
};

export const BoardWidth = Config.positionWidth * Config.columns;

export const CarTextureConfig = {
  face: {
    width: 64,
    height: 32,
    pointsArr: [{ x: 8, y: 8, w: 48, h: 32 }],
    color1: "#ffffff",
    color2: "#666666",
  },
  side: {
    width: 128,
    height: 32,
    pointsArr: [
      { x: 10, y: 8, w: 38, h: 24 },
      { x: 58, y: 8, w: 60, h: 24 },
    ],
    color1: "#ffffff",
    color2: "#666666",
  },
};

export const TruckTextureConfig = {
  face: {
    width: 64,
    height: 32,
    pointsArr: [{ x: 0, y: 4, w: 64, h: 15 }],
  },
  side: {
    width: 128,
    height: 32,
    pointsArr: [{ x: 58, y: 4, w: 70, h: 15 }],
  },
};
