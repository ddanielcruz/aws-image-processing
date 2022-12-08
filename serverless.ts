import type { AWS } from '@serverless/typescript'

import hello from '@functions/hello'

const serverlessConfiguration: AWS = {
  service: 'aws-image-processing',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-prune-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    }
  },
  package: { individually: true },
  custom: {
    // TODO Review build setup
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    },
    prune: {
      automatic: true,
      number: 3
    }
  },
  functions: {
    hello
  }
}

module.exports = serverlessConfiguration
