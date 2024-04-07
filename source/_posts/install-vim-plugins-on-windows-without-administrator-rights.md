---
title: 如何在沒有 Admin 權限的 Windows 上安裝 Vim Plugins
permalink: post/install-vim-plugins-on-windows-without-administrator-rights/
date: 2024-04-07 18:46:24
tags:
- Windows
- Vim
- Vim Plugins
---

## 開始之前

因為一些原因，作為白天開發機的電腦是被鎖權限的 Windows 10，導致 Windows 版本的 Vim 雖然可以用，Vundle 也能裝，但使用 Vundle 安裝 Plugins 時都失敗，對，`:PluginInstall` 都失敗。原本是使用 Virtual Machine 起一台 Ubuntu 作為開發環境，神奇的是裡面的 Vim 就能裝 Plugins，不好的是已經很稀少的記憶體直接被 vm 吃掉一大坨，Vim 的編輯是目前為止遇過最卡的，很痛苦，非常痛苦。

中間決定嘗試不要開 vm，改用 VScode 裝 Vim plugin 以及其他需要的 plugin，看起來記憶體總消耗量比開 vim 起 Ubuntu 還要少，VScode 用起來也算順，但是，對，萬事都有個但是，VScode 光啟動就要花好幾分鐘，甚至直接沒有反應（打不開）。

救命，這台電腦到底是發生什麼事。

最後我的歪腦筋（？）動到被我安裝在 Windows 本體上的 Vim 以及 Windows terminal，反正 plugin 內只要 NERDTree 跟 emmet 能用就好，那，應該，可能有機會？

## 前置作業

要使用此方法需要安裝 Vim 8 或以上的版本，因為需要使用 Vim 8 推出的新功能：package feature，可在啟動 vim 之後使用 `:h packages` 查看說明。要確認 Vim 版本可使用以下兩種方式：

1. 開啟 terminal，輸入 `vim` 後按下 Enter，版本號會寫在 terminal 正中央
1. 開啟 terminal，輸入 `vim --version` 後按下 Enter，會出現版本號以及其他資訊

## 安裝 Plugin

這邊使用 NERDTree 舉例，會使用 [preservim/nerdtree](https://github.com/preservim/nerdtree)。

### 第一步：新增 pack 資料夾

Windows 與 Ubuntu 或 Mac 不同，vim 的套件等等資料夾並不是在 `~/.vim/` 內，而是放在 `~/vimfiles/` 內。使用終端機或者其他方式進入此資料夾後，如果裡面沒有 `pack` 資料夾，就手動新增一個。這個資料夾就是用來放要安裝的 Plugin。

新增後進入 `pack/`，再新增一個資料夾，這一層資料夾的名稱隨意，可根據用途設定名稱，例如開發相關的用 `vendor`，自己寫的套件用 `self` 等等。假設這邊使用 `vendor` 作為資料夾名稱，這樣我們就有 `~/vimfiles/pack/vendor/` 資料夾。

接著第四層是關鍵，第四層資料夾的名稱與何時載入 Plugin 有關。這邊有兩個方式（名稱）提供選擇：

1. `start`：啟動 vim 時會自動載入的 Plugins
1. `opt`：選擇性使用的 Plugins，要透過 `packadd` 指令啟用。這邊有時間再介紹。

NERDTree 希望能自動載入，所以第四層資料夾的名稱就是 `start`。

好，到這邊我們有了這樣的資料夾：`~/vimfiles/pack/vendor/start/`。可以來安裝 NERDTree 了。

### 第二步：Clone Plugin

第二步就是將 Plugin clone 到上一步建立的資料夾內，名稱就跟 Plugin 原本的一樣就好，或者看官方有沒有相關的說明。以 NERDTree 來說，就是：

```bash
$ git clone https://github.com/preservim/nerdtree.git ~/vimfiles/pack/vendor/start/nerdtree
```

如果使用 https 遇到憑證問題，就登入 GitHub 並改成使用 ssh。上述範例內 Clone 的目的地路徑雖然是使用 `~` 開頭，目前 Windows 也都可使用這個作為使用者根目錄的代表，但實際 Clone 時建議使用資料夾的絕對路徑。

### 第三步：使用 Plugin

完成第二步後，關掉 terminal 重開，接著使用 `vim` 啟動 vim，以 NERDTree 為例，再使用 `:NERDTree` 並按下 Enter，就能看到側邊的檔案列表了，終於看到它們了，好感動。

其他 Plugin 可使用相同方式安裝，實測 [mattn/emmet-vim](https://github.com/mattn/emmet-vim) 也成功。

## 最後

假設 Vundle 這類的套件管理能用的話，還是會推薦使用，管理方便之外，也少了手動 Clone 的步驟。但如果遇到沒有安裝全線的話，這就是個不錯的選擇，提供參考，至少這個方法救了我的 vim。
