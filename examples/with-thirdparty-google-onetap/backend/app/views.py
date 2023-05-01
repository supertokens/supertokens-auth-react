from rest_framework.views import APIView
from django.utils.decorators import method_decorator


from django.http import JsonResponse

from supertokens_python.recipe.session.framework.django.syncio import verify_session


class SessionInfoAPI(APIView):
    @method_decorator(verify_session())
    def get(self, request, format=None):
        session_ = request.supertokens
        return JsonResponse(
            {
                "sessionHandle": session_.get_handle(),
                "userId": session_.get_user_id(),
                "accessTokenPayload": session_.get_access_token_payload(),
            }
        )
