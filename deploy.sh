#!/bin/bash

AWS_S3_REGION="us-west-2"
STAGING_BRANCH="george/landing-page" # TODO: temporary!
PRODUCTION_BRANCH="production"

# Determine the environment to deploy to based on the branch
# From that, we'll know:
#   - the S3 bucket to sync assets with
#   - the CloudFront distribution for which to create an invalidation
NODE_ENV=''
CLOUDFRONT_DIST_ID=''
if [[ $TRAVIS_BRANCH == $STAGING_BRANCH ]]; then
  NODE_ENV="staging"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_STAGING
  yarn build:staging
elif [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_PRODUCTION
  yarn build:production
else
  # Don't want to deploy if it's not one of the above branches
  echo "Not deploying"
  exit
fi
S3_BUCKET="bruinmeet-web-$NODE_ENV"
echo "Deploying to the $S3_BUCKET bucket"

pip install awscli --upgrade --user

# Sync our build folder with our S3 bucket
aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete

# Force-invalidate the now-outdated assets rather than waiting for them to expire
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths /\*
