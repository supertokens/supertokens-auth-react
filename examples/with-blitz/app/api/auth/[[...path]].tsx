import { superTokensNextWrapper } from "supertokens-node/nextjs"
import { middleware } from "supertokens-node"

export default async function superTokens(req, res) {
  return await superTokensNextWrapper(
    async (next) => {
      await middleware()(req, res, next)
    },
    req,
    res
  )
}
