cd setup/local

FE_PID=$(cat fe.pid)
BE_PID=$(cat be.pid)

kill -2 $FE_PID
kill -2 $BE_PID

rm fe.pid
rm be.pid
