#!/bin/bash

cd users
flyway -configFiles=users.conf info
rm report*
cd ..

cd questions
flyway -configFiles=questions.conf info
rm report*
cd ..