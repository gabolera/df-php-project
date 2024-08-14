import db from "../database/KnexDriverDatabase";
import { ZipCode, ZipCodeProps } from "../entities/ZipCode";

export class ZipCodeRepository {
  async find(zipCode: string): Promise<ZipCodeProps | undefined> {
    const zip = await db<ZipCodeProps>("zip_codes")
      .where({ cep: zipCode })
      .first();
    return zip;
  }

  async create(zipCode: ZipCodeProps): Promise<ZipCodeProps> {
    const zip = await db("zip_codes")
      .insert({
        cep: zipCode.cep,
        state: zipCode.state,
        city: zipCode.city,
        neighborhood: zipCode.neighborhood,
        street: zipCode.street,
        coordinates: zipCode.coordinates ?? null,
      })
      .returning("id");

    return { ...zipCode, id: zip[0] };
  }
}
