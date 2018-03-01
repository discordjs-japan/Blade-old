@echo off
title Setup - BladeBOT

if not exist .env goto setup

echo 既に .env ファイルが存在します
choice /m "上書きしますか？"

if "%errorlevel%"=="2" exit

:setup

echo セットアップ
set /p Token="Tokenを入力してください: "
echo Token=%Token%>.env
set /p Prefix="Prefixを入力してください: "
echo Prefix=%Prefix%>>.env
set /p Language="Languageを入力してください: "
echo Language=%Language%>>.env
set /p WelcomeChannel="WelcomeChannelを入力してください: "
echo WelcomeChannel=%WelcomeChannel%>>.env
set /p DocomoAPIKEY="DocomoAPIKEYを入力してください: "
echo DocomoAPIKEY=%DocomoAPIKEY%>>.env
