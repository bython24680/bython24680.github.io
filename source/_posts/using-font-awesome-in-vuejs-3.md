---
title: VueJs3 使用 FontAwesome
permalink: post/using-font-awesome-in-vuejs-3/
date: 2022-03-06 01:44:21
tags:
- VueJs3
- FontAwesome
---

## 開始之前

使用的會是 VueJs 3 + FontAwesome 5 與 6，方式為 svg + js method，而非 web font。兩種方式的 FontAwesome 差別在安裝的 icon package 不同，詳細差別請見官方文件：[Web Fonts vs SVG | FontAwesome Docs](https://fontawesome.com/docs/web/dig-deeper/webfont-vs-svg)，建議使用 svg + js method 的方式。而版本 5 與 6 差別只在安裝的 icon package 版本不同，可以視 icon 樣式（相同的 icon 在兩個版本可能長得不太一樣）需求安裝對應的版本。

故整個設置起來會需要的是：

1. VueJs 3
1. FontAwesome svg core package
1. FontAwesome icon packages
1. FontAwesome vue component package

截至 2022.03 為止 vue component package 在 vue 2 與 vue 3 使用的版本還是不同，這邊要注意。

## 資訊

- [Font Awesome](https://fontawesome.com)
- [Set Up with Vue.js | Font Awesome Docs](https://fontawesome.com/docs/web/use-with/vue/)：最新版的 fontawesome 的文件
- [Vue.js | Font Awesome Docs](https://fontawesome.com/v5/docs/web/use-with/vuejs)：為 fontawesome 5 的文件
- [Github - FontAwesome/vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome)
- [Web Fonts vs SVG | Font Awesome Docs](https://fontawesome.com/v6/docs/web/dig-deeper/webfont-vs-svg)

### package.json

因個人專案需求使用的是 VueJs 3 + fontawesome 5，故此檔案這部分會是長這樣：

```json=
{
    //...前略
    "dependencies": {
        "@fortawesome/fontawesome-svg-core": "^1.3.0",    // svg core
        "@fortawesome/free-regular-svg-icons": "^5.15.4", // 免費版 regular icon
        "@fortawesome/free-solid-svg-icons": "^5.15.4",   // 免費版 solid icon
        "@fortawesome/free-brands-svg-icons": "^5.15.4",  // 免費版 brand icon
        "@fortawesome/vue-fontawesome": "^3.0.0-5",       // vue component
        "vue": "^3.0.0"
    },
    //...後略
}
```

這邊不知道那五個 fontawesome 是什麼沒啥問題，後面會介紹。

## 設置開始

### 1. 安裝 svg core

```shell=
# npm
$ npm i --save @fortawesome/fontawesome-svg-core

# yarn
$ yarn add @fortawesome/fontawesome-svg-core
```

SVG Core 的介紹可以看這邊 [SVG Core | Font Awesome Docs](https://fontawesome.com/docs/web/dig-deeper/svg-core)，他可以減少專案最後打包的版本，因為只打包了專案有使用的 icon，而非像 web font 那樣打包了所有的 icon（但其實使用到的很少）。

### 2. 安裝 icon packages

Font Awesome icon package 有分免費版跟付費版，icon 數量上一定有差別，一樣依需求選擇即可，以目前個人專案使用來說免費版就蠻夠用了。

Plan 與價格可以看這邊：[Plans & Pricing | Font Awesome](https://fontawesome.com/plans)

免費版跟付費版 icon 目前看來差別在付費版有 Light 與 Thin 版本，而一個 icon solid 與 regular 版本可能分別在免費版與付費版裡。

#### 免費版 icon

```shell=
# npm
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/free-regular-svg-icons
$ npm i --save @fortawesome/free-brands-svg-icons

# yarn
$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add @fortawesome/free-regular-svg-icons
$ yarn add @fortawesome/free-brands-svg-icons
```

不指定版本的話會是 fontawesome 6（就是最新版），如要使用 5 的話需指定版本，例如 npm 的話：

```shell=
$ npm i --save @fortawesome/free-solid-svg-icons^5.15.4
```

#### 付費版 icon

這邊是參考官方的寫法

```shell=
# npm
$ npm i --save @fortawesome/pro-solid-svg-icons
$ npm i --save @fortawesome/pro-regular-svg-icons
$ npm i --save @fortawesome/pro-light-svg-icons
$ npm i --save @fortawesome/pro-thin-svg-icons
$ npm i --save @fortawesome/pro-duotone-svg-icons

# yarn
$ yarn add @fortawesome/pro-solid-svg-icons
$ yarn add @fortawesome/pro-regular-svg-icons
$ yarn add @fortawesome/pro-light-svg-icons
$ yarn add @fortawesome/pro-thin-svg-icons
$ yarn add @fortawesome/pro-duotone-svg-icons
```

### 3. 安裝 vue component

這邊在 Vue 2 與 Vue 3 有差別，官方寫法是 Vue 2 的版本，Vue 3 需到 component github 才有說明

```shell=
# npm
$ npm i --save @fortawesome/vue-fontawesome@latest     # vue 2
$ npm i --save @fortawesome/vue-fontawesome@prerelease # vue 3

# yarn
$ yarn add @fortawesome/vue-fontawesome@latest      # vue2
$ yarn add @fortawesome/vue-fontawesome@prerelease  # vue3
```

## 使用

### 1. 全域設定 fontawesome vue component

首先需要在 `main.js` 全域設定這個 component，才能直接在其他的 component 內直接使用。

```javascript=
// main.js

import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; 
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(fas);
library.add(far);
library.add(fab);

createApp(App).use(store)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app');
```

`.component('FontAwesomeIcon', FontAwesomeIcon)` 也可以寫成 `.component('font-awesome-icon', FontAwesomeIcon)`，兩者在 component 內使用的方式都是 `<font-awesome-icon></font-awesome-icon>`。

### 2. 尋找需要的 icon 並使用

接著就到官網 [Icons | FontAwesome](https://fontawesome.com/search) 找需要的 icon。搜尋框可以切換使用的 fontawesome 版本，要注意的是 5 與 6 相同的 icon 名稱可能不同（例如單字內容相同但順序不同：5 版叫 `plus-square`，6 版叫 `square-plus`）。

以 5 版 solid 的 `plus-square` 為例：

```javascript=
<font-awesome-icon :icon="['fas', 'plus-square']"></font-awesome-icon>
```

## 最後der碎碎念

嘗試使用另外一個方式使用 fontawesome 沒想到就撞在 Vue 3 + latest component 無法使用的狀況，爬了文才發現 Vue 3 得使用 prerelease 版。接著又撞到 5 與 6 版 icon 名稱不同的問題，所以我說為啥換版本名稱要顛倒啊 fontawesome，名字相同不好嗎？
