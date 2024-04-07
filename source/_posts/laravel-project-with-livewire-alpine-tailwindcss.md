---
title: Laravel 搭配 Laravel Livewire、Alpine.js 與 TailwindCSS
date: 2024-03-24 17:19:43
tags:
- Laravel
- Laravel Livewire
- Alpine.js
- TailwindCSS
- FontAwesome
---

## 開始之前

最近一個不算大的專案要使用 Laravel 開發，決定不使用前後端分離的架構後開始思考怎麼搭配，思路是這樣：

1. 需要 JavaScript 的效果但又不想寫太複雜的 JavaScript
1. 使用 Laravel blade 但又想要畫面能部分載入
1. 不想要包一大包無用的 CSS 與 JavaScript
1. 沒那麼多時間自己刻 CSS 效果

參考其他專案跟搜尋後決定使用這樣的搭配：

1. Laravel Livewire
1. Laravel Mix：主要用來 compile js 與 css，不使用既有 vite 的原因是時間因素（不熟悉）
1. Alpine.js
1. TailwindCSS：但是轉去使用 SASS，主因是時間因素（習慣寫 SCSS）
1. FontAwesome：icon 的部分，Free 版本提供的 icon 就非常多

## 開始建置

### 第一步：Laravel

首先要開一個 Laravel 專案，用 Laravel 11 為例。

```bash=
$ composer create-project laravel/laravel:^11.0 laravel-app
```

會在當前資料夾新增一個 `laravel-app` 的資料夾，可以使用 PHP built-in web server 啟動簡易的 server 查看這版本的初始頁面。

```bash
$ cd laravel-app/public
$ php -S localhost:8080
```

這樣就能在瀏覽器使用 `http://localhost:8080` 開啟 Laravel 預設首頁啦。

### 第二步：Laravel Livewire

使用以下指令安裝 Laravel livewire：

```bash
$ composer require livewire/livewire
```

// TODO: Alpine.js 的衝突

### 第三步：Laravel Mix

使用以下指令安裝 Laravel Mix，搭配的 node 版本是 `v20.11.1`：

```
$ npm install laravel-mix --save-dev
```

### 第四步：Alpine.js

### 第五步：TailwindCSS

### 第六步：FontAwesome

## 相關連結

- [Laravel](https://laravel.com)
- [Laravel Livewire](https://livewire.laravel.com)
- [Laravel Mix](https://laravel-mix.com)
- [Alpine.js](https://alpinejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [FontAwesome](https://fontawesome.com)
