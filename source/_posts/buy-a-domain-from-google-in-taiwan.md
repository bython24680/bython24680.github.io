---
title: 如何在台灣購買 Google domains 網域
permalink: post/buy-a-domain-from-google-in-taiwan
date: 2020-06-27 22:01:46
tags:
- google domains
---

## 開始之前

因為想幫部落格買個 domain，在 [Godaddy](https://tw.godaddy.com/) 跟 [Google domains](https://domains.google.com/) 之間猶豫不決，最後選擇了 Google domains。

決定的比較點是：

1. Godaddy 網域價格第一年可能比較便宜，甚至比 Google domains 便宜，但那價格僅適用於第一年，第二年價格會多上許多
1. Google Domains 對我而言比較好管理，不用再另外註冊一個帳號
1. Google Domains 購買後直接提供 [WHOIS Privacy](https://en.wikipedia.org/wiki/Domain_privacy)，無須額外購買。Godaddy 則需要額外購買。

基於以上所以選擇了 Google domains。

因為印象中 Google domains 會擋台灣購買，但朋友又說可以購買，他也買成功了，於是決定試試看。

## 資訊

- [Google Domains](https://domains.google.com/)

## Google domains

### 第一步：搜索網域名稱

部落格名稱維持 zoneless 有一段時間了，之前還在 weebly 時網址內也是有加上 zoneless，所以決定繼續使用 zoneless。

決定好名稱後，就是決定網域結尾了。

網域結尾其實有個專有名詞，叫做 [Top-level domain](https://en.wikipedia.org/wiki/Top-level_domain)，可以到[維基百科](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)看列表與該結尾代表的意義。

### 第二步：結帳

決定好網域名稱後就直接加進購物車進入結帳。

{% asset_img google-domain-1.jpg Google domains 購物車 %}

`.DEV` 如說明所示需搭配 SSL 憑證，因為此網域是要給 Github pages 使用，所以就沒額外處理憑證。其他的網域結尾不一定會有此提示框。

可以看到隱私保護服務已啟用，這點不建議取消。

接著會進入填寫資訊的步驟，若已經填寫過則這一步會跳過並使用之前填寫過的資訊。

{% asset_img google-domain-2.jpg 填寫資訊 %}

儲存後進入下一步。

{% asset_img google-domain-3.jpg 結帳 %}

這一步若地區選擇美國以外的話可能會出現「該地區 domain 僅提供公司行號使用」這類的提示，並且無法進行結帳的動作。須至側邊欄的地區進行地區更改。將地區選擇美國後可繼續進行這個步驟。注意事項如範例圖所示，特別注意的是帳單地址，這邊的帳單地址並不需要填寫完整的地址，只需要填寫地區與郵遞區號，請務必照實填寫，至少地區與郵遞區號要能對上。

這邊填寫的帳單地址可至 [Google pay](https://pay.google.com/gp/w/home/settings) 裡查看，Google domains 順利結帳後可以在 Google pay 設定的專用付款資料內看到剛剛結帳時新增的資料。

順帶一提因為 Google domains 提供自動續約，結帳時使用的信用卡也會新增至 Google pay（表示就是使用 Google pay 付款的？），而移除 Google pay 信用卡後須新增另一張信用卡，這邊若覺得留信用卡資訊在 Google 方不太安全者可能要多加注意。

最後點擊結帳就能順利買到想要的網域了。

## 額外

成功購買的網域可以在 Google domains 我的網域內看到，點擊管理後可以進行 DNS 設定等等，這邊有時間會說說如何設定 Github pages。
