


# React Router

## 簡介

要了解 React Router 之前要先知道兩個東西：

1. Router  
2. SPA

---

### Router (路由器)

Router 會將網址（URL）對應到瀏覽器的畫面。  
在網站中，URL 用來表示目前在哪一頁。

**範例：**
- `/` 表示首頁  
- `/products/123` 代表產品 123 的頁面  

Router 就是一個把 URL 和畫面做對應的機制。

---

### SPA（Single Page Application）

SPA 表示整個網站只有一個 HTML 頁面，不會在點連結時重新下載整個新頁面， 而是透過 **動態載入 / 切換 component** 來改變畫面上的內容。  
React 就是屬於這種架構。

| 項目 | 多頁網站 | SPA |
|------|----------|-----|
| 結構 | 多個 HTML，每頁都是獨立的檔案 | 只有一個 HTML，內容由 JS 控制 |
| 導覽（點連結） | 網頁重新載入 | 網頁不用重新載入，由 JS 改畫面 |
| 資料取得 | 每次都要跟 server 要資料 | 可以用 AJAX / Fetch 取得部分資料 |
| router control | 後端控制（Flask, PHP） | 前端控制（React Router） |
| 使用者體驗 | 比較慢 | 更流暢 |

---

### React Router

React 的畫面切換平常是用 state 改變來觸發 re-render 更新 UI。  
如果想要根據「網址」來決定畫面內容，就會需要一個專門控制網址和畫面元件對應的工具，  
這就是 React Router 的功用。

React Router 可以做到：

1. 使用網址（如：`/about`）切換不同的 component  
2. 維持瀏覽器的歷史紀錄（可以按上一頁回去）  
3. 不會重新載入頁面（保有 SPA 的特性）

---

### 看一個例子

假設寫了一個網站有三個 component：

```jsx
function Home() {
  return <h1>首頁</h1>;
}

function About() {
  return <h1>關於我們</h1>;
}

function Contact() {
  return <h1>聯絡我們</h1>;
}
````

如果沒有用 React Router，依然可以用 state 搭配條件判斷去改變畫面：

```jsx
function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      <button onClick={() => setPage('home')}>Home</button>
      <button onClick={() => setPage('about')}>About</button>
      <button onClick={() => setPage('contact')}>Contact</button>

      {page === 'home' && <Home />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
    </>
  );
}
```

這邊透過 button 對應不同的 `setState`，由 state 決定要回傳哪個 component。
這樣就會因為 state 改變自動 re-render，呈現對應的頁面。

---

### 缺點

* 這樣做雖然畫面會改變，但網址不會變

* 不能複製網址給別人看到相同的頁面，別人只能從首頁開始操作

* 沒有瀏覽器的上一頁、書籤功能可以使用。

---

### 如果加上 React Router 會變這樣：

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

（語法會在後面講）

這樣就能做到：

* 網址變成 `/about` 就顯示 About 頁面
* 網址變成 `/contact` 就顯示 Contact 頁面
* 而實際上仍然是在同一個頁面中完成（不會 reload，保留 SPA 的優點）


---



## 安裝與設定

需要先安裝 React Router 套件：

```bash
npm install react-router-dom
```

這是專門給**瀏覽器**用的版本，如果是 React Native 的話要裝的是 `react-router-native`。

---

### 在專案中設定 `<BrowserRouter>`

在專案的入口檔案 `main.jsx` 或 `index.jsx` 加入 `<BrowserRouter>`。

以 Vite 為例，一般的 `main.jsx` 長這樣：

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

在一些教學中會看到把 `<BrowserRouter>` 放在 `App()` 裡面也可以，不過官方文件是推薦放在 `main.jsx`。

---

### 改成使用 `<BrowserRouter>`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

#### 關於 `<BrowserRouter>`：

* 他是整個 Router 功能的 **root（根）**
* 必須放在 App 最外層
* 會攔截瀏覽器網址的變化，讓 React Router 控制顯示的內容

---

### 建立頁面 Component

平常寫 component 都會放在 `src` 底下，可能另外開一個 `components` 資料夾。
而寫要用來當作「**頁面**」的 component，會習慣開一個 `pages` 資料夾來放。

### 範例

```jsx
// src/pages/Home.jsx
export default function Home() {
  return <h2>這是首頁</h2>
}

