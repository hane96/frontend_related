# HTML 筆記

HTML (HyperText Markup Language) 是一種 markup language，負責：

* **為網頁內容加上語意**
* **幫助瀏覽器理解結構**
* **搭配 CSS 呈現畫面**
* **用 JavaScript 處理互動**

---

## HTML 和 CSS 的差別

* HTML 不只是寫給人看，**也是寫給瀏覽器看**，要**告訴瀏覽器語意**
* **搜尋引擎的演算法是根據 HTML 結構判斷網頁重點**，不是看 CSS，所以用 HTML 標結構是很重要的
* CSS 比較像是「裝飾」，**不標結構**

---

## HTML 的基本結構與語法

HTML 由多個元素（element）構成，每個元素包含：

1. opening tag 例如：`<p>`
2. closing tag 例如：`</p>`（就是 opening tag 前加 `/`）
3. 內容
   例如：

   ```html
   <p>內容</p>
   ```

---

## HTML 文件的基本架構

以下是一個 HTML 文件的基本範例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>我的第一個網頁</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>這是一個段落。</p>
  </body>
</html>
```

說明：

1. `<!DOCTYPE html>`：告訴瀏覽器這是一份 HTML5 文件，**必須寫在最上面**
2. `<html lang="en">`：根元素（root element）

   * `lang="en"` 表示語言是英文
   * 可以改成 `zh-Hant`（繁體中文）或 `zh-Hans`（簡體中文）
3. `<head>...</head>`：**頭部資訊**，不會顯示在網頁上，包含 metadata、標題、CSS/JS 引入等
4. `<meta charset="UTF-8" />`：設定網站編碼方式，`UTF-8` 支援中文，決定文字能否正常顯示
5. `<title>...</title>`：網頁標題，會顯示在**分頁標籤上**
6. `<body>`：**正文章節**，瀏覽器會顯示的內容放這裡

---

## 常用的 HTML 標籤

| 標籤                 | 說明          | 瀏覽器呈現效果           |
| ------------------ | ----------- | ----------------- |
| `<h1>` \~ `<h6>`   | 標題（從大到小）    | 粗體、大字             |
| `<p>`              | 段落          | 有段落間距的普通文字        |
| `<br>`             | 強制換行        | 換行                |
| `<hr>`             | 水平線         | 一條灰線              |
| `<strong>`         | 重要文字（語意性加粗） | 加粗字               |
| `<em>`             | 強調文字（語意性斜體） | 斜體字               |
| `<a href="URL">`   | 超連結         | 可點的文字，預設藍底線       |
| `<img src="圖片路徑">` | 插入圖片        | 顯示圖片              |
| `<ul>`             | 無序清單（圓點）    | 點點列表              |
| `<ol>`             | 有序清單（編號）    | 1. 2. 3. 的列表      |
| `<li>`             | 清單項目        | 搭配 `ul` 或 `ol` 使用 |
| `<div>`            | 區塊容器        | 無外觀，用於排版          |
| `<span>`           | 行內容器        | 無外觀，包字做樣式         |

>`<h1>` 通常只會有一個，用來放**最重要的標題**，讓搜尋引擎判斷重點

---

## 清單（List）

HTML 的 list 分為兩種：

* **無序清單 (unordered)** → `<ul>`
* **有序清單 (ordered)** → `<ol>`

範例：無序清單

```html
<ul>
  <li>1</li>
  <li>2</li>
</ul>
```

---

## 語意標籤（Semantic Tags）

| 標籤          | 用途              |
| ----------- | --------------- |
| `<header>`  | 頁首區塊            |
| `<nav>`     | 導覽列（選單、連結）      |
| `<main>`    | 主內容區            |
| `<section>` | 章節或主題群          |
| `<article>` | 獨立文章內容（例如 blog） |
| `<footer>`  | 頁尾區塊            |

---

## 標籤分類

| 分類名稱      | 功能說明            | 範例                            |
| --------- | --------------- | ----------------------------- |
| 文件結構標籤    | HTML 的基本骨架      | `<html>`, `<head>`, `<body>`  |
| 語意結構標籤    | 劃分網頁區塊結構（不影響外觀） | `<header>`, `<main>`, `<nav>` |
| 語意內容標籤    | 有語意、會改變外觀       | `<h1>`, `<p>`, `<ul>`, `<a>`  |
| 結構容器（無語意） | 純粹為了排版          | `<div>`, `<span>`             |

---

## 表單範例

```html
<form action="https://example.com/submit" method="POST">
  <label for="name">名字：</label>
  <input type="text" id="name" name="name" required>
  
  <br><br>
  
  <label for="email">Email：</label>
  <input type="email" id="email" name="email" required>
  
  <br><br>
  
  <button type="submit">送出</button>
