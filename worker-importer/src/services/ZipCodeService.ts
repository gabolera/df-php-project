import { Coordinates, ZipCodeProps } from "../entities/ZipCode";
import { ZipCodeRepository } from "../repositories/ZipCodeRepository";
import { BrasilApi } from "./BrasilApi";

export class ZipCodeService {
  async findOrCreateZipCode(zipCode: string): Promise<ZipCodeProps> {
    const repo = new ZipCodeRepository();
    const zipCodeExists = await repo.find(zipCode);

    if (zipCodeExists) {
      return zipCodeExists;
    }

    const brasilApi = new BrasilApi();
    const zipCodeBrasilApi = await brasilApi.getCep(zipCode);
    await repo.create(zipCodeBrasilApi);
    return zipCodeBrasilApi;
  }

  calculateDistanceByCoordinates(
    coord1: Coordinates,
    coord2: Coordinates
  ): number {
    const latFrom = this.deg2rad(coord1.latitude);
    const lonFrom = this.deg2rad(coord1.longitude);
    const latTo = this.deg2rad(coord2.latitude);
    const lonTo = this.deg2rad(coord2.longitude);

    const latDelta = latTo - latFrom;
    const lonDelta = lonTo - lonFrom;

    const a =
      Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
      Math.cos(latFrom) *
        Math.cos(latTo) *
        Math.sin(lonDelta / 2) *
        Math.sin(lonDelta / 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const distance = 6371 * c;

    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
