import { MapPoint } from "./mapPoint.model";

export interface ITrack {
  id: string;
  name: string;
  description: string;
  waypoints: MapPoint[];
}

export class Track implements ITrack {
  public id!: string;
  public name!: string;
  public description!: string;
  public waypoints!: MapPoint[];

  constructor(data: ITrack) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.waypoints = data.waypoints;
  }
}
