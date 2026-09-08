import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const endpoint=process.env.B2_ENDPOINT;
const bucket=process.env.B2_BUCKET;
const client = endpoint && process.env.B2_KEY_ID && process.env.B2_APPLICATION_KEY ? new S3Client({
  region: process.env.B2_REGION || "us-east-1",
  endpoint,
  credentials:{accessKeyId:process.env.B2_KEY_ID!,secretAccessKey:process.env.B2_APPLICATION_KEY!}
}) : null;
export async function putObject(key:string, body:Buffer|string, contentType:string) {
  if(!client||!bucket) throw new Error("Backblaze B2 is not configured");
  await client.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:body,ContentType:contentType}));
  return key;
}
export async function deleteObject(key:string){ if(client&&bucket) await client.send(new DeleteObjectCommand({Bucket:bucket,Key:key})); }
export async function signedDownload(key:string, seconds=300) {
  if(!client||!bucket) throw new Error("Backblaze B2 is not configured");
  return getSignedUrl(client,new GetObjectCommand({Bucket:bucket,Key:key}),{expiresIn:seconds});
}
