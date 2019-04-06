BE_PORT=${BE_PORT:-8081}
FE_PORT=${FE_PORT:-8080}

mkdir -p .assets

ASSETS_PATH="$(PWD)/.assets"

git submodule init
git submodule update

cd setup/local

cd compute-dashboard-backend
npm install
DEBUG=* nohup npm start > $ASSETS_PATH/be.log 2>&1 &
BE_PID=$!
cd ..
echo $BE_PID > be.pid

cd compute-dashboard-frontend
npm install
nohup npx webpack-dev-server --mode production > $ASSETS_PATH/fe.log 2>&1 &
FE_PID=$!
cd ..
echo $FE_PID > fe.pid
sleep 5 # let webpack dev server start
