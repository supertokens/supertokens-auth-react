import { superTokensNextWrapper } from "supertokens-node/nextjs";
import supertokens from "supertokens-node";

import * as SuperTokensConfig from '../../config/supertokensConfig'

supertokens.init(SuperTokensConfig.backendConfig())

export default async function superTokens(req, res) {
    return await superTokensNextWrapper(
        async next => {
            await supertokens.middleware()(req, res, next);
        },
        req,
        res
    );
}
