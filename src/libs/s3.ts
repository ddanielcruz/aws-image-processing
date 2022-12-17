import env from 'env-var'

import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { config } from '@config/aws'
import { isOffline } from '@config/offline'

export const s3 = new S3({ ...config, forcePathStyle: isOffline })
export const S3_BUCKET_NAME = env.get('S3_BUCKET_NAME').required().asString()
const S3_URL_EXPIRATION = env.get('S3_URL_EXPIRATION').default('120').asIntPositive()

export const createUploadUrl = async (filename: string) => {
  const key = `uploads/${Date.now()}-${filename}`
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
    ContentType: 'image/*'
  })

  return {
    key,
    filename,
    url: await getSignedUrl(s3, command, { expiresIn: S3_URL_EXPIRATION })
  }
}
