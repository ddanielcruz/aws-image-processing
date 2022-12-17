import type { Context } from 'aws-lambda'
import fs from 'fs/promises'
import path from 'path'
import axios from 'axios'

import { s3, S3_BUCKET_NAME as Bucket } from '@libs/s3'

import { main as handler } from './handler'

const invoke = () => {
  const event: any = {
    httpMethod: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: 'image.jpeg' })
  }

  return handler(event, {} as Context)
}

describe('Create Image Handler', () => {
  let image: Buffer

  beforeAll(async () => {
    await s3.createBucket({ Bucket })
    const filepath = path.resolve('assets', 'image.jpeg')
    image = await fs.readFile(filepath)
  })

  afterAll(async () => {
    const objects = await s3.listObjects({ Bucket })
    await Promise.all(objects.Contents.map(obj => s3.deleteObject({ Bucket, Key: obj.Key })))
    await s3.deleteBucket({ Bucket })
  })

  it('creates a new pre-signed URL to put image on S3', async () => {
    const response = await invoke()
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(body).toEqual({
      key: expect.stringContaining('image.jpeg'),
      filename: 'image.jpeg',
      url: expect.stringContaining('image.jpeg')
    })
    expect(() => new URL(body.url)).not.toThrow()
  })

  it('uploads the image to S3', async () => {
    const { body } = await invoke()
    const { url } = JSON.parse(body)
    const response = await axios.put(url, image, { headers: { 'Content-Type': 'image/jpeg' } })
    const objects = await s3.listObjects({ Bucket })
    expect(response.status).toBe(200)
    expect(objects.Contents).toHaveLength(1)
    expect(objects.Contents[0].Key.endsWith('image.jpeg')).toBeTruthy()
  })
})
