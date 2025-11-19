import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONN_STRING;

export async function uploadFile(containerName: string, blobName: string, fileBuffer: Buffer) {
    if (!connectionString) return;

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlob = containerClient.getBlockBlobClient(blobName);
    const result = await blockBlob.uploadData(fileBuffer);
    return result.requestId
}