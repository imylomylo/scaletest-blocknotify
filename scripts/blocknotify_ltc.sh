#!/bin/bash
LITECOINCLI=$(which litecoin-cli)
echo "${1}" > kaveman.log
BLOCKINFO=`${LITECOINCLI} getblock ${1}`
echo "${BLOCKINFO}" >> kaveman.log