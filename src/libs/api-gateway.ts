import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

type ValidatedAPIGatewayProxyEvent<Schema> = APIGatewayProxyEvent & FromSchema<Schema>
export type ValidatedEventAPIGatewayProxyEvent<Schema> = Handler<
  ValidatedAPIGatewayProxyEvent<Schema>,
  APIGatewayProxyResult
>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
