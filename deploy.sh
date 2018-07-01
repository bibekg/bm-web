#!/bin/bash

EC2_USER="ubuntu"
MANAGER="52.34.132.106"
ECS_REPO="889119803653.dkr.ecr.us-west-2.amazonaws.com"

# Determine the environment to deploy to based on which branch this commit is on
NODE_ENV=''
if [[ $TRAVIS_BRANCH == "bibek/ci" ]]; then
  NODE_ENV="staging"
elif [[ $TRAVIS_BRANCH == "production" ]]; then
  NODE_ENV="production"
else
  # Don't want to deploy if it's not one of the above branches
  echo "Not deploying"
  exit
fi

APP_NAME="web_$NODE_ENV"
echo "Deploying to $APP_NAME"

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
eval $(aws ecr get-login --no-include-email --region us-west-2 | sed 's|https://||')

# Build the Docker image for this app target from the current directory's contents
# Pass in the NODE_ENV so it has context
docker build --build-arg node_environment=$NODE_ENV -t $APP_NAME .

# Tag this Docker image as the latest version
docker tag $APP_NAME:latest "$ECS_REPO/$APP_NAME:latest"

# Push the built Docker image to the EC2 container registry
docker push "$ECS_REPO/$APP_NAME:latest"

# Build id_rsa_bruinmeet keyfile using ENV var stored in TravisCI settings
touch id_rsa_bruinmeet
# Reduce permissions to owner-only to keep awscli happy
chmod 0600 id_rsa_bruinmeet
echo "-----BEGIN RSA PRIVATE KEY-----" > id_rsa_bruinmeet
echo $AWS_EC2_PEM >> id_rsa_bruinmeet
echo "-----END RSA PRIVATE KEY-----" >> id_rsa_bruinmeet

# Tell the EC2 instance to re-deploy (which will use this new version we just pushed)
# Disable "Are you sure you want to connect" message with -o "StrictHostKeychecking no"
ssh -o "StrictHostKeyChecking no" $EC2_USER@$MANAGER -i id_rsa_bruinmeet "cd bm-deployments/$NODE_ENV; make deploy"

# Cleanup
rm id_rsa_bruinmeet
