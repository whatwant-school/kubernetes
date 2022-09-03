#!/bin/bash
trap "exit" SIGINT
INTERVAL=$1
echo generate every $INTERVAL seconds
mkdir -p /var/htdocs

while :
do
  echo $(date) Writing to /var/htdocs/index.html
  /usr/games/fortune > /var/htdocs/index.html
  sleep $INTERVAL
done
