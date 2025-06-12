# DOM (Document Object Model)

DOM 是瀏覽器將 HTML 轉換成一顆 JavaScript 可以操作的樹狀結構。

例如，給定一個 HTML：

```html
<body>
  <h1>Hello</h1>
  <p>World</p>
</body>
````

瀏覽器會建立像這樣的 DOM 結構：

```
document
 └── html
      └── body
           ├── h1
           │    └── "Hello"
           └── p
                └── "World"
```

這裡面的每個節點 (node) 都是物件，可以透過 JavaScript 去讀取或修改這些節點。

## 5 個 DOM 要學習的重點

1. **如何選取元素 (DOM Selector)**
2. **如何改變內容和屬性**
3. **如何新增與移除元素**
4. **事件處理 (Event Handling)**
5. **表單 (Form) 處理**



---



## 1. DOM Selector

### 1) `.getElementById(id)`
使用 `id` 屬性來返回指定的元素。  
如果元素有一個 `id` 屬性，這個方法會直接返回該元素。

```html
<p id="id1">Hello</p>

<script>
  let el = document.getElementById("id1");
  console.log(el.innerText); // 輸出 Hello
</script>
````

### 2) `.getElementsByClassName(className)`

根據 `class` 屬性返回相同 `class` 的元素集合。
因為可能有多個元素符合，所以返回的是一個 HTMLCollection（類陣列）。

```html
<p class="note">First</p>
<p class="note">Second</p>

<script>
  let els = document.getElementsByClassName("note");
  console.log(els[0].innerText); // 輸出 First
</script>
```

### 3) `.getElementsByTagName(tagName)`

返回所有指定標籤的元素。
例如，使用 `<p>` 返回所有的 `<p>` 元素。

```html
<p>Paragraph 1</p>
<p>Paragraph 2</p>

<script>
  let paras = document.getElementsByTagName("p");
  console.log(paras.length); // 回傳共有幾個 <p> 元素
</script>
```

### 4) `.querySelector(cssSelector)`

根據 CSS 選擇器語法選取元素，並只返回第一個符合條件的元素。

```html
<p class="note" id="intro">Text</p>

<script>
  let el = document.querySelector("#intro"); // #是id
  let el2 = document.querySelector(".note"); // .是class
  let el3 = document.querySelector("p.note"); // <p>元素且有note class
  console.log(el.innerText); // 輸出 Text
</script>
```

### 5) `.querySelectorAll(cssSelector)`

選取所有符合條件的元素，並返回 NodeList。
通常會使用 `forEach` 來處理這些元素。

```html
<p class="note">First</p>
<p class="note">Second</p>

<script>
  let allNotes = document.querySelectorAll(".note");
  allNotes.forEach(el => console.log(el.innerText)); // 輸出 First 和 Second
</script>
```

### 最常用的是 `querySelector` 和 `querySelectorAll`

這兩個方法較為靈活，因為它們可以使用 CSS 語法，讓選取元素變得更加方便和強大。


---



## 2. DOM 常用的 Property 和 Method

### 1) `element.innerText`
代表元素的可見文字（會受到 CSS 樣式影響），可以讀取或設定文字內容。

```html
<p id="demo">Hello <b>World</b></p>

<script>
  let el = document.querySelector("#demo");
  el.innerText = "New Text";
  console.log(el.innerText); // 輸出 New Text
</script>
````

### 2) `element.innerHTML`

讀取或設定元素內部的 HTML 結構。
這會將元素的內容直接替換為指定的 HTML 內容。

```html
<p id="demo">Hello World</p>

<script>
  let el = document.querySelector("#demo");
  el.innerHTML = "<span style='color:red'>Red Text</span>"; // 替換成新的 HTML
</script>
```

### 3) `element.value`

對 `<input>`, `<textarea>`, `<select>` 等元素，讀取或設定使用者輸入的值。
只有和使用者輸入相關的元素才有這個屬性，像是 `<p>` 或 `<div>` 用會報錯或回傳 `undefined`。

```html
<input id="myInput" value="hi">

<script>
  let input = document.querySelector("#myInput");
  console.log(input.value); // 輸出 hi
  input.value = "new text"; // 改變 input 顯示的文字
