@echo off
title BladeBOT

call check.bat

:run

echo ==============ボットを起動します==============

node run.js

echo ボットが終了しました。
echo ５秒後に自動で続けられます
choice /t 5 /d y /m "ループを続けますか？"

if /i "%errorlevel%"=="1" goto run

exit
