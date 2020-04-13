---
title: 如何使用 Hexo 和 Github Page 建立部落格
permalink: post/create-hexo-blog-on-github-page
date: 2020-04-13 22:34:18
tags:
- hexo
- github page
---

## 開始之前

可以搭配 Github Page 使用的除了 [Hexo](https://hexo.io/) 外，還有像是 [Jekyll](https://jekyllrb.com/)，它也是 Github 官方建議使用的建立工具。
順帶一提我會選 Hexo 是因為樣板比較多。

## 資訊

- [Github](https://github.com/)
- [Github Page](https://pages.github.com/)
- [Hexo](https://hexo.io/zh-tw/)

### 前置需求

- [Git](https://git-scm.com/)
- [NodeJs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)


## Github

第一步先申請 Github 帳號，申請完後建立一個新的 repository，名稱為 `username.github.io`。
例如使用者名稱為 `githubuser`，那 repository 名稱就會是 `githubuser.github.io`。

{% asset_img create-github-repository.jpg 建立新的 repository %}

Q. repository 名稱一定要用使用者帳號開頭嗎？
A. 其實不一定。這邊要求使用帳號當開頭，是因為預設這個網站是作為使用者個人網站，而當不購買自定義網域時，這個網站的網址就會是 `username.github.io`，故建議使用使用者帳號。若該網站用於工作室之類的，也可以改使用工作室名稱。

Q. repository 可以選擇 Private 嗎？
A. 免費使用者要建立 Github page 的話只能選 Public，想要 Private 請課金

建立完畢後會看到這個 repository 的 git url，頁面先別關，接著到本機端建立 hexo 專案

## Hexo

開始前請先安裝 Hexo，照著官方的裝法安裝就好

```
npm install hexo-cli -g
```

若尚未安裝 npm 請先安裝，這邊就不介紹怎麼安裝了。

安裝完畢後可以用 `hexo -v` 看看版本。
{% asset_img hexo-v.jpg hexo-v %}

安裝完畢後，建立新的 hexo 網站。以範例來說，建立的資料夾可以叫做 `githubuser.github.io`。建議資料夾名稱跟 repository 名稱相同，管理比較方便。
```
hexo init githubuser.github.io
```

接著產生靜態檔案並在 localhost 開啟網站。
```
cd githubuser.github.io
hexo generate
hexo server
```

預設的網址為 `http://localhost:4000`，可以加上 `-p` 自定義 port，詳細請見官方文件：[Hexo#server](https://hexo.io/docs/commands#server)

開啟頁面會看到預設的網站內容，hexo 預設的主題為 [landscape](https://github.com/hexojs/hexo-theme-landscape)，可以依照個人喜好替換，後續會說明。

確認 localhost 運作正常可以先用 ctrl+c 關掉 hexo server。

## 連接 hexo blog 與 github

接著要連接本機端的部落格資料夾與 Github repository，複製 repositroy git url 後到剛剛建立的資料夾內。

```
git init
# 初始化 git

git remote add (這邊貼上複製的路徑)
# 設定 remote，可以用 git remote -v 查看
```

git 指令不多介紹，詳細請至 [Git](https://git-scm.com/) 官網查看文件。

因為 Github page 在個人部落格內是使用 master 當顯示用的 branch，我的作法是分兩個 branch：master 與 dev，master 不做任何 commit 動作，僅作為 deploy 部落格靜態檔至 github 使用，所有的原始檔都在 branch dev 上。就算要開支線也是從 dev 開出去。

{% asset_img github-page-source-description.jpg Github page source 說明 %}

```
git checkout -b dev
# 等同於以下兩個指令：
# git branch dev
# git checkout dev
# 但空的 git 執行 git branch dev 會噴錯，因為新建立的 git 沒有任何支線可以做為產生新支線的依據，必須要先建立一次 commit 才行

git add .
# 將資料夾內所有東西記錄進 git

git commit -m 'feat: Init hexo blog'
# 建立一個 commit

git push -u origin dev
# 將 branch dev 推至 remote，並設定 tracking 此 branch 
```

到這邊處理原始檔的 branch 建置完畢，接著處理 deploy。

## 設定 hexo-deployer-git 並 deploy

根據[官方說明](https://hexo.io/docs/one-command-deployment.html)，可以使用 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git) 一鍵 deploy hexo blog，因為 hexo 可以設定多個 deploy 的目的地，使用上真的很方便，推薦安裝。

```
npm install hexo-deployer-git --save
```

接著開啟根目錄下的 `_config.yml` 設定 deploy 相關設定，找到 deploy 區塊進行修改。
```
deploy:
    type: git
    repo: <repository git url>
    branch: master
```

官方說明可以設定第四個參數 `message`，預設的 message 格式為 `Site updated: YYYY-MM-DD HH:ii:ss`，當進行 deploy 後，至 Github 切換至 branch master 就可以看到訊息。

這邊我有嘗試修改 message，失敗，有空再試試怎麼改。

設定完畢後可以進行 deploy。
```
hexo deploy
```

這時候可以先至 Github repository 的 setting 內查看 Github Pages 區塊有沒有出現 `Your site is published at (這邊是網址)`，有的話，恭喜，github 吃到 master 上的靜態檔案了。

這時開啟網址，頁面有機會還是 404，等個幾分鐘再開就行。

## 設定其他 theme

Hexo 的 theme 可以到這邊挑選：[Hexo themes](https://hexo.io/themes/)

選好喜歡的主題後，需要將主題的資料夾放置部落格資料夾 `(資料夾名稱)/themes/` 底下，接著修改 `_config.yml` 的 `theme: (這邊改成主題的名字)`，重新建立靜態檔案後完成。

這邊將主題資料夾加進 themes 底下有幾種方式：
- 在部落格資料夾根目錄下 `git clone (主題的 git url) themes/(主題名稱)`
- 找個另外的資料夾 git clone，然後把整個資料夾複製到 themes 內
- 在主題的 github 下載 zip 檔案，解壓縮後放進 themes 內
- 使用 git submodule

我是使用 git submodule 管理主題，在後續資料夾搬遷比較方便。

各個主題都有不同需要設定的項目，通常主題的 Github 會有說明，照著設定即可。
有空再來說說目前使用的主題 [cactus](https://github.com/probberechts/hexo-theme-cactus) 的 設定。