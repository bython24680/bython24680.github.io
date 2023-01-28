---
title: 關閉滑鼠在 Mac 的 iTerm2 上滾動時出現指令歷史紀錄 
permialink: post/disable-mouse-scrolling-through-command-history-on-mac-iterm2/
date: 2022-12-12 23:58:41
tags:
- mac
- iterm2
- terminal
---

## 開始之前

[iTerm2](https://iterm2.com) 是一個支援 Mac 平台的 terminal，能取代 Mac 原生的 terminal，與原生的 termianl 相比使用上較便利，功能也較多。

簡單介紹兩者 UI 差別：

{% asset_img iterm2-vs-embeded-terminal.jpg %}
<div style="text-align:center">[圖一] iTerm2 v.s. Mac 原生 terminal</div>

可以見到 iTerm2 介面多了很多東西，預設有些是不會開啟，要手動開啟才會像上面比對圖那樣，這邊就不多作介紹。

## 發生的問題

預設使用滑鼠在 iTerm2 上滾動時，滾動的是整個視窗的內容，所以能看到之前的內容，當顯示在 terminal 上的 log 內容很長，長到超出整個畫面時，也能透過這個方式查看畫面外的內容。

對，直到某一天 iTerm2 彈出一個詢問框問我要不要 OOXX，然後一個沒看仔細點了 OK，我的 iTerm2 就變成滾動滑鼠看到的是指令歷史紀錄而不是畫面外的內容了。

改了好幾個設定檔都沒有用（從 tmux 改到 vim），最後終於確認是 iTerm2 的設定也終於改回來了。

## 修改方式

首先打開 iTerm2，點開左上角蘋果 icon 右邊的 iTerm2，找到 Preference 後點下去。

{% asset_img iterm2-preferences.jpg %}
<div style="text-align:center">[圖二] iTerm2 Preferences 選項</div>

打開 Preferences 視窗後，點開 Advanced，直接用關鍵字「scroll」搜尋，找到「Scroll wheel sends arrow keys when in alternate screen mode.」，這邊應該會是 Yes，改成 No 後重開 iTerm2 就解決了。

{% asset_img iterm2-preferences-scroll.jpg %}
<div style="text-align:center">[圖三] iTerm2 Preferences Advanced 選單</div>
