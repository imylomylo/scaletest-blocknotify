#!/bin/bash
DASHCLI=$(which dash-cli)
echo "${1}" > kaveman.log
BLOCKINFO=`${DASHCLI} getblock ${1}`
echo "${BLOCKINFO}" >> kaveman.log