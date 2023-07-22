---
title: 執行 shell script 時出現 syntax error near unexpected token `$'do\r' 錯誤
permalink: post/shell-script-syntax-error-near-unexpected-token/
date: 2023-07-22 22:49:57
tags:
- Unix
- Windows
- Shell script
---

## 開始之前

在 windows 寫完 shell script 後進 Ubuntu 測試，然後在 for 迴圈的 do 噴了這個錯誤。看後面的 `\r` 直覺是換行符號的問題，結果也真的是換行符號的問題。

## 處理方式

先直接說處理方式，在 Ubuntu 安裝 `dos2unix` 後對出問題的檔案使用即可。

```
$ apt-get install dos2unix
$ dos2unix <file_path>
```

## 發生什麼事？

主要是因為在 Windows 上與 Unix 上的檔案的換行符號不同，再加上 Apple 系列的話分為三種：

- LF（Line feed），ASCII code 10，`\n`：Unix 或 Unix base 的系統
- CR（Carriage return），ASCII code 13，`\r`：Apple 系統
- CR+LF，`\r\n`：DOS 與 Windows 系統

Ubuntu 為 Unix base 的系統，使用的換行符號只有 LF，但 Windows 為 CR+LF，這樣一來導致在 Ubuntu 上執行該 shell script 時便出現問題。

另外一個可能會看到的行尾是`^M`，這個是 Control-M，就是 CR，一樣使用 `dos2unix` 可移除。
