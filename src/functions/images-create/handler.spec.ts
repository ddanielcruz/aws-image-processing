import type { Context } from 'aws-lambda'

import { main as handler } from './handler'

const invoke = (event: any) => handler(event, {} as Context)

describe('Create Image Handler', () => {
  it('creates a new pre-signed URL to put image on S3', async () => {
    const event = {
      httpMethod: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: 'image.jpeg' })
    }
    const response = await invoke(event)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toEqual(200)
    expect(body).toEqual({
      key: expect.stringContaining('image.jpeg'),
      filename: 'image.jpeg',
      url: expect.stringContaining('image.jpeg')
    })
    expect(() => new URL(body.url)).not.toThrow()
  })
})
