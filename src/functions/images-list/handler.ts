import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { s3, S3_BUCKET_NAME as Bucket } from '@libs/s3'

import schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const response = await s3.listObjectsV2({ Bucket })
  const objects = response.Contents?.map(({ Key = '', Size }) => ({
    key: Key,
    filename: Key.split('-').at(1),
    size: Size
  }))

  return formatJSONResponse({ data: objects || [] })
}

export const main = middyfy(handler)
