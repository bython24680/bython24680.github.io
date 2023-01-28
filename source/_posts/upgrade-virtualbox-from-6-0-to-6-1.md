---
title: Windows 10 升級 VirtualBox 6.0 至 6.1
permalink: post/upgrade-virtualbox-from-6-0-to-6-1-on-windows-10/
date: 2021-03-27 23:10:24
tags:
- windows 10
- virtualbox
- homestead
- ubuntu
---

## 開始之前

我的 VirtualBox 很單純，只有裝 Homestead 跟 Ubuntu 18.04，但更新完畢到正常啟動 Homestead 與 Ubuntu18.04 中間遇到了一些問題所以紀錄個，還真沒想到會遇到這些問題。

主角 VirtualBox 更新版本為 6.0 升級至 6.1，第一次進行更新的預計流程為：

1. 更新 VirtualBox
1. 重新安裝兩台 VM
1. 逐一啟動並確認是否能正常啟動與使用

## 正文開始

### VirtualBox

因為原本的 VirtualBox 是裝在 HDD，而新的想裝在 SSD，所以我的做法是先到應用程式中心將舊的 VirtualBox 刪除再重新安裝。意外的是安裝完後原本的兩台 VM 都還在，以為全部都要重來了說，感動。

VirtualBox 官方的下載頁請這邊走：[Downloads - Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads)。此篇文章安裝時最新的版本為 6.1.18。

### Vagrant

對，沒看錯，就是 Vagrant。

更新完看到 VM 還健在，接著當然就是直接進第三步，於是我先啟動比較重要的 Homestead。使用 `vagrant up` 啟動後就遇到一連串的問題 (´・ω・`)

#### 版本更新

首先是 vagrant 版本過舊的問題。什麼，居然要更新 vagrant 嗎？console 出現的 vagrant 建議版本為 4.0 ~ 6.0，但到官方看當前最新也就 2.2，（然後本機端用 `vagrant -v` 查看是 2.0）總之還是先下載然後進行安裝。

下載點請走這邊：[Download | Vagrant by HashiCorp](https://www.vagrantup.com/downloads)

安裝 vagrant 耗時有點久，而且第一步卡特別久，總之裝完然後重開機繼續。

#### Plugin version

第二次 `vagrant up` 遇到的問題是 plugin 版本過舊：
```
Vagrant failed to initialize at a very early stage:

The plugins failed to initialize correctly. This may be due to manual
modifications made within the Vagrant home directory. Vagrant can
attempt to automatically correct this issue by running:

  vagrant plugin repair

If Vagrant was recently updated, this error may be due to incompatible
versions of dependencies. To fix this problem please remove and re-install
all plugins. Vagrant can attempt to do this automatically by running:

  vagrant plugin expunge --reinstall

Or you may want to try updating the installed plugins to their latest
versions:

  vagrant plugin update

Error message given during initialization: Unable to resolve dependency: user requested 'vagrant-parallels (= 2.0.1)'
```

好又是版本問題，三個方法內我選擇使用 `vagrant plugin update`，將 `vagrant-parallels` 更新到 2.2.0。

#### network

第三次 `vagrant up` 遇到網卡問題：
```
Stderr: VBoxManage.exe: error: Failed to open/create the internal network 'HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter #2' (VERR_INTNET_FLT_IF_NOT_FOUND).
VBoxManage.exe: error: Failed to attach the network LUN (VERR_INTNET_FLT_IF_NOT_FOUND)
VBoxManage.exe: error: Details: code E_FAIL (0x80004005), component ConsoleWrap, interface IConsole
```

完全不知道發生什麼事，拿關鍵字直接 google 後找到一篇說重啟網卡就好，於是：

1. 開啟裝置管理員
1. 裝置管理員介面內找網路介面卡
1. 找到錯誤訊息內的那張網卡 VirtualBox Host-Only Ethernet Adapter #2
1. 右鍵 -> 停用裝置，停用後再次右鍵 -> 啟用裝置

{% asset_img network.jpg 裝置管理員-網路介面卡 %}

#### 啟用成功

到這邊再次 `vagrant up` 終於成功了。如果覺得啟用過程中跳出權限的詢問有點煩，請使用管理權限開啟終端機再進行 `vagrant up` 的動作。

### Ubuntu 18.04

這邊只有出現一個問題，當初為了 mount Windows 本機端資料夾進這台機器，有使用 Gust Additions CD 映像，而重新安裝後這個映像檔案遺失了。

在 VirtualBox 介面上其實就會提示遺失，在啟動時也會跳出警告視窗說明此映像遺失，但機器還是能順利啟動。啟動後在視窗上方的工具列 / 裝置內選擇 `插入 Guest Additions CD 映像` 後解決。

## 最後

沒想到一個升級可以出現四個問題，紀錄個，說不定下次升級 VirtualBox 還會遇到。
