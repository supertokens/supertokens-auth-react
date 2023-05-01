import json
from typing_extensions import override
import requests
from supertokens_python.recipe import session, thirdparty, dashboard
from supertokens_python.recipe.thirdparty import (
    Apple,
    Github,
    Google,
    InputOverrideConfig
)
from supertokens_python.recipe.thirdparty.types import UserInfo, UserInfoEmail
# import supertokens_python.recipe.thirdparty.asyncio as thirdparty
from supertokens_python import (
    InputAppInfo,
    SupertokensConfig,
)

# this is the location of the SuperTokens core.
supertokens_config = SupertokensConfig(
    connection_uri="https://try.supertokens.com")

app_info = InputAppInfo(
    app_name="Supertokens",
    api_domain="http://localhost:3001",
    website_domain="http://localhost:3000",
)

class GoogleOneTap(thirdparty.Google):
    async def get_profile_info(self, auth_code_response, user_context):
        return UserInfo(
            auth_code_response['sub'], 
            UserInfoEmail(auth_code_response['email'], auth_code_response['email_verified'].lower() == 'true')
        )


def thirdparty_api_override(original_implementation):
    osign_in_up_post = original_implementation.sign_in_up_post

    async def custom_sign_in_up_post(provider, code, redirect_uri, client_id, auth_code_response, api_options, user_context):
        request = user_context["_default"]["request"]
        request_body = json.loads(request.request.body)
        if not request_body.get('oneTap'):
            return await osign_in_up_post(provider, code, redirect_uri, client_id, auth_code_response, api_options, user_context)

        resp = requests.get('https://oauth2.googleapis.com/tokeninfo', {'id_token': request_body.get('code')}).json()
        return await osign_in_up_post(GoogleOneTap("", ""), None, None, None, resp, api_options, user_context)


    original_implementation.sign_in_up_post = custom_sign_in_up_post
    return original_implementation


# recipeList contains all the modules that you want to
# use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
recipe_list = [
    session.init(),
    thirdparty.init(
        sign_in_and_up_feature=thirdparty.SignInAndUpFeature(providers=[
            # We have provided you with development keys which you can use for testing.
            # IMPORTANT: Please replace them with your own OAuth keys for production use.
            GoogleOneTap(
                client_id='1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
                client_secret='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'
            )
        ]),
        override=InputOverrideConfig(
            apis=thirdparty_api_override
        )
    ),
    dashboard.init()
]