// src/pages/About.jsx
export default function About() {
  return <h2>這是關於我們頁面</h2>
}
```

---

### 在 `App.jsx` 設定 `<Routes>`

```jsx
import { Routes, Route } from 'react-router-dom' // 記得引入 Routes 和 Route
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <div>
      <h1>我的網站</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
```

---

### 加入 `<Link>` 做出導覽按鈕

```jsx
import { Link } from 'react-router-dom'

// 放在 App 的 return 裡面
<nav>
  <Link to="/">首頁</Link> | <Link to="/about">關於</Link>
</nav>
```

### `<Link>` 和 `<a>` 的差別：

* `<a href="...">` 會觸發頁面重新載入（整個重新載入）
* `<Link>` 是 React Router 提供的 component，**可以在不刷新頁面的情況下切換網址與畫面**


---


## `<Routes>` 和 `<Route>` 的用法

這兩個是 React Router 的核心：

* 用來指定哪一個 **URL 對應哪一個 Component**
* 控制當前畫面要 render 哪個元件

---

### 基本結構

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

* `<Routes>`：路由集合，包含所有定義的路由條件（有點像 `switch` 的概念）
* `<Route>`：每一筆路由規則，指定 `path` 對應哪個 component

---

### `<Route>` 的兩個主要屬性：

* `path`：網址路徑
* `element`：對應的 React component，**右邊要記得加 `{}`，因為是 JSX 表達式**

>  網址習慣上會用 **全小寫**，多個單字用 `-` 分隔，例如：`/user-profile`

---

### 範例：多加一條 `/contact` 路由

```jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div>
      <h1>我的網站</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}
```

---

### `path="*"`：萬用路由（404 Not Found 頁面）

這個用來處理使用者輸入錯誤網址的情況（常見 404）：

```jsx
<Route path="*" element={<h2>找不到這個頁面</h2>} />
```

只要使用者輸入的網址 **不符合任何定義好的 path**，就會顯示這個畫面。



---

## `<Link>` 與 `<NavLink>`

在 React Router 裡，用 `<Link>` 和 `<NavLink>` 來取代傳統的 `<a>`。



### 為什麼不用 `<a>`？

 在 React 的 SPA（Single Page Application）中 **不應該用 `<a>` 來切換畫面**。

* `<a>` 會造成整個頁面重新載入（包括 JS、CSS、state 等都會重置）
* 使用 `<Link>` 和 `<NavLink>` 可以**不刷新畫面**，只更新網址和元件 ➜ 保留 SPA 的效率與體驗

---

### `<Link>`

* 可以改變網址但**不刷新頁面**
* 根據網址顯示對應的 component 畫面

### 語法：

```jsx
import { Link } from 'react-router-dom'

<Link to="/path">內容</Link>
```

* `to` 屬性：對應到 `<Route path="..." />` 裡設定的 path
* 內容：畫面上要顯示的文字或元素

---

### `<NavLink>`：進階版的 `<Link>`

* 和 `<Link>` 一樣可以切換網址
* 額外支援 `isActive`，用來判斷目前是否是該路由
* 很適合用來做**導覽列高亮效果**

>  若不需要 `isActive`，用 `<Link>` 就好；需要判斷當前頁面時才用 `<NavLink>`

---

### 語法範例：

```jsx
import { NavLink } from 'react-router-dom'

<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? 'active' : '')}
>
  關於我們
</NavLink>
```

* `isActive` 是 boolean，表示這個路徑是否是目前頁面
* 根據 `isActive` 回傳的值，自動加上或移除 CSS class（例如：`active`）

---

### 補充：自己實作 `isActive` 效果（用 `<Link>` + `useLocation`）

如果想用 `<Link>` 自己做出和 `<NavLink>` 一樣的效果，可以這樣做：

```jsx
import { Link, useLocation } from 'react-router-dom'

function MyLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link to={to} className={isActive ? "active" : ""}>
      {children}
    </Link>
  )
}
```

* `useLocation()` 是 React Router 提供的 hook，可以取得目前的網址資訊
* 自己比對 `location.pathname === to`，來決定 class

> 這樣就比較麻煩，有這需求就直接用 `<NavLink>` 就好

---


## Nested Routes（巢狀路由）

在 React Router 中，可以建立巢狀路由來對應**更深層的網址**。

### 範例情境

假設有這些網址：

* `/about` ➜ 顯示關於頁面基本結構（標題、選單等）
* `/about/team` ➜ 顯示團隊介紹（但保留 `/about` 的外框）
* `/about/history` ➜ 顯示歷史介紹（同樣保留 `/about` 的外框）



### 為什麼用 Nested Routes？

讓 `/about` 畫面保留不變，只改變其中一部分內容
（就像 SPA 的元件局部切換 ➜ 不需重複載入整頁）

---

### `<Outlet />`

這邊會用到一個新的 Component ：**`<Outlet />`**

```jsx
import { Outlet } from "react-router-dom"

<Outlet />
```

* `<Outlet />` 是一個插槽（slot）
* React Router 會把對應的子元件自動插進去這個位置
* 很像 Vue 的 `<router-view />`

---

### 範例： `/about/team` & `/about/history`

```jsx
// pages/About.jsx
import { NavLink, Outlet } from "react-router-dom"

export function About() {
  return (
    <div>
      <h2>關於我們</h2>
      <nav>
        <NavLink to="team">團隊</NavLink> |{" "}
        <NavLink to="history">歷史</NavLink>
      </nav>
      <Outlet /> {/* 子頁面會插在這裡 */}
    </div>
  )
}

export function Team() {
  return <h3>這是我們的團隊</h3>
}

export function History() {
  return <h3>這是我們的歷史</h3>
}
```

---

### 巢狀 Route 設定：在 `<Routes>` 中的結構

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />}>
    <Route path="team" element={<Team />} />
    <Route path="history" element={<History />} />
  </Route>
  <Route path="/contact" element={<Contact />} />
</Routes>
```

* 子路由直接寫在 `/about` 的 `<Route>` 裡面
* `path="team"` ➜ 會變成 `/about/team`
* React Router 會自動把 `<Team />` 或 `<History />` 插進 `<Outlet />` 的位置

---

### 補充：`export` vs `export default`

| 區別               | 說明                                |
| ---------------- | --------------------------------- |
| `export default` | 一個檔案只能有一個。import 時可以自己取名。         |
| `export`         | 可以有多個。import 時\*\*必須用 `{}` 指定要什麼。 |

### 範例：

```jsx
// 檔案裡：
export function About() {}
export function Team() {}
export function History() {}

// 引入：
import { About, Team, History } from './pages/About'
```

> react 本身就是用 `export`，所以才會看到 `import { useState, useEffect } from 'react'`

---


## 巢狀路由的進階應用（index route、navigate、fallback）


### index route（預設子路由）

當訪問 `/about` 而不是 `/about/team` 或 `/about/history`，
可能會想在 `Outlet` 顯示一段預設內容。

這個時候可以使用 route 的 `index` 屬性來做到。
`index` 代表這個巢狀路由的預設頁。

語法其實就是將原本的 `path=""` 取代為 `index`

**ex:**

```jsx
<Route path="/about" element={<About />}>
  <Route index element={<p>請選擇一個子頁面</p>} />
  <Route path="team" element={<Team />} />
  <Route path="history" element={<History />} />
</Route>
```

當網址為 `/about`，沒有指定子頁面時就會顯示 `index` 對應到的 element。

---

### Navigate（程式化導向／重導）

用來讓使用者觸發某個事件以後自動導頁（ex: 表單送出／登入成功後導回首頁等）

`<Navigate />` 是 React Router 提供的導頁用 component。

**ex:**

```jsx
import { Navigate } from "react-router-dom";

function Login({ isLoggedIn }) {
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <h1>請登入</h1>;
}
```

* `to` 一樣是目標路徑。這個例子中會導頁到 `/` 首頁。

