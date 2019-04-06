NETWORK=${NETWORK:-"compute-dashboard"}
BE_IMAGE=${BE_IMAGE:-"compute-dashboard-backend:latest"}
FE_IMAGE=${BE_IMAGE:-"compute-dashboard-frontend:latest"}
HOST_PORT=${HOST_PORT:-8080}

mkdir -p .assets

echo "saving logs of compute-dashboard-frontend"
cp $(docker inspect --format='{{.LogPath}}' compute-dashboard-frontend) ./assets/fe.log

echo "killing container compute-dashboard-frontend"
docker kill compute-dashboard-frontend

echo "saving logs of compute-dashboard-backend"
cp $(docker inspect --format='{{.LogPath}}' compute-dashboard-backend) ./assets/be.log

echo "killing container compute-dashboard-backend"
docker kill compute-dashboard-backend

echo "removing network ${NETWORK}"
docker network rm ${NETWORK}
