#!/bin/sh
Foulder="$1"
uglifyjs ()
{
    for path in "$1"/*
    do
        if [ -d "$path" ];then
            uglifyjs "$path"
        elif [ -f "$path" ] && [[ "$path" =~ ".js" ]];then
            ./node_modules/.bin/uglifyjs "$path" -m -o "$path"
        fi
    done
}

uglifyjs "$Foulder"
