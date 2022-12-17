import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { createPreSignedPut } from '@libs/s3'

import schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  const { filename } = event.body
  const data = await createPreSignedPut(filename)

  return formatJSONResponse({ data, statusCode: 201 })
}

export const main = middyfy(handler)
