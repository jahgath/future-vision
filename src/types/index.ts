export interface Destination {
  name: string;
  description: string;
  image?: string;
  slug?: string;
}

export interface GlobeDestination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  lat: number;
  lng: number;
  highlights: string[];
}

export interface ArcData {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}
