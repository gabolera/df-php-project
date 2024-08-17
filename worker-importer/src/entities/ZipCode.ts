export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ZipCodeProps {
  id?: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  coordinates?: Coordinates;
}

