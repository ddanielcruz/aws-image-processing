import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { createUploadUrl } from '@libs/s3'

import schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  // TODO Add input validation using zod or @middy/validator
  // TODO Create image in the database
  const { filename } = event.body
  const data = await createUploadUrl(filename)

  return formatJSONResponse({ data, statusCode: 201 })
}

export const main = middyfy(handler)
