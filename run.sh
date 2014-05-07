#!/bin/bash

# Run TW5 under node-webkit

rm -rf output/*

mkdir -p output/osx

# Copy the node-webkit base app

cp -R bin/app/osx output

# Delete any existing app.nw folder
rm -rf output/osx/node-webkit.app/Contents/Resources/app.nw

# Copy the OS X app folder
cp -R source output/osx/node-webkit.app/Contents/Resources/app.nw

# Copy OS X Info.plist
cp Info.plist output/osx/node-webkit.app/Contents/Info.plist

# Run the app
./output/osx/node-webkit.app/Contents/MacOS/node-webkit
