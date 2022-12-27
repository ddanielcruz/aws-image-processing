import { handlerPath } from '@libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: ['.png', '.jpg', '.jpeg'].map(suffix => ({
    s3: {
      bucket: 'images',
      event: 's3:ObjectCreated:*',
      rules: [{ prefix: 'uploads/' }, { suffix }]
    }
  }))
}
