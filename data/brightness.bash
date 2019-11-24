#!/bin/bash
# Change the brightness
brightness () {
    for i in $(xrandr -q | grep "\bconnected" | awk '{print $1}'); do
       xrandr --output $i --brightness $1
    done
}

brightness $1