* 網址會改變，頁面會根據 route re-render。

* 導頁會被加入 history stack（歷史紀錄），可以按上一頁回來。

### replace

可以加 `replace` 屬性表示取代掉當前的頁面，
原本的頁面就不會被加進 history stack 中。

* 記錄不是整個被刪掉，只會在 history stack 中把原本的頁面取代為這一頁，前幾次的記錄不會被動到
* 按上一頁回不到這個被取代掉的頁面

```jsx
<Navigate to="/login" replace />
```

這樣就可以讓使用者在登入以後，按上一頁也不會再返回登入頁。

上面的例子是寫在 function component 的 return 中。
如果要寫在 event 或邏輯裡面，可以使用 React Router 提供的 hook：
### useNavigate()
`useNavigate()` 是一個 hook，會給一個 `navigate()` 函式。
`navigate("路徑")` 可以用 `{ replace: true }` 切換 replace 模式。

**ex:**

```jsx
import { useNavigate } from "react-router-dom";

function SomeComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about");         // 導頁（push 到 history）
    // navigate("/about", { replace: true }); 這樣才會變成 replace 模式
  };

  return <button onClick={handleClick}>前往 About</button>;
}
```

---

### 萬用 route（404 fallback）



`path="*"` 是萬用符號，表示所有沒被其他 route 匹配到的情況，通常會用來做 404。 

**ex:**

```jsx
<Route path="*" element={<h1>404 找不到頁面</h1>} />
```

使用者輸入未定義的路徑都會跑來這邊。


---



## 動態 Route / URL Params



假設要做一個文章的頁面，`/article` 後面子頁面用 id 當作編號，
不太可能對每篇文章都去寫一個 `<Route path="/article/1" />`。
這時候就可以用 **dynamic route params（動態路由參數）**。

### Dynamic route params（動態路由參數)

用法是 `/:id`。

**ex:**

```jsx
<Route path="/article/:id" element={<Article />} />
```

* `:id` 是一個參數，`id` 可以換成任何字串

* 實際網址的 `/article/123` 就會被解析成 `/article` 和 `id="123"`

* `/article` 首頁和 `article/:id` 並沒有巢狀關係
，兩個要分開為不同的 page 寫



---

### 在 component 中用 `useParams()` 拿到參數

**ex:**

```jsx
import { useParams } from "react-router-dom";

function Article() {
  const { id } = useParams();

  return <h1>這是第 {id} 篇文章</h1>;
}
```

`useParams()` 會回傳一個物件，裡面包含網址上的所有 `:參數名`，
用來取出參數 (ex: id)

---

### 可以有多個參數

可以這樣設計 route：

```jsx
<Route path="/user/:userId/post/:postId" element={<Post />} />
```

直接在 component 中使用 hook：

```jsx
const { userId, postId } = useParams();
```
這樣就能得到 userId, postId 兩個參數

---

### 注意事項

這些 `:id` 只是網址中的變數而已，並不是一個 component，
它們也沒有父子關係。

用途只是提供頁面資料的依據，幫 component 判斷要顯示哪一筆內容而已。

像是這個 `/user/:userId/post/:postId`，這裡面是沒有巢狀關係的：

* `/user/:userId` 和 `/user/:userId/post/:postId` 是兩個獨立存在的 route
* 對 `/user/:userId` 來說，就是一條會用到 `userId` 的 route
* 對 `/user/:userId/post/:postId` 來說，就是一條會用到 `userId` 和 `postId` 的 route

---

### 真正的巢狀 route 範例：

```jsx
<Route path="/user/:userId" element={<UserPage />}>
  <Route path="post/:postId" element={<PostPage />} />
</Route>
```

`UserPage` 就要用 `<Outlet />` 去嵌入 `PostPage`。

---





## 跳轉頁面

這邊統整一下前面提到的 **跳轉頁面控制方式**。


### 一般跳轉：使用 `<Link />` 或 `<NavLink />`

這個前面有提到，
兩者的差別只在於：

* `<NavLink />` 多了 `isActive`，常用來讓被選中時套對應的 CSS。

