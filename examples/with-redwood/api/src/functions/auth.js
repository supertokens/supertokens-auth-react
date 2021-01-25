/* eslint-disable prettier/prettier */
import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { middleware } from 'supertokens-node'
import { getRWAllCORSHeaders } from '../lib/supertokens'
export const handler = async (event, context) => {
  // Works for OPTIONS method, probably not the right way.
  if (event.httpMethod === 'OPTIONS') {
    console.log(getRWAllCORSHeaders())
    return {
      headers: getRWAllCORSHeaders(),
      statusCode: 200,
    }
  }

  // TODO There is no request, response object here. How to do?
  return await superTokensNextWrapper(
    async (next) => {
      await middleware()(event, context.res, next)
    },
    event,
    context.res
  )
}
