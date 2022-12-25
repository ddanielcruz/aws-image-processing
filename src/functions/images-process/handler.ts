import sharp from 'sharp'
import { S3Handler } from 'aws-lambda'
import { basename, extname } from 'path'

import { middyfy } from '@libs/lambda'
import { s3, S3_BUCKET_NAME as Bucket } from '@libs/s3'

const handler: S3Handler = async event => {
  try {
    // TODO Update images' status in the database
    await Promise.all(
      event.Records.map(async rec => {
        const { key } = rec.s3.object
        const image = await s3.getObject({ Bucket, Key: key })
        const optimized = await sharp(image.Body).toFormat('webp').toBuffer()
        await s3.putObject({
          Body: optimized,
          Bucket,
          ContentType: 'image/webp',
          Key: `optimized/${basename(key, extname(key))}.webp`
        })
      })
    )
  } catch (error) {
    // TODO Add logger with CloudWatch
    console.error(error)
  }
}

export const main = middyfy(handler, 'S3')