**範例：**

```jsx
<Link to="/about">關於我們</Link>
```

這種方式是靠「點擊」來觸發跳轉。

---

### 程式跳轉：使用 `useNavigate()`

`useNavigate()` 是 `react-router-dom` 提供的 hook，
可以用來在**程式中控制頁面跳轉**，不需要使用者點擊。

常見情境例如：

* 登入成功後自動導向首頁
* 表單送出後跳轉到確認頁
* 按按鈕根據選項導向某個動態頁面



**範例：**

```jsx
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  function handleLogin() {
    // 做完登入驗證後
    navigate("/home");
  }

  return <button onClick={handleLogin}>登入</button>;
}
```

---

### `replace` 參數

登入系統常會用：

```js
navigate("/", { replace: true });
```

* `replace: false` 是預設值，會保留這一頁在 history 中
  （回前頁會跳轉回這個頁面）
* `replace: true` 代表「取代」這一頁的紀錄，回前頁就不會回來這邊

---

### 返回前一頁

可以用：

```js
navigate(-1);
```

等同於點瀏覽器的上一頁。

---

### 登入頁實際範例

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/", { replace: true });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="account" />
      <input type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
```

---

### Route 要怎麼設計？

大部分情況應該是「登入後」才能進入首頁或看到一些特定頁面，
而不是只要輸入網址就能到任何頁面。

這時候就會需要 **Protected Route（受保護路由）**。

---




## Protected Route（保護路由）


Protected Route 是一種「**登入後才能看的頁面控制機制**」。

可以想成是在原本的 `<Route />` 元件外包一層「驗證機制」。



#### 原本的寫法：

```jsx
<Route path="/home" element={<Home />} />
```

任何人只要輸入網址就能看到 `/home` 頁面。



#### 加上保護：

```jsx
<Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
```

這樣就會先經過 `<RequireAuth />` 的檢查機制。

---

### `<RequireAuth /> `

這並不是 React 或 React Router 的內建元件，
**是要自己實作的一個 HOC（高階元件，Higher-Order Component）**。



#### HOC 定義：

* 接收一個 component（通常透過 `children` 傳入）
* 透過一些邏輯或計算後回傳一個新的 component
* 這邊拿來做登入驗證

---

### 範例：`RequireAuth.jsx`

```jsx
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem("login") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
```



* `children` 是被包裹的 component（例如 `<Home />`)，這邊要記得加 `{}` 因為是解構賦值
* 這裡假設登入狀態存在 `localStorage` 裡（值為字串 `"true"`）
* 如果沒登入，導向 `/login` 頁面
* 如果有登入，正常顯示被保護的頁面

`localStorage` 是瀏覽器內建的，不需要 import 其他東西就可以用
 

---

### Route 的寫法：

```jsx
<Route
  path="/"
  element={
    <RequireAuth>
      <Home />
    </RequireAuth>
  }
/>
```
用 `RequireAuth` 把要保護的頁麵包起來。

這樣 `<Home />` 就會變成 `RequireAuth` 中的 `children`，
沒登入就會跳轉回登入頁，達到「保護」的效果。

---

### 登入後設定 login 狀態

在登入頁面的 `handleSubmit()` 裡設定 `localStorage`：

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("login", "true");  // 設定登入狀態
    navigate("/", { replace: true });       // 登入後導向首頁
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="account" />
      <input type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
```

* 用 `localStorage.setItem` 將 "login" 設為 "true" 表示登入成功

---

## NavBar

這也常拿來做動態切換的 NavBar 。

### 尚未登入：

```
Home | Login | Register
```

### 登入後：

```
Home | Profile | Logout
```

一樣是利用判斷 `localStorage的值` 去檢查登入與否

```js
const isLoggedIn = localStorage.getItem("login") === "true";
```

---

### 注意：localStorage 的值改變 **不會觸發自動更新**

`localStorage` 不是 `state` 所以有改變也不會自動 re-render

如果要讓畫面跟著登入狀態改變，可以搭配hook去寫：

```js
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  setIsLoggedIn(localStorage.getItem("login") === "true");
}, []);
```


