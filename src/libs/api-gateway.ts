import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema, JSONSchema } from 'json-schema-to-ts'

type ValidatedAPIGatewayProxyEvent<S extends JSONSchema> = APIGatewayProxyEvent & FromSchema<S>

export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
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
