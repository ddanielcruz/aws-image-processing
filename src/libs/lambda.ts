import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import httpCors from '@middy/http-cors'
import inputOutputLogger from '@middy/input-output-logger'

type EventSource = 'API Gateway' | 'S3'

export const middyfy = (handler: any, event: EventSource = 'API Gateway') => {
  const transformed = middy(handler)
  if (event === 'API Gateway') {
    transformed.use([jsonBodyParser(), httpErrorHandler(), httpCors(), inputOutputLogger()])
  }

  return transformed
}
