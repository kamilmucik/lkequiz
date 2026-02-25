#!/bin/bash
cd /tmp/

flyway -configFiles=users/users.conf info
flyway -configFiles=users/users.conf migrate

flyway -configFiles=questions/questions.conf info
flyway -configFiles=questions/questions.conf migrate