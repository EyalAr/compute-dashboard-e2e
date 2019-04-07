NETWORK=${NETWORK:-"compute-dashboard"}
ARTIFACTS=${ARTIFACTS:-".artifacts"}
ARTIFACTS_PATH="$(pwd)/$ARTIFACTS"

mkdir -p $ARTIFACTS_PATH

echo "saving logs of compute-dashboard-frontend"
docker logs compute-dashboard-frontend > $ARTIFACTS_PATH/fe.log 2>&1

echo "killing container compute-dashboard-frontend"
docker kill compute-dashboard-frontend

echo "saving logs of compute-dashboard-backend"
docker logs compute-dashboard-backend > $ARTIFACTS_PATH/be.log 2>&1

echo "killing container compute-dashboard-backend"
docker kill compute-dashboard-backend

echo "removing network ${NETWORK}"
docker network rm ${NETWORK}
