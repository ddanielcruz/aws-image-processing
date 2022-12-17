import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import httpCors from '@middy/http-cors'
import inputOutputLogger from '@middy/input-output-logger'

const middleware = [jsonBodyParser(), httpErrorHandler(), httpCors()]
if (process.env.NODE_ENV !== 'test') {
  middleware.push(inputOutputLogger())
}

export const middyfy = (handler: any) => {
  return middy(handler).use(middleware)
}
