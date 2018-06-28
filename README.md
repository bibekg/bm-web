#  BruinMeet Web
This is the BruinMeet web app, hosted at [https://www.bruinmeet.com](https://www.bruinmeet.com).
The staging/test version is hosted at [https://www.bruinmeat.win](https://www.bruinmeat.win).

## Installation
These steps assume that you have already cloned the repository. To get the project up and running on your local machine:

1. Download and install [Node](https://nodejs.org/).
2. Download and install [Yarn](https://yarnpkg.com/en/docs/install).
    * We use `yarn` instead of `npm` due to it being much more performant, easier to use, etc.
3. cd into the `bm-web` directory.
4. Install the project dependencies with the command: `yarn`
5. Start the dev server with the command: `yarn dev` which hosts the website at [http://localhost:8080](http://localhost:8080).
    * Also, note that running `bm-web` alone isn't enough to load the website. `bm-api` must also be running in order for HTTP requests that `bm-web` makes to be fulfilled. Read the `bm-api` README for installation instructions.

## Deployment
In order to publish the current state of the front-end app to the Docker repository, run one of the following commands, depending on which environment you'd like to deploy to:
```
make push NODE_ENV=staging
```
```
make push NODE_ENV=production
```

* Running this command requires that you have the appropriate keys configured on your machine.

Once this is done, you can complete the rest of the deployment process from the `bm-deployments` [repository](https://github.com/jeffreyxchan/bm-deployments).
