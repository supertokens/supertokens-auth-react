docker run -d \
    --restart=always \
    --name demo-app-thirdpartypasswordless \
    --label name=demo-app \
    --label type=app \
    --label mode=production \
    --volume /home/ubuntu/supertokens-auth-react/examples/with-thirdpartypasswordless:/usr/src/app \
    --publish 10008:10000 \
    --publish 10009:10001 \
    supertokens/demo