---



## useParams、useLocation、URLSearchParams 比較

這三個都是 React Router 提供（或搭配使用）的工具，主要用途是「**取得網址上的資訊**」。



###  `useParams()`

用來取得 **動態路由（dynamic segment）** 的參數。

#### 例子：

```jsx
<Route path="/user/:id" element={<User />} />
```

```jsx
// User.jsx
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams(); 
  return <h1>User ID: {id}</h1>;
}
```

假設使用者打開 `/user/88`，那 `id` 就會是 `"88"`。

---

### `useLocation()`

用來取得**完整的網址資訊**，包含：

* `pathname`：目前的路徑
* `search`：? 開頭的查詢字串
* `hash`：# 開頭的 fragment（不常用）
* `key`：唯一鍵值（每次跳頁都不一樣）

#### 範例：

```jsx
import { useLocation } from "react-router-dom";

function Info() {
  const location = useLocation();
  console.log(location);

  /*
    location = {
      pathname: "/product",
      search: "?type=phone&page=2",
      hash: "",
      key: "abc123"
    }
  */

  return <p>Current Path: {location.pathname}</p>;
}
```

---

###  `URLSearchParams`

這不是 React Router 的 hook，而是瀏覽器提供的標準工具，
**通常會搭配 `useLocation()` 來解析 `search` 字串中的參數**。

#### 範例：

```jsx
import { useLocation } from "react-router-dom";

function Product() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const type = query.get("type"); // "phone"
  const page = query.get("page"); // "2"

  return <p>Type: {type}, Page: {page}</p>;
}
```

假設網址是：`/product?type=phone&page=2`

* `location.search` 就是 `"?type=phone&page=2"`
* `URLSearchParams` 可以把它解析成類似物件的查詢結果

---

### 比較

| Hook / API        | 功能                              | 備註                           |
| ----------------- | ------------------------------- | ---------------------------- |
| `useParams()`     | 取得網址中的動態 segment（如 `/user/:id`） | 回傳一個物件                       |
| `useLocation()`   | 取得完整網址資訊（含 pathname、search）     | 回傳一個 `location` 物件           |
| `URLSearchParams` | 解析 `?key=value` 查詢字串            | 搭配 `useLocation().search` 使用 |





---

## Lazy Route（懶加載 Route）

當網站有很多頁面時，若一開始就全部載入，會導致「初次進站非常慢」。
為了改善這個問題，可以使用 **Lazy Route**（懶加載）讓「用到的頁面才載入」。

React 提供的兩個工具可以實現這件事：

* `React.lazy()`
* `<Suspense fallback={...}>`

---

### 基本做法

1. 用 `React.lazy()` 包裝要延遲載入的 component
2. 在 `<Route>` 中使用該 lazy component
3. 外層用 `<Suspense>` 包起來，設定載入時顯示的畫面

---

####  原本的同步寫法:

```jsx
import About from "./pages/About";

<Route path="/about" element={<About />} />
```


###  Lazy Route 的寫法:

```jsx
// App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

* `lazy(() => import("./pages/About"))` 這裡要用箭頭函數寫是為了讓這個函式不要馬上執行，而是交給 `React.lazy` 控制
  
  
* `import()`是非同步函式，回傳一個 Promise。這個 Promise 會 resolve 成：

  ```js
  {
    default: [export 出來的 React component]
  }
  ```

* 為什麼不寫成 async/await？
  因為 React.lazy 背後已經「自動內建 await」，你只需要寫 `() => import(...)`
  不需要自己處理 async function。

* `lazy()` **只能包裝 default export 的 component**

---

###  `Suspense` 

`<Suspense>` 是用來包住 lazy 元件的，它會在「載入尚未完成時」顯示 `fallback` 畫面。

你可以：

* 全站包一個
* 也可以每個頁面單獨包一個

---

### 可以每一個頁面分開loading：

直接寫在 Route element 裡面:

```jsx
<Route
  path="/about"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <About />
    </Suspense>
  }
/>
```

這樣可以讓不同頁面顯示不同的 loading 畫面（更細緻控制 UX）。

---







