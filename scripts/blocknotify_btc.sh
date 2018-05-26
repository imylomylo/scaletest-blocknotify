#!/bin/bash
BTCCLI=$(which bitcoin-cli)
echo "${1}" > kaveman.log
BLOCKINFO=`${BTCCLI} getblock ${1}`
echo "${BLOCKINFO}" >> kaveman.log