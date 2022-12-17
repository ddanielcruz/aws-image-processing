import type { Context } from 'aws-lambda'
import fs from 'fs/promises'
import path from 'path'

import { s3, S3_BUCKET_NAME as Bucket } from '@libs/s3'

import { main as handler } from './handler'
import event from './mock.json'

const invoke = () => handler(event as any, {} as Context)

describe('List Images Handler', () => {
  let image: Buffer

  beforeAll(async () => {
    const filepath = path.resolve('assets', 'image.jpeg')
    image = await fs.readFile(filepath)
    await s3.createBucket({ Bucket })
    await s3.putObject({ Bucket, Key: 'image.jpeg', Body: image, ACL: 'private' })
  })

  afterAll(async () => {
    const objects = await s3.listObjects({ Bucket })
    await Promise.all(objects.Contents?.map(obj => s3.deleteObject({ Bucket, Key: obj.Key })))
    await s3.deleteBucket({ Bucket })
  })

  it('list all images in the bucket', async () => {
    const { statusCode, body: rawBody } = await invoke()
    const body = JSON.parse(rawBody)
    expect(statusCode).toBe(200)
    expect(body).toEqual([{ key: 'image.jpeg', size: image.length }])
  })
})
