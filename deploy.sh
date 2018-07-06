#!/bin/bash

EC2_USER="ubuntu"
MANAGER="52.34.132.106"
ECS_REPO="889119803653.dkr.ecr.us-west-2.amazonaws.com"
AWS_S3_REGION="us-west-2"

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
S3_BUCKET="bruinmeet-$NODE_ENV-app"
echo "Deploying to the $S3_BUCKET bucket"

sudo apt-get install s3cmd
s3cmd \
  --access_key=$AWS_ACCESS_KEY_ID \
  --secret_key=$AWS_SECRET_ACCESS_KEY \
  --region=$AWS_S3_REGION \
  sync public/* "s3://$S3_BUCKET"
