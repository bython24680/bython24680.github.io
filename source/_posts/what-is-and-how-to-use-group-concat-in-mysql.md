---
title: 什麼是 MySQL GROUP_CONCAT function 及如何使用
permalink: post/what-is-and-how-to-use-group-concat-in-mysql/
date: 2023-12-09 16:02:42
tags:
- MySQL
---

## 開始之前

雖然知道 MySQL 有 `CONCAT()` 這個 function，但怎麼想都達不到需要的目的，一查之下發現居然還有這個 function，又學到了一個。

## 這是什麼

`GROUP_CONCAT()` 是 MySQL 8.0 以上提供的 function，需搭配 `GROUP BY` 一起使用，會連接 group 後的資料。預設使用半形的 `,` 連接，可設定其他的連接字。

## 怎麼使用

完整的使用語法如下：

```mysql=
SELECT col1, GROUP_CONCAT(col2 [ORDER BY clause] [SEPARATOR string])
FROM table_name
GROUP BY col1
```

* ORDER BY clause：選填，會先對 col2 進行排序，再將 col2 的資料進行連接
* SEPARATOR string：連接 col2 資料的連接符。除了符號外，文字也行。使用一組單括號括起

## 使用範例

以下範例會使用三張 table `Book`、`Author` 與 `Author_Book` 舉例，table schema 如下：

|Table name|Column name|Type|Description|
|:---:|:---:|:---:|:---|
|`Book`|`book_id`|integer|Primary key|
||`book_name`|varchar(100)|Not null|
|`Author`|`author_id`|integer|Primary key|
||`author_name`|varchar(100)|Not null|
|`Author_Book`|`author_id`|integer|not null|
||`book_id`|integer|not null|

並新增資料至對應 table，新增後的 table 內容會是：

* `Book`

|`book_id`|`book_name`|
|:---:|:---|
|1|MySQL 語法大全|
|2|MySQL 先刪庫後跑路|
|3|SQLite 新手入門|

* `Author`

|`author_id`|`author_name`|
|:---:|:---|
|1|作者 A|
|2|作者 B|
|3|作者 C|

* `Author_Book`

|`author_id`|`book_id`|
|:---:|:---:|
|1|1|
|1|2|
|2|1|
|3|3|

以上資料為有三本資料庫相關的書，其中作者 A 寫了兩本書，作者 B 與作者 A 共同寫了一本書，作者 B 自己也另外寫了一本，作者 C 則是自己獨自寫了一本。

### 範例一：取得作者與他們寫的書籍 id

目的是在一個 row 內取得作者 id 與他們寫的書籍 id，總共兩個 col，不限書籍 id 的連接方式。

```mysql=
SELECT author_id, GROUP_CONCAT(book_id)
FROM Author_Book
GROUP BY author_id;
```

結果：

```
author_id   GROUP_CONCAT(book_id)
1   1,2
2   1
3   3
```

可以看到預設的連接符為半形的逗號，這邊也可以替 `GROUP_CONCAT(book_id)` 加上 `AS` 給一個新的 column name。

### 範例二：取得作者名稱與他們寫的書籍名稱們

目的是在一個 row 內取得作者名稱以及他們寫的書的書籍名稱，進行排序，並用中文的全形逗號「、」進行書籍名稱的連接。以下為了方便所以會使用 `AS` 簡稱各張 table，實際使用請斟酌，避免簡略太多反而不知道是對應哪一張 table。

```mysql=
SELECT a.author_name AS author,
    GROUP_CONCAT(b.book_name ORDER BY b.book_name ASC SEPARATOR '、') AS book
FROM Author_Book AS ab
LEFT JOIN Book AS b ON ab.book_id = b.book_id
LEFT JOIN Author AS a ON ab.author_id = a.author_id
GROUP BY ab.author_id;
```

結果：

```
author  books
作者 A  MySQL 先刪庫後跑路、MySQL 語法大全
作者 B  MySQL 語法大全
作者 C  SQLite 新手入門
```

### 範例三：取得所有書籍 id 並連接成一個字串

目的是取得所有書籍 id ，並將他們連接成一組字串。

```mysql=
SELECT GROUP_CONCAT(book_id)
FROM Book
GROUP BY NULL;
```

結果：

```
GROUP_CONCAT(book_id)
1,2,3
```

這邊比較特殊的是，因為 `GROUP_CONCAT` 需搭配 `GROUP BY` 使用，而這邊並沒有要 group 的對象，所以直接使用 NULL 進行 group。

## 參考資料

- [MySQL :: MySQL 8.0 Reference Manual :: 12.19.1 Aggregate Function Descriptions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_group-concat)
