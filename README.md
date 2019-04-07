[![CircleCI](https://circleci.com/gh/EyalAr/compute-dashboard-e2e.svg?style=svg)](https://circleci.com/gh/EyalAr/compute-dashboard-e2e)

# Compute Dashboard E2E Tests

This repo contains E2E tests for the Compute Dashboard app.

## Quickstart

Copy-paste to your terminal:

```sh
npm install && \
MOCK=true npm run start-local
```

**Note: You must have Node 8 or higher**

## Usage

Install dependencies (do this before each of the following):

```sh
npm install
```

**All of the commands below assume the proper environment variables are set
(see below).**

Set up test environment - a backend and a frontend running locally:

```sh
MOCK=true npm run setup-local
```

Run tests:

```sh
npm start
```

Tear down test environment - stop frontend and backend services:

```sh
npm run teardown-local
```

### Using Docker (optional)

Since both the frontend and the backend are designed to run in Docker containers
we can use prebuilt BE & FE images to set up the test environment:

*Docker images for frontend and backend must be available. See Environment
variables section below for more info.*

Set up test environment - a backend and a frontend running locally:

```sh
MOCK=true npm run setup-with-docker
```

Run tests:

```sh
npm start
```

Tear down test environment - stop frontend and backend services:

```sh
npm run teardown-with-docker
```

### Environment variables

- `APP_PORT` - The port on which to run the web app. Defaults to `8080`
- `APP_URL` - The URL to which the test loads. Defaults to `http://localhost:${APP_PORT}`
- `MOCK` - If `true`, backend will serve mock data. Defaults to `false`
- `ARTIFACTS` - Test artifacts (screenshots, logs) directory. Defaults to `.artifacts`
- `AWS_ACCESS_KEY_ID` - AWS Access key ID
- `AWS_SECRET_ACCESS_KEY` - AWS Secret access key
- `AWS_REGION` - AWS region
- `USERNAME` - Username to log into the app. Defaults to `demo`
- `PASSWORD` - Password to log into the app. Defaults to `demo`

Local setup only:

- `BE_PORT` - Backend port. Defaults to `8081`

Docker setup only:

- `NETWORK` - Docker bridge network name. Defaults to `compute-dashboard`
- `BE_IMAGE` - Docker image for backend. Defaults to `compute-dashboard-backend:latest`
- `FE_IMAGE` - Docker image for frontend. Defaults to `compute-dashboard-frontend:latest`
