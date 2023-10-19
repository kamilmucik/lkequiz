#!/usr/bin/env bash

echo "Test STARTING"
BASE_DIR=${SCRIPT_DIR:-`PWD`}
BASE_PROJECT_DIR=${BASE_DIR}/..
echo "SCRIPT_DIR: $BASE_DIR"

for d in $( ls $BASE_DIR ); do
if [ -f $d/go.mod ]; then
    cd $d
    go test -coverprofile=coverage.out ./...  
    cd $BASE_DIR
fi
done

echo "Test STOPPED"