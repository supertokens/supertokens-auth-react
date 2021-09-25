docker run -d \
    --restart=always \
    --name demo-app \
    --label name=demo-app \
    --label type=app \
    --label mode=production \
    --volume /home/ubuntu/supertokens-demo-react:/usr/src/app \
    --publish 10000:10000 \
    --publish 10001:10001 \
    supertokens/demo