</form>
```

---




## 屬性 Attribute

寫在 opening tag 裡面
範例：

```html
<p>my github: <a href="https://github.com/hane96">連結</a></p>
```

### 常用的 Attributes

1. **href**
   用在 `<a>`，設定超連結的網址

   ```html
   <a href="https://example.com">前往網站</a>
   ```

2. **src**
   用在 `<img>` `<script>` `<iframe>`，設定來源檔案位置

   ```html
   <img src="image.jpg">
   ```

3. **alt**
   用在 `<img>`，圖片無法載入時的替代文字

   ```html
   <img src="logo.png" alt="公司標誌">
   ```

4. **title**
   幾乎所有元素都能用，滑鼠移上去會顯示提示文字

   ```html
   <p title="這是段落">滑鼠移上來會看到提示</p>
   ```

5. **id**
   唯一的識別，用來給元素唯一 ID，方便 CSS / JS 存取

   ```html
   <div id="main-section">內容</div>
   ```

6. **class**
   分組用，可重複，搭配 CSS

   ```html
   <p class="note important">這是筆記</p>
   ```

7. **target**
   設定超連結開啟方式

   ```html
   <a href="https://example.com" target="_blank">新分頁打開</a>
   <a href="https://example.com" target="_self">原分頁打開</a>
   ```

8. **rel**
   指定連結和本頁的關係，常搭配 SEO

   ```html
   <a href="..." target="_blank" rel="noopener noreferrer">安全外連</a>
   ```

9. **type**
   指定元素類型（input/script/button）

   ```html
   <input type="password">
   <script type="text/javascript">
   ```

10. **name**
    表單送出時欄位名稱

    ```html
    <input type="text" name="username">
    ```

11. **value**
    指定輸入欄的預設值

    ```html
    <input type="text" value="預設文字">
    ```

12. **placeholder**
    顯示提示文字，輸入後會消失

    ```html
    <input type="email" placeholder="請輸入你的信箱">
    ```

13. **disabled / readonly**
    `disabled`: 不能看也不能改，`readonly`: 只能看不能改

    ```html
    <input type="text" value="不能改" readonly>
    ```

---

一個元素可以有多個 attributes，例如圖片指定寬高：

```html
<img src="image1.jpg" width="200" height="100">
```

※ 若不想讓圖片變形，可只指定一邊（`width` 或 `height`）

同一個 attribute 也可以有多個值（空格分隔）：

```html
<a href="..." target="_blank" rel="noopener noreferrer">我的連結</a>
```

---

## div 與 span 比較

* `div`: 區塊容器，**block level**，會自動換行
* `span`: 行內容器，**inline level**，不會換行

### block level 與 inline level

放在網頁上會不會自動換行：

| 類型     | 範例                                           |
| ------ | -------------------------------------------- |
| inline | `<span>`, `<strong>`, `<a>`, `<em>`, `<img>` |
| block  | `<div>`, `<p>`, `<h1>` \~ `<h6>` 等等          |

可以用 CSS 改變：

```css
p {
  display: inline;
}
```

---

## iframe

可以把其他網站或嵌入元件放進頁面內（如 YouTube、Google Maps）
通常在「分享 → 嵌入」可以找到 iframe 程式碼

```html
<iframe width="560" height="315" src="影片嵌入網址"></iframe>
```

能不能被嵌入是由 HTTP header 決定的（`X-Frame-Options`）

---

## table 標籤

用來建立表格：

* `<table>`: 整張表格
* `<tr>`: 表格一列（table row）
* `<th>`: 表頭（table head）
* `<td>`: 資料格（table data）

範例：

```html
<table>
  <tr>
    <th>id</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>0</td>
    <td>90</td>
  </tr>
  <tr>
    <td>1</td>
    <td>98</td>
  </tr>
</table>
```

---



## Form 表單

用 `<form>` 標籤建立表單結構，可以包住各種輸入欄位與按鈕。

範例：

```html
<form>
  <input type="text">            <!-- 一般文字輸入 -->
  <input type="password">        <!-- 密碼輸入，內容會變成點點 -->
  <br>

  <!-- radio 按鈕，name 相同表示是同一組，只能選一個 -->
  <input type="radio" name="gender"> MALE
  <input type="radio" name="gender"> FEMALE

  <input type="submit">          <!-- 表單送出按鈕 -->
</form>
```

---

## Checkbox

產生一個可勾選的方格：

```html
<input type="checkbox"> 我同意條款
```

---

## select tag（下拉式選單）

建立選項清單，配合 `<option>` 使用：

```html
<select>
  <option>option 1</option>
  <option>option 2</option>
  <option>option 3</option>
</select>
```

### 常見屬性：

* `value`：送出表單時，會送出 `value` 的值，而不是畫面上的文字

  ```html
  <option value="1">選項 A</option>
  ```

* `selected`：設定預設被選中的項目

  ```html
  <option selected>option 2</option>
  ```

* `name`：設定送出的欄位名稱

  ```html
  <select name="myChoice">
    <option value="1">選項 A</option>
    <option value="2">選項 B</option>
  </select>
  ```
