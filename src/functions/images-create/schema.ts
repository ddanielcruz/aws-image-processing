export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        filename: { type: 'string' }
      },
      required: ['filename']
    }
  },
  required: ['body']
} as const
