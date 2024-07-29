#!/bin/bash
MAIN_DIR=/home/ubuntu/databases/lkequiz
# MAIN_DIR=/Users/kamilmuc/ws/lkequiz/database/flyway
cd $MAIN_DIR/users
flyway -configFiles=users.conf clean
flyway -configFiles=users.conf info
flyway -configFiles=users.conf migrate
flyway -configFiles=users.conf info
rm report*
# cd ..

cd $MAIN_DIR/questions
flyway -configFiles=questions.conf clean
flyway -configFiles=questions.conf info
flyway -configFiles=questions.conf clean
flyway -configFiles=questions.conf migrate
flyway -configFiles=questions.conf info
rm report*
# cd ..