---
title: 如何在不同 git host 或者同樣的 host 使用不同帳號的 ssh key
permalink: post/how-to-use-different-ssh-key-for-multiple-hosts-or-same-host/
date: 2024-04-14 13:37:41
tags:
- Git
- SSH key
---

## 開始之前

因為需要在同一台電腦使用多個 GitHub 帳號（不要問我為啥會有複數個 GitHub 帳號，不好說不好說），同時帳號們也都需要使用 Git clone 等等的指令，導致發生了一個問題：我現在用的是哪一組 ssh key？！

好這個真的是個好問題，所以能不能設定多組 ssh key 並且不同 repository（不同 Host 甚至是同一個 Host）使用不同 ssh key 進行 clone、push 等等的動作呢？嗯，可以！

## 設定 Host 與詳細內容

雖然上面有提到同一個 Host，但實際使用還是要區分哪個 Host 使用哪一組 Key，只是 Host 不是預設的網站網址，而是使用自定義的名稱。這類的設定會儲存在 `~/.ssh/config` 檔案內，沒有此檔案的話就手動新增。

### 什麼是 Host？

Host 就是 repository 存在的站，預設為該網站的網址，以 NVM 的 `git@github.com:nvm-sh/nvm.git` 來說，`github.com` 就是 Host，既有專案可使用 `git remote -v` 查看。

### ~/.ssh/config 檔案

新增完畢後開啟此檔案，這邊以最常見的 GitHub 使用兩組帳號（各自有自己的 ssh key）為例，設定後檔案內會是像這樣：

```!
Host github-own
    Hostname github.com
    PreferredAuthentications publicKey
    IdentifyFile ~/.ssh/id_key_own

Host github-work
    Hostname github.com
    PreferredAuthentications publicKey
    IdentifyFile ~/.ssh/id_key_work
```

如何新增 ssh key 這邊就不說明，可以到 GitHub 官方找。這邊使用了兩個 Host 並各自指定使用的 ssh key，接著只要在 Clone 時設定對應的 Host 就行了。

## 調整使用的 Repository URL

再以 NVM 為例，假設要使用 `github-own` 作為 Clone 的帳號，只要將 `git@github.com:nvm-sh/nvm.git` 改成 `git@github-own:nvm-sh/nvm.git` 就好。如果要修改既有專案的 URL，以預設的 remote `origin` 為例，使用 `git remote set-url origin git@github-own:nvm-sh/nvm.git` 修改即可。

## 最後

以 GitHub 來說，除了可用 ssh key 外，也有提供 HTTP 的方式，但習慣使用 ssh key 又有複數個帳號的話，這是個不錯的設定方式，就是 Clone 專案時要注意更改 Host。
