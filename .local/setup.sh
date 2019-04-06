NETWORK=${NETWORK:-"compute-dashboard"}
BE_IMAGE=${BE_IMAGE:-"compute-dashboard-backend:latest"}
FE_IMAGE=${BE_IMAGE:-"compute-dashboard-frontend:latest"}
HOST_PORT=${HOST_PORT:-8080}

echo "creating network ${NETWORK}"
docker network create --driver bridge ${NETWORK} || true

echo "running backend container from image ${BE_IMAGE}"
docker run --rm -d \
  --network ${NETWORK} \
  -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  -e AWS_REGION \
  -e MOCK=true \
  --name compute-dashboard-backend ${BE_IMAGE}

echo "running backend container from image ${FE_IMAGE} on host port ${HOST_PORT}"
docker run --rm -d \
  -p ${HOST_PORT}:80 \
  --network ${NETWORK} \
  --name compute-dashboard-frontend ${FE_IMAGE}
