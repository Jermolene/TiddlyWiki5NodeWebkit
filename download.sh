#!/bin/bash

# Download and unzip node-webkit 0.8.6

mkdir -p bin
mkdir -p bin/zip
mkdir -p bin/app
mkdir -p bin/app/osx

rm -rf bin/app/*

curl -o bin/zip/node-webkit-v0.8.6-osx-ia32.zip http://dl.node-webkit.org/v0.8.6/node-webkit-v0.8.6-osx-ia32.zip

unzip bin/zip/node-webkit-v0.8.6-osx-ia32.zip -d bin/app/osx
