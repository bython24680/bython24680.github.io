---
title: 在 Windows 10 上安裝 WSL2
permalink: post/install-wsl-2-on-windows-10
date: 2021-02-06 23:43:43
tags:
- windows 10
- wsl 2
---

## 開始之前

安裝完覺得這東西太好玩了所以打篇文章分享怎麼安裝，對於想在 Windows 上直接使用 Linux 系統進行開發的你絕對不能錯過這個工具。

目前官方出到 v2，v2 與 v1 差別可見官方文件的說明，簡單來說 v2 比 v1 支援更多，效能也更好，現在這個時間點來說（2021.02）會建議直接安裝 WSL2 而非 WSL1。

這邊的安裝方式會參考官方的步驟，但部分會直接使用 UI 進行安裝，而非像官方使用 Command line 進行安裝。

另外有看到文章說在安裝前須先開啟開發人員模式，雖然我是開啟了，但看官方的安裝文件裡似乎沒有這一步的說明，所以應該不用開才是。

## 資訊

- [Microsoft 官方文件：適用於 Linux 的 Windows 子系統文件](https://docs.microsoft.com/zh-tw/windows/wsl/)

## 前置需求

- Windows 10 版本號 1903 或 1909 或以上

## 開始安裝

步驟簡單來說總共有四步：

1. 啟用 WSL2 和虛擬機器平台並重開機
1. 安裝 Linux 核心更新套件
1. 設定 WSL2 為預設
1. 安裝一種版本的 Linux

首先是啟用 WSL2 和虛擬機器平台，這邊的步驟在官方文件內是使用 Command line 進行安裝，但這邊其實也可以直接 UI 操作。

在 Windows 10 左下角的開始選單 > 設定（就是那個齒輪）> 應用程式 > 應用程式與功能，將畫面滑到最下方找 `程式與功能`，點擊後開啟的視窗左邊找 `開啟或關閉 Windows 功能`。開啟的視窗內請找 `Windows 子系統 Linux 版`（如果只想裝 WSL1 可以只勾這個） 與 `虛擬機器平台`，找到這兩個後一起勾選，接著會進入 Windows 更新與重開機，就讓他進行重開機吧。

{% asset_img install-1.jpg 應用程式 %}

{% asset_img install-2.jpg 程式與功能 %}

{% asset_img install-3.jpg 開啟或關閉 Windows 功能 %}

重開機完之後請開啟官方文件頁面的[安裝 WSL 並更新至 WSL2](https://docs.microsoft.com/zh-tw/windows/wsl/install-win10)這一頁，找到[步驟4 - 下載 Linux 核心更新套件](https://docs.microsoft.com/zh-tw/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package)，下載這個更新套件後雙點擊它以進行安裝。如果這一步跳過的話，在設定 WSL2 為預設版本時會出現 `WSL 2 需要更新其核心元件。如需詳細資訊，請造訪 visit https://aka.ms/wsl2kernel` 這個錯誤，所以還請別跳過這個步驟。

{% asset_img install-4-error.jpg 沒有先安裝 Linux 核心元件就想指定 WSL2 為預設 %}

> 你問我為什麼我會知道會噴錯呢？對，因為我就是第一次安裝時沒注意到就直接跳過這一步的人ww

安裝完 Linux 核心元件後接著以管理者權限開啟 Powershell 並指定 WSL2 為預設：

```shell=
wsl --set-default-version 2
```

順利的話終端機上應該只會出現這句話：`有關 WSL 2 的主要差異詳細資訊，請瀏覽 https://aka.ms/wsl2`，到這邊 WSL2 就安裝完畢！接著要到 Microsoft store 選擇一種 Linux 版本進行安裝。

開啟 Microsoft store 並以 Linux 為關鍵字進行搜尋就可以看到好幾個版本的 Linux，選一個喜歡的安裝吧。第一次安裝與啟動會耗一點時間，在第二次啟動時就不會花到這麼多時間了。

安裝完後選擇直接啟動的話就會啟動該 Linux 版本的終端機，第一次開啟時須設定該 Linux 的使用者帳密，設定完畢後就會直接登入。不小心關閉 Linux 終端機的話可以在開始選單內找剛剛安裝的 Linux，點擊後就會開啟該 Linux 的終端機。

## 額外補充

如果 Windows 10 上面有安裝 Windows Terminal 的話，可以在開啟新分頁時點擊向下箭頭開啟選單，裡面可以選剛剛安裝的 Linux，選擇後就會直接用 Windows Terminal 開啟該 Linux 的終端機喔！真的方便。

{% asset_img windows-terminal.jpg Windows Terminal %}
