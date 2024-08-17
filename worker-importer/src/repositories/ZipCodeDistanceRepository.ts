import db from "../database/KnexDriverDatabase";

export class ZipCodeDistanceRepository {
  async hasCalculatedDistance(
    zipCodeFrom: string,
    zipCodeTo: string
  ): Promise<string | undefined> {
    const zip = await db.raw(
      `
      SELECT dis.id
        FROM zip_code_distance dis
           , zip_codes zcf
           , zip_codes zct
       WHERE zcf.id = dis.from_id
         AND zct.id = dis.to_id
         AND ((zcf.cep = :zipCodeFrom AND zct.cep = :zipCodeTo) 
          OR (zcf.cep = :zipCodeTo AND zct.cep = :zipCodeFrom))
      `,
      {
        zipCodeFrom,
        zipCodeTo,
      }
    );
    if (!zip.rows.length) {
      return;
    }
    return zip.rows[0].id;
  }

  async create({
    zipCodeFrom,
    zipCodeTo,
    distance,
  }: {
    zipCodeFrom: string;
    zipCodeTo: string;
    distance?: number;
  }): Promise<string> {
    const res = await db("zip_code_distance")
      .insert({
        // id: randomUUID(),
        from_id: zipCodeFrom,
        to_id: zipCodeTo,
        distance,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      })
      .returning("id");
    return res[0].id;
  }
}
