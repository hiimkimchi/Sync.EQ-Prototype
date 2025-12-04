import { BlobServiceClient, StorageSharedKeyCredential, BlockBlobClient } from "@azure/storage-blob";

// get the .env var
export function getConnectionString() {
    return process.env.AZURE_STORAGE_CONN_STRING;
}


export function setupConnection(containerName: string, blobName: string): BlockBlobClient {
    const connectionString = getConnectionString()
    if (!connectionString) throw new Error("Missing connection string");

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return containerClient.getBlockBlobClient(blobName);
}


// parses connectionString to grab accountName and key for shared key
export function getSharedKeyCredential(connectionString: string) {
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