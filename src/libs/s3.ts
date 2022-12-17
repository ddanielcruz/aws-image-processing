import env from 'env-var'

import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { config } from '@config/aws'
import { isOffline } from '@config/offline'

const s3 = new S3({ ...config, forcePathStyle: isOffline })
const S3_BUCKET_NAME = env.get('S3_BUCKET_NAME').required().asString()
const S3_URL_EXPIRATION = env.get('S3_URL_EXPIRATION').default('120').asIntPositive()

export const createPreSignedPut = async (filename: string) => {
  const key = `${Date.now()}-${filename}`
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ACL: 'public-read'
  })
  const url = await getSignedUrl(s3, command, { expiresIn: S3_URL_EXPIRATION })

  return {
    key,
    filename,
    url
  }
}
