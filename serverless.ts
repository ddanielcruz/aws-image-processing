import type { AWS } from '@serverless/typescript'

import * as functions from '@functions/index'

const serverlessConfiguration: AWS = {
  service: 'aws-image-processing',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-localstack',
    'serverless-offline',
    'serverless-prune-plugin'
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: 'local',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      LOCALSTACK_HOST: process.env.LOCALSTACK_HOST || 'localhost'
    }
  },
  package: { individually: true },
  custom: {
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
    },
    localstack: {
      stages: ['local']
    }
  },
  functions,
  resources: {
    Resources: {
      Images: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${env:BUCKET_NAME}',
          AccessControl: 'Private'
        }
      }
    }
  }
}

module.exports = serverlessConfiguration
