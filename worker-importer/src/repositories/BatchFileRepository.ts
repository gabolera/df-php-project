import db from "../database/KnexDriverDatabase";
import { ZipCode } from "../entities/ZipCode";

export class BatchFileRepository {
  async update({
    batch_file_id,
    zip_code_from,
    zip_code_to,
    status,
    zip_code_distance_id,
    error_message,
  }: {
    batch_file_id: number;
    zip_code_from: string;
    zip_code_to: string;
    status: string;
    zip_code_distance_id?: number;
    error_message?: string;
  }): Promise<void> {
    const zip = await db("batch_file_items")
      .where({
        batch_file_id,
        zip_code_from,
        zip_code_to,
      })
      .update({
        status,
        error_message,
        zip_code_distance_id,
      });
  }
}
