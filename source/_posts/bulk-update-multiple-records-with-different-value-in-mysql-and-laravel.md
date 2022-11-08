---
title: MySQL 與 Laravel 使用不同值更新多筆資料同一欄位
permalink: post/bulk-update-multiple-records-with-different-value-in-mysql-and-laravel
date: 2022-11-08 22:18:22
tags:
- MySQL
- Laravel
---

## 開始之前

遇到需求是更新多筆資料同一個欄位，最直覺的做法就是拿出所有需要更新的資料後，for 迴圈一個一個 update，然後一個想覺得不對，這樣一個 update 就是一個 sql，以效能優化來說 sql 能少就少，所以，有沒有方法能一條 sql 結束呢？

有，可以用 case statement。

## Case statement

假設需求是更新多篇文章的所屬類別，需要更新的文章有三筆（實際上可能更多筆，這邊舉例就簡單一點）：

|文章 id|當前類別 id|新的類別 id|
|:---:|:---:|:---:|
|1|1|10|
|2|1|13|
|10|3|14|

那麼使用 Case statement 的 SQL 會是這樣：

```sql
UPDATE post SET category_id = (
    CASE ID
        WHEN 1 THEN 10
        WHEN 2 THEN 13
        WHEN 10 THEN 14
    END
) WHERE ID IN (1,2,10)
```

當使用 Laravel 時可以用 `DB` Facade 處理，分為有用 bind 或不使用 prepared mode 的方式：

```php
// 第一種使用 statement 加上 bind
DB::statement('UPDATE ? SET category_id = (
    CASE ID
        WHEN ? THEN ?
        WHEN ? THEN ?
        WHEN ? THEN ?
    END
) WHERE ID IN (?)', [
    'post',
    1,10,
    2,13,
    10,14,
    '1,2,10'
]);

// 第二種使用 unprepared
DB::unprepared('UPDATE post SET category_id = (
    CASE ID
        WHEN 1 THEN 10
        WHEN 2 THEN 13
        WHEN 10 THEN 14
    END
) WHERE ID IN (1,2,10)');
```

整條 SQL 之間的語法可改為使用空格分隔就好，這邊有好幾個換行只是為了比較好閱讀。壓成一條 SQL 後會是這樣：

```php
DB::unprepared('UPDATE post SET category_id = (CASE ID WHEN 1 THEN 10 WHEN 2 THEN 13 WHEN 10 THEN 14 END) WHERE ID IN (1,2,10)');
```

## 相關連結

- [SQL Case Expression - w3schools](https://www.w3schools.com/sql/sql_case.asp)
- [Running a general statement - Laravel 8](https://laravel.com/docs/8.x/database#running-a-general-statement)
