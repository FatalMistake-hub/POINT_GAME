export interface Point {
  x: number;
  y: number;
  value: number;
  status: "active" | "removing" | "deleted";
}
