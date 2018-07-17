#!/bin/bash

AWS_S3_REGION="us-west-2"
STAGING_BRANCH="bibek/s3cmd-to-awss3"
PRODUCTION_BRANCH="production"

# Determine the S3 bucket to deploy to based on which branch this commit is on
NODE_ENV=''
if [[ $TRAVIS_BRANCH == $STAGING_BRANCH ]]; then
  NODE_ENV="staging"
  yarn build:staging
elif [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
  yarn build:production
else
  # Don't want to deploy if it's not one of the above branches
  echo "Not deploying"
  exit
fi
S3_BUCKET="bruinmeet-web-$NODE_ENV"
echo "Deploying to the $S3_BUCKET bucket"

sudo pip install awscli --upgrade --user
aws --version

# Sync our build folder with our S3 bucket
aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete
