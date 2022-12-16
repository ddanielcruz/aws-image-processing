import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import httpCors from '@middy/http-cors'
import inputOutputLogger from '@middy/input-output-logger'

export const middyfy = (handler: any) => {
  return middy(handler)
    .use(jsonBodyParser())
    .use(httpErrorHandler())
    .use(httpCors())
    .use(inputOutputLogger())
}
