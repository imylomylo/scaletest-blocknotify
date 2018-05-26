#!/bin/bash
DIGIBYTECLI=$(which digibyte-cli)
echo "${1}" > kaveman.log
BLOCKINFO=`${DIGIBYTECLI} getblock ${1}`
echo "${BLOCKINFO}" >> kaveman.log