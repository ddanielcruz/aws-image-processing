const { IS_OFFLINE, IS_LOCAL, NODE_ENV } = process.env
export const isOffline = (IS_LOCAL || IS_OFFLINE) === 'true' || NODE_ENV === 'test'
