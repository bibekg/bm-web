#!/bin/bash

AWS_S3_REGION="us-west-2"
STAGING_BRANCH="bibek/ci"
PRODUCTION_BRANCH="production"

# Determine the S3 bucket to deploy to based on which branch this commit is on
NODE_ENV=''
if [[ $TRAVIS_BRANCH == $STAGING_BRANCH ]]; then
  NODE_ENV="staging"
elif [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
else
  # Don't want to deploy if it's not one of the above branches
  echo "Not deploying"
  exit
fi
S3_BUCKET="bruinmeet-$NODE_ENV-app"
echo "Deploying to the $S3_BUCKET bucket"

sudo pip install s3cmd

# Run the appropriate build script based on ENV
if [[ $NODE_ENV == "staging" ]]; then
  yarn build:staging
elif [[ $NODE_ENV == "production" ]]; then
  yarn build:production
fi

# Sync our build folder with our S3 bucket
s3cmd \
  --access_key=$AWS_ACCESS_KEY_ID \
  --secret_key=$AWS_SECRET_ACCESS_KEY \
  --region=$AWS_S3_REGION \
  --acl-public \
  --delete-removed \
  sync public/* "s3://$S3_BUCKET"