</script>
```

### 4) `.getAttribute()` / `.setAttribute()`

* `getAttribute()`：讀取元素的指定屬性值。
* `setAttribute()`：設定元素的指定屬性值。

```html
<img id="img1" src="cat.jpg" alt="a cat">

<script>
  let img = document.getElementById("img1");
  console.log(img.getAttribute("src")); // 輸出 "cat.jpg"
  img.setAttribute("alt", "a sleeping cat"); // 修改 alt 屬性
</script>
```

### 5) `.classList`

用來新增、移除或切換元素的 `class`。

* `add()`：新增 class。
* `remove()`：移除 class。
* `toggle()`：切換 class（若有則移除，若沒有則新增）。

```html
<p id="demo">Hello</p>

<script>
  let el = document.querySelector("#demo");
  el.classList.add("active"); // 新增 "active" class
  el.classList.remove("hidden"); // 移除 "hidden" class
  el.classList.toggle("checked"); // 切換 "checked" class
</script>
```

### 6) `.style`

直接改變元素的 CSS 樣式。

* 可以逐一設置各個 CSS 屬性。
* 也可以使用 `cssText` 一次寫多個樣式。

```html
<p id="demo">Hello</p>

<script>
  let el = document.querySelector("#demo");
  el.style.color = "blue"; // 改變文字顏色為藍色
  el.style.fontSize = "20px"; // 改變字型大小為 20px
  el.style.cssText = "color:blue; border: 1px solid black"; // 一次設置多個樣式
</script>
```

### JS 操作 DOM Tree

* 注意，JavaScript 只會修改瀏覽器中的 DOM tree（即瀏覽器記憶體中的畫面），不會改變原本的 HTML 檔案。
* 這樣的設計是為了保護使用者的檔案系統不被 client 端的 JS 操控，並允許頁面在不重新載入的情況下進行更新，提升頁面的互動性。

### 永久儲存變更

* 如果需要永久儲存改動，需要通過後端儲存和發送資料：

  1. 使用者輸入文字 -> JS 使用 `fetch()` 送到後端 API。
  2. 後端將資料寫入資料庫或檔案，當頁面重新載入時，可以顯示保存的資料。


---



## 3. DOM 元素的新增 / 刪除

### 1) `document.createElement(tagName)`
建立一個新的 DOM 元素（尚未插入畫面）。

```js
let newP = document.createElement("p");
newP.innerText = "This is a new paragraph.";
````

---

### 2) `element.appendChild(child)`

將一個元素節點加入某元素的最後。
只能加入「element node」，不能加入純文字（text node）。

```html
<div id="content"></div>

<script>
  let container = document.getElementById("content");
  container.appendChild(newP); // 將 newP 插入 content 內
</script>
```

---

### 2.5) `element.append()`

類似 `appendChild()`，但更彈性：

* 可加入「element node」或「文字內容」。
* 可一次插入多個項目。

```js
let p = document.createElement("p");
p.innerText = "段落內容";

let el = document.getElementById("el");
el.append("文字1", p, "文字2");

// 結果會是：
/*
<div id="el">
  文字1
  <p>段落內容</p>
  文字2
</div>
*/
```

---

### 3) `element.prepend(child)`

將元素或文字插入到指定元素的開頭（最前面）。
和 `append()` 類似，也支援插入文字。

```js
container.prepend(newP); // 將 newP 加在 container 最前面
```

---

### 4) `element.remove()`

將該元素從 DOM 中移除。

```js
let p = document.getElementById("text");
p.remove(); // 刪除這個段落
```

---

### 5) `element.removeChild(child)`

從父元素中移除指定的子元素。

```js
let container = document.getElementById("content");
let p = document.getElementById("text");
container.removeChild(p); // 從 container 裡移除 p
```

---

### 6) `parent.insertBefore(newNode, referenceNode)`

將 `newNode` 插入到 `referenceNode` 的前面。

用在不是放在最前或最後面的時候。

```html
<div id="container">
  <p>第一段</p>
  <p id="target">第三段</p>
</div>
```

```js
let newP = document.createElement("p");
newP.innerText = "第二段";

let container = document.getElementById("container");
let target = document.getElementById("target");

container.insertBefore(newP, target); // 插入成第二段
```



