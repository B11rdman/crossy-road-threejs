export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const Config = {
  distance: 500,
  zoom: 1.25,
  chickenSize: 15,
  columns: 17,
  stepTime: 200,
};
export const PositionWidth = 42 * Config.zoom;

export const LaneType = {
  Car: "car",
  Truck: "truck",
  Forest: "forest",
  Field: "field",
};

export const LanesConfig = {
  From: -18,
  To: 15,
};

export const Move = {
  Forward: "forward",
  Backward: "backward",
  Left: "left",
  Right: "right",
};

export const CarsPerLane = 3;
export const TrucksPerLane = 2;
export const TreesPerLane = 2;

export const BoardWidth = PositionWidth * Config.columns;

export const VehicleColors = ["#a52523", "#ef2d56", "#0ad3ff", "#ff9f1c", "#a52523", "#bdb638", "#78b14b"];
export const LaneTypes = [LaneType.Car, LaneType.Truck, LaneType.Forest];
export const LaneSpeeds = [1, 1.5, 2, 2.5, 3];
export const ThreeHeights = [30, 40, 50];

export const StartLine = (-BoardWidth * Config.zoom) / 2 - PositionWidth * 2 * Config.zoom;
export const EndLine = (BoardWidth * Config.zoom) / 2 + PositionWidth * 2 * Config.zoom;

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
