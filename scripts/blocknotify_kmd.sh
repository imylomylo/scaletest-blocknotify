#!/bin/bash
source config.sh
LOGDIR=${LOGDIR}
KOMODOCLI=$(which komodo-cli)
#RESULT=$(${KOMODOCLI} getblock ${1})
RESULT="{ \"size\": 696770, \"height\": 10, \"time\": 1527755479, \"totaltx\": \"3084\", \"ac\": \"TXSCL220\" }"
# This prints blockhash from the `blocknotify=<script> %s` from komodo.conf
if [ ${DEBUG} -e "TRUE" ]
then
    echo $1 > ${LOGDIR}/kaveman.log
    RESULT=$(cat sample.txt)
    echo ${RESULT}
fi
sleep 1
curl \
--verbose \
--request OPTIONS \
${BLOCKNOTIFYURL} \
--header 'Origin: http://localhost:8000' \
--header 'Access-Control-Request-Headers: Origin, Accept, Content-Type' \
--header 'Access-Control-Request-Method: POST'
sleep 2
curl \
--verbose \
--header "Origin: http://localhost:8000" \
--request POST \
--data "${RESULT}" \
${BLOCKNOTIFYURL}
