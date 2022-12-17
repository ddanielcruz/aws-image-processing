const { IS_OFFLINE, IS_LOCAL } = process.env
export const isOffline = (IS_LOCAL || IS_OFFLINE) === 'true'
