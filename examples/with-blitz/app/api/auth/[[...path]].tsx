import { superTokensNextWrapper } from "supertokens-node/nextjs"
import supertokens from "supertokens-node"
import { middleware } from "supertokens-node/framework/express"

import * as SuperTokensConfig from "../../config/supertokensConfig"

supertokens.init(SuperTokensConfig.backendConfig())

export default async function superTokens(req, res) {
  return await superTokensNextWrapper(
    async (next) => {
      await middleware()(req, res, next)
    },
    req,
    res
  )
}
