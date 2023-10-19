#!/usr/bin/env bash

echo "Package STARTING"
BASE_DIR=${SCRIPT_DIR:-`PWD`}
BASE_PROJECT_DIR=${BASE_DIR}/..
echo "SCRIPT_DIR: $BASE_DIR"

for d in $( ls $BASE_DIR ); do
if [ -f $d/go.mod ]; then
    cd $d

    pwd

    cd $BASE_DIR
fi
done

echo "Package STOPPED"