這些方法讓你可以自由地動態新增、插入或刪除畫面上的元素，非常適合做互動式網頁開發。


---


## 4. Event Handler（事件處理）

**Event（事件）** 是使用者與網頁互動時觸發的動作，例如：
- `click`：點擊按鈕
- `mouseover` / `mouseout`：滑鼠移入 / 移出
- `keydown` / `keyup`：鍵盤按下 / 放開
- `submit`：送出表單
- `load`：頁面載入完成

### 使用 `addEventListener(event, handlerFunction)`
監聽事件的標準寫法：

```js
element.addEventListener("事件名稱", handlerFunction);
````

handler function 本質上就是 callback function，可以是匿名函式或已命名的函式。

---

###  範例：點擊按鈕顯示提示

```html
<button id="btn">Click Me</button>
```

```js
let btn = document.querySelector("#btn");

btn.addEventListener("click", function() {
  alert("Clicked！");
});
```

---

###  兩種 handler function 寫法

#### 1. 匿名函式（anonymous function）

```js
btn.addEventListener("click", function() {
  console.log("Clicked!");
});
```

#### 2. 命名函式

```js
function handleClick() {
  console.log("Clicked!");
}

btn.addEventListener("click", handleClick);
```

---

### 瀏覽器的角色

* `addEventListener()` 是瀏覽器提供的 API，不是 JavaScript 核心語法。
* 在 JS 中呼叫 `element.addEventListener()` 是告訴瀏覽器：

  * 「這個 element 要綁定某個事件」
  * 「觸發時請執行我指定的 handler function」
* 真正「監聽」與「事件偵測」的工作是瀏覽器負責的。

---

### 常見事件種類

| 事件名稱               | 說明                         |
| ------------------ | -------------------------- |
| `click`            | 點擊元素                       |
| `mouseover`        | 滑鼠移入元素                     |
| `mouseout`         | 滑鼠移出元素                     |
| `keydown`          | 鍵盤按下（通常綁在整個 `document`）    |
| `keyup`            | 鍵盤放開                       |
| `submit`           | 表單送出                       |
| `change`           | 表單元素變化（例如 select、checkbox） |
| `input`            | 輸入框內容改變                    |
| `DOMContentLoaded` | DOM 結構載入完成                 |



這些事件搭配 handler function 使用，是建立互動式網頁的核心技巧之一。

---


##  Event Object（事件物件）

當事件觸發時，瀏覽器會**自動傳入一個 event 物件**給 handler function。

```js
element.addEventListener("click", function(event) {
  console.log(event);
});
````

這個 `event` 是一個「事件資訊包」，裡面包含本次事件的相關資訊，例如：

* 哪個元素觸發的（`target`）
* 滑鼠座標
* 哪個鍵盤鍵被按下
* 是否可以阻止預設行為等

---

### 不一定要接 event

若 handler function 裡不需要用到 event 資訊，可以不用接 `event`：

```js
btn.addEventListener("click", function() {
  console.log("Clicked!");
});
```

但如果你**需要使用事件資訊**，就要接收這個 event 參數：

```js
btn.addEventListener("click", function(event) {
  console.log(event.target);  // 哪個元素被點擊
});
```

---

## 常見的 event 屬性與方法

### 1. `event.target`

* 取得觸發事件的元素（點擊的那個）

```js
btn.addEventListener("click", function(e) {
  console.log(e.target);  // <button> 之類的
});
```

---

### 1.5 `event.currentTarget`

* 取得綁定事件的元素（通常是父元素）
* 和 `target` 的差異：`target` 是**實際被點的元素**，而 `currentTarget` 是**被綁定事件的元素**

```html
<div id="box" style="padding: 20px; background-color: lightblue;">
  <button id="btn">Click Me</button>
</div>
```

```js
let box = document.getElementById("box");

box.addEventListener("click", function(event) {
  console.log("target:", event.target);         // <button>
  console.log("currentTarget:", event.currentTarget); // <div>
});
```

---

### 2. `event.type`

* 回傳觸發事件的類型，例如 `"click"`、`"keydown"`

```js
btn.addEventListener("click", function(e) {
  console.log(e.type); // "click"
});
```

---

### 3. `event.preventDefault()`

