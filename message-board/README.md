
## Simple Message Board

這是一個用 React 實作的前端留言板專案。留言資料會暫存在瀏覽器的 localStorage 中，主要練習 React Hook、Router、Local Storage，並搭配 Tailwind CSS 做基本樣式設計。

## [查看網站](https://message-board-tau.vercel.app/)

---

### 使用工具

* React (Vite)
* HTML / Tailwind CSS
* LocalStorage（儲存留言資料與登入狀態）
* React Hook：`useState`, `useEffect`, `useContext`
* React Router：`Routes`, `Navigate`, `useNavigate`

---

### 功能介紹

* 首頁顯示留言列表
* 新增留言（登入 user 後）
* 刪除留言（進入 admin 並輸入留言 id）
* 首次載入從 fake API 取得預設留言
* 所有留言的新增與刪除都會同步更新至 localStorage
* 支援不同頁面間的資料同步與狀態維持
* 簡單錯誤處理（留言不可空白、id 不存在等）

---

### 可用 route 和權限

專案中共有 4 個可用 route：

#### `/` – 首頁

* 顯示留言列表。
* **首次載入**會從 fake API 模擬取得留言。
* **之後載入**會從 localStorage 讀取資料。
* 登入 user 後會顯示留言輸入框。

#### `/login` – 登入頁

* 提供兩組假帳密作登入驗證（不連接後端）：

  * **user**：帳號 `user`、密碼 `user123`
  * **admin**：帳號 `admin`、密碼 `admin123`
* 登入成功後，會在 localStorage 儲存對應 token。

#### `/user` – 使用者頁面

* 登入 user 後可進入，未登入會返回 `/login`。
* 顯示登入成功訊息。
* 提供「返回留言板」按鈕，並保留留言功能。

#### `/admin` – 管理員頁面

* 登入 admin 後可進入，未登入會返回 `/login`。
* 顯示所有留言資料。
* 可以輸入 id 刪除對應留言，刪除後資料會同步更新 localStorage。

#### `/?` - 404頁面
* 輸入其他未定義的的 route 會導向自定義的 NotFound 頁面，並提供按鈕返回首頁。

