@echo off
title BladeBOT

call check.bat

:run

echo ==============ボットを起動します==============

node run.js

echo ボットの再起動を開始します。
echo 何も選択がなかった場合は５秒後に自動で再起動されます
choice /t 5 /d y /m "再起動してよろしいですか？"

if /i "%errorlevel%"=="1" goto run

exit
