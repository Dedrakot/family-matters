#!/bin/sh

FOLDER=family-tree

mkdir $FOLDER
cp -r public/* $FOLDER
cp css-dist/main.min.css $FOLDER/main.css
cp dist/* $FOLDER

rm $FOLDER.7z
7z a -sdel $FOLDER.7z $FOLDER