* 阻止事件的預設行為（如表單送出後重新整理頁面）

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log("表單被攔截了！");
});
```

---

### 4. `event.key`

* 取得按下的鍵（只能用在 `keydown` / `keyup`）

```js
document.addEventListener("keydown", function(e) {
  console.log("你按了：", e.key); // 像是 "a", "Enter"
});
```

---

### 5. `event.clientX` / `event.clientY`

* 取得滑鼠點擊位置（相對於瀏覽器視窗的座標）

```js
document.addEventListener("click", function(e) {
  console.log("X:", e.clientX, "Y:", e.clientY);
});
```

---

### 6. `event.stopPropagation()`

* 阻止事件「冒泡」傳遞到父層元素

```js
btn.addEventListener("click", function(e) {
  e.stopPropagation();  // 阻止事件傳遞
});
```



這些屬性與方法是操作 DOM 事件時非常實用的工具，熟悉它們能更靈活地控制使用者互動邏輯。


---



##  5. 表單處理（Form）


### 1) 表單的基本結構 `<form>`

在 HTML 中，表單會用 `<form>` 標籤包住所有輸入欄位與按鈕：

```html
<form id="myForm">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">送出</button>
</form>
````

* 點擊 `<button type="submit">` 會觸發 `submit` 事件
* **預設行為：** 送出表單並重新整理頁面

---

### 2) 在 JS 中監聽 `submit` 事件

可以使用 `addEventListener` 偵測使用者送出表單，並用 `preventDefault()` 停用預設行為：

```js
let form = document.querySelector("#myForm");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // 阻止表單重新整理
  console.log("表單送出被攔截了！");
});
```

停用預設行為後，就可以自己決定表單送出後要做什麼，例如：

* 取得使用者輸入
* 檢查欄位內容
* 串接 API 等等

---

### 3) 取得輸入欄位的值

#### HTML 結構：

```html
<form id="loginForm">
  <input type="text" name="username" id="username" />
  <input type="password" name="password" id="password" />
  <button type="submit">Login</button>
</form>
```

#### JavaScript：

```js
let form = document.querySelector("#loginForm");

form.addEventListener("submit", function(e) {
  e.preventDefault(); //不重整網頁

  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  console.log("帳號：", username);
  console.log("密碼：", password);
});
```





* 表單送出會觸發 `submit` 事件，預設會跳頁
* 可用 `e.preventDefault()` 取消預設行為
* 使用 `.value` 取得使用者輸入
* 事件與表單常搭配使用在登入/註冊/搜尋等功能

---




## 補充 (event propagation)


可以看一下巢狀元素

```html
<body>
  <div id="outer">
    <button id="inner">Click me</button>
  </div>
</body>
```
假設今天在`outer`和`inner`都綁了 event listener 

當點擊 button 時`outer`和`inner`的觸發順序是什麼? 怎麼決定?

這時候就需要靠 event propagation 的機制來決定

### Event Propagation

event 的傳遞有三個階段 依序是:

1. Capturing phase (捕獲階段): 從最外層往內傳(從`<html>`->`<body>`->`子層`)

2. Target phase (目標階段): event發生在目標元素上面

3. Bubbling phase (冒泡階段): 從內往外傳(從`<button>`->`<body>`->`<html>`)

event 會依序經歷這三個 phase，每個 phase 會不會觸發 listener 取決於有沒有綁對應 phase 的 listener。

我們可以控制的是 listener 會在哪一個階段被觸發。

### listener
```js
element.addEventListener('click', handler, true)
```

可以看到相較於之前的寫法我們多用了第三個參數，這個 boolean 值會決定我們要讓 listener 在第一階段(`Capturing phase`) 還是第三階段(`Bubbling phase`)觸發。

`true`對應到`Capturing phase`，而`false`對應到`Bubbling phase`。

如果沒寫也就是預設情況下會是`false`，也意味著平常會是`Bubbling`，由內傳到外

### e.stopPropagation()

我們可以在 event 的 handler function 裡面加上`e.stopPropagation()`，可以阻止繼續往外或往內冒泡。

```js
document.getElementById("inner").addEventListener("click", (e) => {
  e.stopPropagation();  // 阻止往外冒泡
  console.log("button clicked");
});
```


---



