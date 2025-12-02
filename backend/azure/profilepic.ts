import { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, SASProtocol, StorageSharedKeyCredential, BlockBlobClient } from "@azure/storage-blob";


// upload to container
export async function uploadFile(containerName: string, blobName: string, fileBuffer: Buffer) {
    const blockBlob = await setupConnection(containerName, blobName);
    const result = await blockBlob.uploadData(fileBuffer);
    return result.requestId
}


// deletes blob
export async function deleteFile(containerName: string, blobName: string) {
    const blockBlob = await setupConnection(containerName, blobName);
    const result = await blockBlob.deleteIfExists()
    return result.succeeded
}


// temp url to access pictures
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


// get the .env var
function getConnectionString() {
    return process.env.AZURE_STORAGE_CONN_STRING;
}


function setupConnection(containerName: string, blobName: string): BlockBlobClient {
    const connectionString = getConnectionString()
    if (!connectionString) throw new Error("Missing connection string");

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient.getBlockBlobClient(blobName);
}


// parses connectionString to grab accountName and key for shared key
function getSharedKeyCredential(connectionString: string) {
    const parts = connectionString.split(';');
    let accountName = '';
    let accountKey = '';

    for (const part of parts) {
        if (part.startsWith('AccountName=')) {
            accountName = part.replace('AccountName=', '');
        }
        if (part.startsWith('AccountKey=')) {
            accountKey = part.replace('AccountKey=', '');
        }
    }

    return new StorageSharedKeyCredential(accountName, accountKey);
}