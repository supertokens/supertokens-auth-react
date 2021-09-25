docker run -d \
    --restart=always \
    --name demo-app-thirdpartyemailpassword \
    --label name=demo-app-thirdpartyemailpassword \
    --volume /home/ubuntu/supertokens-auth-react/examples/with-thirdpartyemailpassword:/usr/src/app \
    --publish 10004:10000 \
    --publish 10005:10001 \
    supertokens/demo