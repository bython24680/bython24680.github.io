---
title: Mac 更新後出現 xcrun error
permalink: post/mac-xcode-select-error/
date: 2023-06-18 23:12:25
tags:
- Mac
- Xcode
---

## 開始之前

終於更新到 Ventura 後又更新了看來是 Bug 的更新，重開機後打開 iTerm2 下 `git pull --rebase` 就出現錯誤提示：

```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

我只是更新個 Bug 啊別這樣。

## 如何處理

有兩種方法可以處理：一種是打開 System Settings，可能會提示有東西需要更新，點進去看如果是 Xcode 的更新，恭喜就是這個，更新完就沒問題了。第二種是終端機直接下指令 `xcode-select --install`，這樣也會出現詢問更新的視窗與更新進度（圖一），跟 System Settings 那個是一樣的東西。

如果使用指令更新，且 System Settings 內也有出現更新提示的話，點進 System Settings 會看到狀態是更新中，也有更新進度（圖二）。

{% asset_img update-xcode-install-process.jpg 更新進度的視窗 %}
<div style="text-align:center">[圖一] 更新進度的視窗</div>
<br>
{% asset_img mac-software-update-xcode.jpg System Settings 的更新進度 %}
<div style="text-align:center">[圖二] System Settings 內的更新進度</div>

要注意的是，在 System Settings 有出現更新提示，但卻使用指令進行更新的話，更新完畢後又開 System Settings 可能會看到 Xcode 相關的更新還在列表內，等他畫面刷新，或者關掉視窗重開就好。

