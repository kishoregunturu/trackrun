import { Marker } from "@agm/core/services/google-maps-types";

export class RouteMap {
    key: string;
    constructor(
        public Name: string,
        public Address: string,
        public Markers: marker[],
        public Distance:number
      ) {  }
}

// just an interface for type safety.
export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
