

## Mini Shop

這是一個使用 React + TypeScript 使用 fakeStoreAPI 開發，沒有連接後端的小型購物網站練習。

[fakeStoreAPI](https://fakestoreapi.com/)

## [查看網站](https://mini-shop-snowy.vercel.app/)
---

### 使用工具

- React (Vite) + TypeScript
- React Router 、 Hook 、 DOM 、 Context
- Tailwind CSS
- LocalStorage (儲存登入狀態、購物車)

## 功能介紹

- 使用者登入、登出
- 商品列表頁面
- 單一商品詳細頁面
- 加入商品至購物車
- 編輯、刪除購物車內容
- 簡單結帳流程（不連後端）
- 基本表單驗證
- 登入與購物車狀態保護頁面


## 可用 route 與功能介紹

### `/` 首頁

### `/product` 商品頁
- 可以點選商品前往詳細頁面
- 右上角可以進行登入登出

### `/product/:id` 商品詳細頁
- 可查看商品詳細資訊
- 根據狀態顯示登入按鈕或加入購物車
- 透過按鈕增加或減少購買數量

### `/cart` 購物車
- 顯示購買的商品與數量、總價錢
- 透過按鈕增加或減少購買數量
- 當購物車內有商品時可前往`/checkout`結帳

### `/checkout` 結帳
- 檢查帳單資訊 (簡單的表單格式驗證)
- 表單格式正確後可以確認付款

### `/login` 登入頁
- 可以透過預設的帳密進行登入




## 測試帳密

因為沒有串後端所以請使用下面的帳號密碼做登入

帳號: `user`

密碼: `user123`

---