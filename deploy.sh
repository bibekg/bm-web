#!/bin/bash

EC2_USER="ubuntu"
MANAGER="52.34.132.106"
ECS_REPO="889119803653.dkr.ecr.us-west-2.amazonaws.com"

NODE_ENV=''
if [[ $TRAVIS_BRANCH == "bibek/ci" ]]; then
  NODE_ENV="staging"
elif [[ $TRAVIS_BRANCH == "production" ]]; then
  NODE_ENV="production"
else
  # Don't want to do deployment stage if it's not one of these branches
  echo "Not deploying"
  exit
fi

APP_NAME="web_$NODE_ENV"
VERSION=$TRAVIS_COMMIT
echo "Deploying version $VERSION to $APP_NAME!"

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
eval $(aws ecr get-login --no-include-email --region us-west-2 | sed 's|https://||')

# Build the Docker image for this app target from the current directory's contents
# Pass in the NODE_ENV so it has context
docker build --build-arg node_environment=$NODE_ENV -t $APP_NAME .

# Tag this Docker image as the latest version
docker tag $APP_NAME:latest "$ECS_REPO/$APP_NAME:$VERSION"

# Push the built Docker image to the EC2 container registry
docker push "$ECS_REPO/$APP_NAME:$VERSION"

# Tell the EC2 instance to restart the Docker image with this new version
ssh $EC2USER@$MANAGER -i id_rsa_bruinmeet "cd bm-deployments/$NODE_ENV; make deploy"
