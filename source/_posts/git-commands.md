---
title: Git commands 集合處(2024/04/21 更新)
permalink: post/git-commands/
date: 2024-04-21 22:38:13
tags:
- Git
---

## 開始之前

因為主要是使用 Git command 而非 UI，除了常用的 `add` 這類，有些久沒用就會忘記，然後還要 google 老半天，想想不如自己寫一篇，對，就是這篇。因為這樣，這篇不會是完整的 Git commands，會是我常用或會遇到但會忘記的指令，分類也是照我自己使用習慣來分類。

這篇會慢慢更新，想到就更新，更新時間會加到標題上。

## Commands

### Repository 基本

```bash
# 顯示設定的 remote 與 URL：git remote -v
# origin 是預設的 remote name
$ git remote -v
origin <REMOTE_URL> (fetch)
origin <REMOTE_URL> (push)

# 設定 remote 的 URL：git remote set-url <REMOTE_NAME> <REMOTE_URL>
# 如果 remote name 設定既有的 remote，例如 origin，那就是更新 origin 的 remote url
$ git remote set-url origin <REMOTE_URL>

# 增加新的 remote：git remote add <REMOTE_NAME> <REMOTE_URL>
# remote name 不可與既有的重複。增加後使用 git remote -v 就會看到多了新的兩個 remote（fetch 跟 push）
$ git remote add devorigin <REMOTE_URL>
```

### 開發進度相關

```bash
# 跳到某一條線上：git checkout <BRANCH_NAME>
# 當前進度未 commit 或者有衝突時會跳不過去
$ git checkout develop

# 將進度推到遠端：git push <REMOTE_NAME>
# remote name 預設為 origin，故可以省略。若要推到不同的 remote 就要加上名稱
# 加上 -f 表示強制推扣，會用本地端的進度蓋掉遠端進度，這個非常危險
$ git push
$ git push devorigin
$ git push origin -f

# 將遠端進度拉到本地端：git pull <OPTIONAL_COMMAND>
# 個人習慣使用 --rebase 讓線比較沒那麼複雜
$ git pull
$ git pull --rebase

# Commit 當前進度：git commit -m <MESSAGE>
# 如果要調整 commit body 的話，就不需要後面的 -m <MESSAGE>
$ git commit
$ git commit -m 'feat: Update README.md'

# Merge 另外一條 branch：git merge <BRANCH_NAME>
# 個人習慣加上 --no-ff 保留 merge 的小耳朵
$ git merge develop --no-ff
```

### Commit 相關

```bash
# 從別的 branch 撿 commit 過來用：git cherry-pick <COMMIT_SHA>
# commit SHA 可以一次撿多個過來，各自中間用空格隔開就好。以下的 SHA 是亂打的
# 加到當前 branch 的順序，舊到新為設定 SHA 的左到右
$ git cherry-pick 5262773e d378c4e3
```

### Branch 相關

```bash
# 從既有的 branch 新增新的 branch 並直接推到遠端：git push <REMOTE_NAME> <BRANCH_NAME>:<NEW_BRANCH_NAME>
$ git push origin develop:feature/create-login-form

# 刪除遠端 Branch：git push <REMOTE_NAME> :<BRANCH_NAME>
$ git push origin :feature/create-login-form

# 刪除本地端 Branch：git branch -D <BRANCH_NAME>
$ git branch -D feature/create-ligin-form

# 查看本地端 Branch
$ git branch
```
