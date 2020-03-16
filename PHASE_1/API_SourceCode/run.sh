#!/bin/sh

max=$1
c=0
while [ $c -le $max ]
do
  python3 get_source_content.py $c
  c=$(( $c + 1 ))
done