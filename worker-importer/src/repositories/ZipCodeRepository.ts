import db from "../database/KnexDriverDatabase";
import { ZipCodeProps } from "../entities/ZipCode";
import { randomUUID } from 'crypto';

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
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      })
      .onConflict('cep')
      .merge({
        state: zipCode.state,
        city: zipCode.city,
        neighborhood: zipCode.neighborhood,
        street: zipCode.street,
        coordinates: zipCode.coordinates ?? null,
        updated_at: db.fn.now(),
      })
      .returning("id");
    return { ...zipCode, id: zip[0].id };
  }
}
