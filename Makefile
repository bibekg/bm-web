APP_NAME = web_${NODE_ENV}
ECR_URL  = 889119803653.dkr.ecr.us-west-2.amazonaws.com
GIT_HEAD = git rev-parse --short HEAD

ecr-login:
	$$(aws ecr get-login --no-include-email | sed 's|https://||')

build:
	docker build --build-arg node_environment=${NODE_ENV} -t $(APP_NAME) .

run:
	docker run -p "80:80" -it $(APP_NAME)

auth:
	source ~/.bashrc

push: auth ecr-login build
	docker tag $(APP_NAME):latest $(ECR_URL)/$(APP_NAME):latest
	docker push $(ECR_URL)/$(APP_NAME):latest
