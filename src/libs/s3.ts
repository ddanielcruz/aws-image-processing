import { S3 } from '@aws-sdk/client-s3'
import { config } from '@config/aws'

export const s3 = new S3(config)
