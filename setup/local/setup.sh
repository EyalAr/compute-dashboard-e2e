BE_PORT=${BE_PORT:-8081}
FE_PORT=${FE_PORT:-8080}
MOCK=${MOCK:-false}
ARTIFACTS=${ARTIFACTS:-".artifacts"}
ARTIFACTS_PATH="$(pwd)/$ARTIFACTS"

mkdir -p $ARTIFACTS_PATH

git submodule init
git submodule update

cd setup/local

cd compute-dashboard-backend
npm install
DEBUG=* nohup npm start > $ARTIFACTS_PATH/be.log 2>&1 &
BE_PID=$!
cd ..
echo $BE_PID > be.pid

cd compute-dashboard-frontend
npm install
nohup npx webpack-dev-server --mode production > $ARTIFACTS_PATH/fe.log 2>&1 &
FE_PID=$!
cd ..
echo $FE_PID > fe.pid

# wait for frontend (up to 60 seconds):
COUNTDOWN=60
echo "Waiting for frontend to be ready..."
until nc -vz 127.0.0.1 $FE_PORT
do
  if [ $COUNTDOWN -eq 0 ]; then
    break
  fi
  sleep 1
  COUNTDOWN=$((COUNTDOWN - 1))
done
