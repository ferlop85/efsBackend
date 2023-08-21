import { BlobServiceClient } from "@azure/storage-blob"
const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;
   AccountName=${process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME};
   AccountKey=${process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY};
   EndpointSuffix=core.windows.net`
)
const containerName = "efs"
const containerClient = blobServiceClient.getContainerClient(containerName)

interface BlobProps {
  buffer: Buffer
  fileName: string
  folderName: string
}

export const updateBlob = async ({
  buffer,
  fileName,
  folderName,
}: BlobProps) => {
  const blobName = folderName + "/" + fileName
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)

  let fileBuffer = buffer

  await blockBlobClient.upload(fileBuffer, fileBuffer.length)

  return { blobUrl: `${process.env.AZURE_BLOB_URL}/efs/${blobName}` }
}

export const deleteBlob = async ({
  fileName,
  folderName,
}: Pick<BlobProps, "fileName" | "folderName">) => {
  const blobName = folderName + "/" + fileName
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)

  await blockBlobClient.delete({ deleteSnapshots: "include" })

  return blobName
}
