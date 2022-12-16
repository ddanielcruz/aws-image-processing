import type { Context, Callback } from 'aws-lambda'
import { main as handler } from './handler'

describe('Hello Handler', () => {
  it('should pass with mocked post request', async () => {
    const event: any = {
      headers: { 'Content-Type': 'application/json' },
      body: '{"name": "Frederic"}'
    }
    const context = {} as Context
    const callback = null as Callback
    const response = await handler(event, context, callback)

    expect(response.statusCode).toBe(200)
  })
})
