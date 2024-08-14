import { ZipCodeDistanceRepository } from "./repositories/ZipCodeDistanceRepository";
import { ZipCodeService } from "./services/ZipCodeService";
import { BatchFileRepository } from "./repositories/BatchFileRepository";
import amqp from "amqplib";

async function updateBatchItem({
  batch_file_id,
  cepFrom,
  cepTo,
  idCepCalculated,
  status,
  error_message,
}: {
  batch_file_id: number;
  cepFrom: string;
  cepTo: string;
  idCepCalculated?: number;
  status?: any;
  error_message?: string;
}) {
  const batchFile = new BatchFileRepository();
  await batchFile.update({
    batch_file_id,
    zip_code_from: cepFrom,
    zip_code_to: cepTo,
    zip_code_distance_id: idCepCalculated || undefined,
    status,
    error_message,
  });
}

async function calculateJob(
  cepFrom: string,
  cepTo: string,
  batch_file_id: number
): Promise<number | undefined> {
  const zipCodeService = new ZipCodeService();
  const zipCodeDistance = new ZipCodeDistanceRepository();

  const exists = await zipCodeDistance.hasCalculatedDistance(cepFrom, cepTo);

  if (exists) {
    await updateBatchItem({
      batch_file_id,
      cepFrom,
      cepTo,
      idCepCalculated: exists,
    });
    return;
  }

  const zipCodeFrom = await zipCodeService.findOrCreateZipCode(cepFrom);
  const zipCodeTo = await zipCodeService.findOrCreateZipCode(cepTo);

  if (
    !zipCodeFrom.coordinates ||
    !zipCodeTo.coordinates ||
    !zipCodeFrom.id ||
    !zipCodeTo.id
  ) {
    return;
  }

  const distance = zipCodeService.calculateDistanceByCoordinates(
    zipCodeFrom.coordinates,
    zipCodeTo.coordinates
  );

  const idCepCalculated = await zipCodeDistance.create({
    zipCodeFrom: zipCodeFrom.id,
    zipCodeTo: zipCodeTo.id,
    distance,
  });

  await updateBatchItem({
    batch_file_id,
    cepFrom,
    cepTo,
    idCepCalculated,
    status: BatchFileItemStatusEnum.Processed,
  });
}

async function run() {
  const rabbitmq = await amqp.connect({
    hostname: "localhost",
    port: 5672,
    username: "rabbitmq",
    password: "rabbitmq",
    vhost: "/",
  });

  const channel = await rabbitmq.createChannel();
  await channel.assertQueue("batch_file", { durable: true });
  await channel.prefetch(3);

  channel.consume("batch_file", async (message) => {
    if (!message) {
      return;
    }

    const { batch_file_id, zip_code_from, zip_code_to } = JSON.parse(
      message.content.toString()
    );
    try {
      await calculateJob(zip_code_from, zip_code_to, batch_file_id);
    } catch (err: any) {
      await updateBatchItem({
        batch_file_id,
        cepFrom: zip_code_from,
        cepTo: zip_code_to,
        status: BatchFileItemStatusEnum.Failed,
        error_message: err.message,
      });
    }
    channel.ack(message);
  });
}

enum BatchFileItemStatusEnum {
  Pending = 0,
  Processing = 1,
  Processed = 2,
  Failed = 3,
}

run();
