import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

export type ValidatedAPIGatewayProxyEvent<Schema> = APIGatewayProxyEvent & FromSchema<Schema>

export type ValidatedEventAPIGatewayProxyEvent<Schema> = Handler<
  ValidatedAPIGatewayProxyEvent<Schema>,
  APIGatewayProxyResult
>

type Response = {
  data?: Record<string, unknown>
  statusCode?: number
}

export const formatJSONResponse = ({ statusCode, data }: Response = {}) => {
  return {
    statusCode: statusCode || data ? 200 : 204,
    body: data ? JSON.stringify(data) : ''
  }
}
