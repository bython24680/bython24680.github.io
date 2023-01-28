---
title: 如何使用 Netlify+Hexo+Google domain 建立靜態網站
permalink: post/create-static-site-on-netlify/
date: 2020-08-26 01:14:09
tags:
- hexo
- netlify
---

## 開始之前

主因是想把另外寫的東西從 weebly 搬走，在找尋新家的過程中也看了很多所見及所得的網站，抑或是直接提供部落格服務的網站，看到最後還是覺得用 hexo + markdown 寫文章是最好的（還有一點是最近不太喜歡所見及所得，光頁面 render 就很惱人），所以改找有免費提供靜態網站 hosting 服務的站，最後找到了 [Netlify](https://www.netlify.com/)。

## 資訊

- [Netlify](https://www.netlify.com/)
- [Hexo](https://hexo.io/zh-tw/)
- [Github](https://github.com/)
- [Gitlab](https://about.gitlab.com/)
- [Bitbucket](https://bitbucket.org/product/)
- [Google domains](https://domains.google/)

### 前置需求

- [Git](https://git-scm.com/)
- [NodeJs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Netlify

首先先註冊一個帳號，因為網站的型態是靜態網站，所以直接使用免費方案即可。Netlify 總共提供四種方案（2020/08 當下），可以依照需求選擇其他方案。

註冊並登入後在後台選單 `Sites` 內選擇 `New site from Git`。

{% asset_img netlify-menu-sites.jpg Netlify後台 %}

這邊跟 Github page 最大的不同就是 Netlify 是連結其他的 Git repository，再將那個 repo 的內容 build 後進行 deploy，Netlify 目前支援三個 Git repository 來源，分別是 [Github](https://github.com/)、[Gitlab](https://about.gitlab.com/) 和 [Bitbucket](https://bitbucket.org/product/)。

{% asset_img netlify-create-a-new-site.jpg 建立一個新網站 %}
<div style="text-align:center">[圖一] 建立一個新網站</div>

因個人習慣所以選擇 Github，點擊 Github 後會進行 Github 帳號驗證與確認要使用的 repository 存取權限，這邊最大的好處就是該 repository 可以是 private repository！（Github page 在免費方案下只支援 public repository）

選擇要使用的 repository 後，若該 repository 已經是個靜態網站的專案了，那麼 netlify 就可以直接進行 deploy 的動作，若還不是，請參考 [如何使用 Hexo 和 Github Page 建立部落格](https://zoneless.dev/post/create-hexo-blog-on-github-page) 使用 Hexo 建立一個靜態網站部落格。

因為網站是使用 Hexo 建立，下一步便會出現 deploy 的設定，可以看到 Netlify 有判斷到 Hexo，並且自動設定好 generate 指令。

{% asset_img netlify-build-site.jpg 產生網站 %}
<div style="text-align:center">[圖二] 設定與 Deploy 圖片</div>

確認無誤後便可進行 deploy。

### 一般 deploy

在產生網站的設定內可以設定要 deploy 的 branch，預設為 master（見[圖二] 設定與 Deploy 圖片）。這邊只要 Github 端有任何 push 到 master 的動作，Netlify 就會自動 build 並 deploy 該站。

測試後蠻即時的，頁面上顯示的資料也是。

## Custom domain

### Google domains

Netlify 自行提供的 domain 並不像 Github page 那樣是使用 repository name 加上一個 suffix，那是什麼規則我沒研究，但能確定的是不好記，所以建議會是使用自己的 domain。

Netlify 本身就有提供網域購買，在 deploy 完網站後可以直接進第二步驟購買網域，但這邊我選擇使用 [Google domains](https://domains.google/) 購買網域，個人原因是好管理（這個站也是在 google domains 購買的，可以統一管理）。

如何在 Google domains 上購買網域請參考這一篇：[如何在台灣購買 Google domains 網域](https://zoneless.dev/post/buy-a-domain-from-google-in-taiwan/)，買好後回到 Netlify 進行網域設定。

### Netlify domain management

{% asset_img netlify-site-overview.jpg 網站管理後台 %}
<div style="text-align:center">[圖三] 網站管理後台</div>

回到剛剛建立的網站管理後台，選擇選單的 Setting，或者是找 Domain settings 進入 domain 管理。選擇增加 Custom domain。照著步驟往下並完成後，在 自訂 domain 後方會出現警告 `Check DNS configuration`，選擇最後方的 `Options` 按鈕選擇 `Set Up Nelify DNS` 好進行 DNS 設定。

順帶一提這時因為 DNS 沒設定好，所以同一頁面最下方的 HTTPS 也會處於無法使用的狀態。

選擇 `Set Up Netlify DNS` 並照著步驟往下，最後會出現四個 Netlify 提供的 DNS，頁面先別關，這邊要到 Google domains 進行設定。

### Google domains DNS setting

選擇自訂的網域，側邊欄選擇 DNS，在第一個區塊 `名稱伺服器(Nameservers)` 選擇自訂名稱伺服器，將剛剛在 Netlify 得到的四個 DNS 都貼上並儲存。

{% asset_img google-domains-dns.jpg Google domains DNS 設定 %}
<div style="text-align:center">[圖四] Google domains DNS 設定</div>

增加後就像圖四這樣。

完畢後回到 Netlify 等 DNS 生效後網站就能使用，HTTPS 憑證理應會一併設定好。
