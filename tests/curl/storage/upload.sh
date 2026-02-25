#!/bin/bash

curl -X POST http://localhost:3000/storage -F "file=@data/file.jpg"