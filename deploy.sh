#!/bin/bash

ECS_REPO="889119803653.dkr.ecr.us-west-2.amazonaws.com"
TRAVIS_BRANCH="bibek/ci"
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
echo "Deploying to $APP_NAME!"

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
aws ecr get-login --region us-west-2

# Build the Docker image for this app target from the current directory's contents
# Pass in the NODE_ENV so it has context
docker build --build-arg node_environment=$NODE_ENV -t $APP_NAME .

# Tag this Docker image as the latest version
docker tag $APP_NAME:latest "$ECS_REPO/$APP_NAME:latest"

# Push the built Docker image to the EC2 container registry
docker push "$ECS_REPO/$APP_NAME:latest"
