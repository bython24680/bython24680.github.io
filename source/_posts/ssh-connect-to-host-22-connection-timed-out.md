---
title: 處理 ssh connect to host 22 Connect timed out
permalink: post/ssh-connect-to-host-22-connection-timed-out
date: 2020-07-24 03:15:06
tags:
- ssh
- 問題處理
---

## 開始之前

主因是原本可以使用的 ssh 連線又不能（對，又）連，使用網頁登入主機商提供的網站管理後台內重開 ssh 連線功能後仍舊無法登入（以往重開便解決）。

因為已經不是第一次發生了，想了半天還是找出原因，不然緊急時刻需要 ssh 連線又連不上就頭痛了。

對 Linux 沒有很熟悉，以下為 google + 爬文最後實際進行處理的步驟紀錄。

## 處理流程

先 ping 連不上的 hostname，如果通過進入下一步。

接著使用 telnet hostname 22，確認 22 port 到底有沒有通。如果出現全黑的畫面，或者是全黑，然後第一行有像是  SSH-2.0-OpenSSH_7.4 之類的字就表示通過。

{% asset_img telnet-22-port.jpg Telnet port 22 %}

如果失敗則會出現無法開啟到主機的連線，在連接埠 22: 連線失敗。

確認後使用 ctrl+] 離開 telnet。

這邊遇到的是沒通過的狀況，所以繼續找原因。

因主機商有提供網頁版的網站管理後台，登入後先確認 ssh 功能到底有沒有開啟：

```
service sshd status
```

確認 ssh 有開啟後，接著確認 ssh 是否有被更改使用的 port 與對應的 port 有沒有被監聽（Listen）。

確認 ssh 使用的 port 為預設的 22 後，確認是否有被監聽：

```
netstat -lnpt | grep :22
```

此步驟確認 port 22 有被監聽。

到這邊能確定 ssh 功能是正常運作且對應需要開啟的 port 都有被開啟也有被監聽，於是猜測 ip 是否被防火牆擋了。

先查看防火牆是否有開啟：

```
service iptables status
```

確認防火牆開啟。查看防火牆封鎖的 ip ，列表是空的，`/etc/hosts.deny` 內也是空的。

於是到這邊能確認的：
- ssh 功能開啟也運作正常
- ip 沒被擋

猜測覺得最不可能的：是否防火牆沒讓 port 22 過。

會說最不可能是因為在這次連不上之前 ssh 連線是能使用的，然後某一天它突然不能用了，真心不懂啊，防火牆設定會自己噴掉嗎……？

這邊使用的是網頁的防火牆設定頁面，慢慢看防火牆的設定，最後在 TCP_IN 與 TCP_OUT 的部分發現 TCP_IN 沒放 port 22 通過，加上 port 22 並重開防火牆後，ssh 連線成功。
