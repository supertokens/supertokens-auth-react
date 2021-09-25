docker run -d \
    --restart=always \
    --name demo-app-thirdparty \
    --label name=demo-app-thirdparty \
    --volume /home/ubuntu/supertokens-demo-react-thirdparty:/usr/src/app \
    --publish 10002:10000 \
    --publish 10003:10001 \
    supertokens/demo