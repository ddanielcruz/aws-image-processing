import { isOffline } from './offline'

interface Config {
  region: string
  credentials?: {
    accessKeyId: string
    secretAccessKey: string
  }
  endpoint?: string
}

export const config: Config = {
  region: process.env.REGION || 'us-east-1'
}

if (isOffline) {
  const host = process.env.LOCALSTACK_HOST || 'localhost'
  config.credentials = { accessKeyId: 'offline', secretAccessKey: 'offline' }
  config.endpoint = `http://${host}:4566`
}
