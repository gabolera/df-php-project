import axios from "axios";
import { ZipCodeProps } from "../entities/ZipCode";

export class BrasilApi {
  async getCep(cep: string): Promise<Omit<ZipCodeProps, 'id'>> {
    const data = await axios.request({
      method: "GET",
      url: `https://brasilapi.com.br/api/cep/v2/${cep}`,
    });
    return {
      cep: data.data.cep,
      state: data.data.state,
      city: data.data.city,
      neighborhood: data.data.neighborhood,
      street: data.data.street,
      coordinates: {
        latitude: data.data.location.coordinates.latitude,
        longitude: data.data.location.coordinates.longitude,
      },
    };
  }
}
