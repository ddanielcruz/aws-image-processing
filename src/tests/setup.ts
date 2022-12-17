const { JEST_WORKER_ID } = process.env
process.env.S3_BUCKET_NAME = `bucket-${JEST_WORKER_ID}`
