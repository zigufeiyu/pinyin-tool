#!/bin/sh
Foulder="$1"
uglifyjs ()
{
    for path in "$1"/*
    do
        if [ -d "$path" ];then
            uglifyjs "$path"
        elif [ -f "$path" ];then
            ./node_modules/_uglify-js@3.4.5@uglify-js/bin/uglifyjs "$path" -m -o "$path"
        fi
    done
}

uglifyjs "$Foulder"
