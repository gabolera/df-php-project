export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ZipCodeProps {
  id?: number;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  coordinates?: Coordinates;
}

export class ZipCode {
  public cep: string = "";
  public state: string = "";
  public city: string = "";
  public neighborhood: string = "";
  public street: string = "";
  public coordinates?: Coordinates;
  public id = 0;

  constructor(public props: ZipCodeProps) {
    Object.assign(this, props);
  }
}
