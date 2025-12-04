import { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, SASProtocol } from "@azure/storage-blob";
import { getConnectionString, setupConnection, getSharedKeyCredential } from './config.js'
import * as mime from 'mime'

// upload to container
export async function uploadFile(containerName: string, blobName: string, fileBuffer: Buffer) {
    const blockBlob = await setupConnection(containerName, blobName);
    const result = await blockBlob.uploadData(fileBuffer);
    return result.requestId
}

// upload to container (audio should use mime to )
export async function uploadAudioFile(containerName: string, blobName: string, fileBuffer: Buffer) {
  // Determine MIME type from file extension
  const contentType = mime.lookup(blobName) || "application/octet-stream";
  const blockBlob = await setupConnection(containerName, blobName);
  const result = await blockBlob.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: contentType,
    },
  });
  return result.requestId;
}

// deletes blob
export async function deleteFile(containerName: string, blobName: string) {
    const blockBlob = await setupConnection(containerName, blobName);
    const result = await blockBlob.deleteIfExists()
    return result.succeeded
}


// temp url to access an item
export async function getBlobSASURL(containerName: string, blobName: string) {
    const connectionString = getConnectionString();
    if (!connectionString) throw new Error("Missing connection string");

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // 1 hour expiry for safety reasons
    const expiresOn = new Date(new Date().valueOf() + 60 * 60 * 1000);

    // get credentials for temp url
    const creds = getSharedKeyCredential(connectionString)

    const sas = generateBlobSASQueryParameters(
        {
            containerName,
            blobName,
            permissions: BlobSASPermissions.parse("r"), // read-only
            protocol: SASProtocol.Https,
            expiresOn,
        },
        creds
    ).toString();

    // Return the full URL
    return `${blobClient.url}?${sas}`;
}
