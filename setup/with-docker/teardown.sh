NETWORK=${NETWORK:-"compute-dashboard"}
BE_IMAGE=${BE_IMAGE:-"compute-dashboard-backend:latest"}
FE_IMAGE=${BE_IMAGE:-"compute-dashboard-frontend:latest"}
HOST_PORT=${HOST_PORT:-8080}

mkdir -p .assets

echo "saving logs of compute-dashboard-frontend"
docker logs compute-dashboard-frontend > ./.assets/fe.log 2>&1

echo "killing container compute-dashboard-frontend"
docker kill compute-dashboard-frontend

echo "saving logs of compute-dashboard-backend"
docker logs compute-dashboard-backend > ./.assets/be.log 2>&1

echo "killing container compute-dashboard-backend"
docker kill compute-dashboard-backend

echo "removing network ${NETWORK}"
docker network rm ${NETWORK}
