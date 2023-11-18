export interface IMapPoint {
	name: string;
	latitude: number;
	longitude: number;
	shortName?: string;
}

export class MapPoint implements IMapPoint {
	public name!: string;
	public shortName!: string;
	public latitude!: number;
	public longitude!: number;

	constructor(data: IMapPoint) {
		this.name = data.name;
		this.shortName = data?.shortName || '';
		this.latitude = data.latitude;
		this.longitude = data.longitude;
	}
}
