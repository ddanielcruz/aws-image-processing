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
      LOCALSTACK_HOST: process.env.LOCALSTACK_HOST || 'localhost',
      S3_BUCKET_NAME: '${self:custom.bucket}'
    },
    s3: {
      images: {
        name: '${self:custom.bucket}',
        bucketName: '${self:custom.bucket}'
      }
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:GetObject', 's3:PutObject', 's3:PutObjectAcl', 's3:ListBucket'],
            Resource: ['arn:aws:s3:::${self:custom.bucket}', 'arn:aws:s3:::${self:custom.bucket}/*']
          }
        ]
      }
    }
  },
  package: { individually: true },
  custom: {
    stage: '${opt:stage, self:provider.stage}',
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
    },
    bucket: '${env:S3_BUCKET_NAME}-${self:custom.stage}'
  },
  functions
}

module.exports = serverlessConfiguration
