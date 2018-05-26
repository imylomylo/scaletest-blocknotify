#!/bin/bash
source config.txt
LOGDIR=${LOGDIR}
KOMODOCLI=$(which komodo-cli)
RESULT=$(${KOMODOCLI} getblock ${1})
# This prints blockhash from the `blocknotify=<script> %s` from komodo.conf
if [ ${DEBUG} -e "TRUE" ]
then
    echo $1 > ${LOGDIR}/blocknotify.log
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
