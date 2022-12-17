import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse()
}

export const main = middyfy(handler)
