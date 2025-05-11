# CSS 筆記

## CSS 三種寫法

### 1. 直接寫在標籤裡面（行內樣式）

用 `style` 屬性直接在 HTML 標籤裡面加 CSS。

```html
<p style="color: blue; font-size: 20px;">直接寫在標籤上的 CSS</p>
```

---

### 2. 寫在 `<style>` 標籤裡（內部樣式）

寫在 HTML 的 `<head>` 裡面，類似一種設定區塊。

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p {
      color: red;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <p>這段文字會變紅色！</p>
</body>
</html>
```

---

### 3. 把 CSS 和 HTML 分開（外部樣式）

實務上最常見的做法，CSS 會寫在獨立的檔案裡。

#### 檔案一：`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>我的第一個網頁</title>
  <link rel="stylesheet" href="style.css"> <!-- 連接 CSS -->
</head>
<body>
  <h1>歡迎來到我的網站！</h1>
  <p>這是一段段落文字。</p>
  <button>點我一下</button>
</body>
</html>
```

#### 檔案二：`style.css`

```css
/* 設定整體背景色 */
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

/* 標題樣式 */
h1 {
  color: steelblue;
  text-align: center;
}

/* 段落樣式 */
p {
  color: #333;
  font-size: 18px;
}

/* 按鈕樣式 */
button {
  background-color: lightgreen;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
```

---

### `<link>` 標籤說明

在 `<head>` 裡面的這行：

```html
<link rel="stylesheet" href="style.css">
```

* `rel` 是 relation，表示這個檔案和 HTML 的關係是「樣式表」。
* `href` 是連結的檔案路徑，通常填相對路徑。

---

### 為什麼要分開寫？

如果全部混在 HTML 裡會很亂，而且會重複寫很多次：

```html
<p style="color: red;">1</p>
<p style="color: red;">2</p>
<p style="color: red;">3</p>
```

改用 CSS：

```html
<style>
  p {
    color: red;
  }
</style>
```

---

### CSS 語法簡介

這裡的 `p {}` 是 CSS 的 selector，意思是「所有的 `<p>` 標籤都套用裡面的樣式」。

大括號 `{}` 裡面可以放很多個樣式，每個叫做一個 statement：

```css
p {
  color: red;
  font-size: 16px;
}
```

* `color` 和 `font-size` 是 property（屬性）
* `red` 和 `16px` 是對應的 value（值）
* 每個 statement 都以分號 `;` 結尾

---


## CSS Selector 

CSS selector（選擇器）用來告訴瀏覽器「我要選哪些元素來套用樣式」。

最常用的四種：

1. Element Type Selector
2. ID Selector
3. Class Selector
4. Descendant Selector

---

### 1. Element Type Selector（元素型別選擇器）

會選出所有和指定標籤類型相同的元素。

```css
p {
  color: red;
}
```

上面會把 HTML 裡所有的 `<p>` 元素都改成紅色。

**補充：可以對「自訂標籤」套 CSS**：

```html
<x>hello</x>
```

這類在 HTML 裡會被當作「未知標籤」，雖然瀏覽器不會給它任何功能，但 CSS 還是可以照常套用。不過實務上不推薦這樣做，因為用 `class` 或 `id` 就能達成同樣分類的效果，而且不會造成語意混亂或可讀性變差。

---

### 2. ID Selector（唯一識別選擇器）

透過 `id=""` 指定某個唯一元素，HTML 中 **不能有重複的 id**。

```html
<p id="id1">紅色</p>
<p id="id2">藍色</p>
```

CSS 用 `#` 搭配 id 名稱來選：

```css
#id1 {
  color: red;
}

#id2 {
  color: blue;
}
```

---

### 3. Class Selector（類別選擇器）

`class=""` 是用來做分組用的，同一個 class 可以在多個元素上重複使用。

**命名規則：不能以數字開頭，要用字母或底線開頭。**

錯誤範例：

```html
<p class="1">a</p>  <!-- 不合法 -->
```



CSS 用 `.` 搭配 class 名稱來選：

```html
<p class="class1">綠色</p>
<p class="class1">綠色2</p>
```

```css
.class1 {
  color: green;
}
```

 **一個元素可以同時擁有多個 class**：

```html
<p class="class1 class2 class3">123</p>
```

這個元素同時屬於 `class1`、`class2` 和 `class3`，可以被多個樣式影響。

---

### 4. Descendant Selector（後代選擇器）

用來選擇「某個元素之內的某種類型元素」。

```css
div p {
  color: blue;
}
```

這代表所有 `<div>` 裡的 `<p>` 都會被改樣式，**不論是子元素、孫元素都會被選中**。

範例：

```html
<div>
  <p>a</p>   <!-- 會被改 -->
  <h1>b</h1> <!-- 不會被改 -->
</div>
<p>c</p>     <!-- 不會被改 -->
```

也可以配合 `class` 或 `id` 使用：

```css
.class1 p {}   /* 所有 class1 元素裡的 <p> */
#box p {}      /* id="box" 裡的 <p> */
```

 **可以有多層descendant selector**：

```css
X Y Z {
  /* 表示 Z 是 Y 的後代，Y 又是 X 的後代 */
}
```

底層的選擇器通常是從 Z 開始往外找父層（像 DFS 一樣）。雖然理論上層數越多可能越慢，但實務上通常不會造成效能瓶頸。

**但仍然建議避免過多層級**，為了可讀性和維護性。

另外有一種會用到 `>` 這個符號:
```css
X > Y {
  /* 表示 Y 是 X 的直接子元素*/
}
```
這種情況下只會找 X 的直接子元素，像是如果 X 有子元素 Z 然後 Z 有子元素 Y 就不會被選到。

---

### Selector 可以組合使用

你可以混合 selector 來更精確地選元素：

```css
p.class1 {
  color: orange;
}
```

上面表示「同時是 `<p>` 標籤又屬於 `class1` 的元素」才會被選中。

---



## CSS Specificity（優先權）

當多個 CSS 設定衝突時，會用「**specificity（優先度）**」來決定哪個設定生效。如果沒有衝突，那就照順序覆蓋即可。

### 實例說明

```html
<p class="a" id="b" style="color: green;">Hello</p>
```

這段 `<p>` 同時被 class、id、inline style 指定，結果會是：

* `style` 裡的設定優先度最高（color: green）
* 若沒有 style，就比 `id` 再比 `class`
* 若都沒有，再看 element 選擇器本身

### 優先度

| 類型                                         | Specificity 值 |
| ------------------------------------------ | ------------- |
| Inline Style                               | `1,0,0,0`     |
| ID Selector                                | `0,1,0,0`     |
| Class Selector / Attributes / Pseudo-class | `0,0,1,0`     |
| Element Selector / Pseudo-element          | `0,0,0,1`     |

同樣優先度的情況下，**寫在後面的 CSS 會蓋掉前面的設定(override)**。

### 組合情境範例
當selector不是單純上面提到的任何一種，就會用組合的方式去決定specificity

```css
div p {}                  /* 0,0,0,2 */
div .highlight {}         /* 0,0,1,1 */
div p.highlight {}        /* 0,0,1,2 */
```

會把 selector 分解成對應權重加總來比大小。

---

## CSS 文字樣式設定（常用 statement）

CSS 設定會寫在 selector 裡，格式如下：

```css
selector {
  property: value;
}
```

### 1. `color`

設定文字顏色，不會影響背景或邊框。

可用格式：

* 英文名：`red`, `blue`, `black`, `white` ...
* HEX：`#ff0000`
* RGB：`rgb(255, 0, 0)`
* RGBA：`rgba(255, 0, 0, 0.5)` //比RGB多一個顏色透明度
* HSL：`hsl(0, 100%, 50%)`
* HSLA：`hsla(0, 100%, 50%, 0.5)`
* 完全透明：`color: transparent;`

---

### 2. `font-size`

設定字體大小，**要加單位**。

單位選擇：

* `px`：固定像素，精確控制
* `%`：相對於父元素
* `em`：相對於父元素的 `font-size`
* `rem`：相對於 `<html>` 的 `font-size`

```css
font-size: 16px;
font-size: 1.2em;
font-size: 1rem;
```

---

### 3. `letter-spacing`

設定字與字之間的距離。

```css
letter-spacing: 2px;
```

* 單位可用：`px`, `em`, `rem`
* 預設值：`normal`

---

### 4. `line-height`

設定行距（垂直距離）。

```css
line-height: 1.6;
```

* 可用單位：`px`, `em`, `rem`
* 可用純數字：表示字體大小的倍數（推薦方式）

---

### 5. `font-weight`

控制字體粗細。

```css
font-weight: normal;     /* 常見值：normal, bold, lighter, bolder */
font-weight: 700;        /* 數字從 100 到 900 */
```

注意：有些字體不支援所有數值。

---

### 6. `text-decoration`

設定文字裝飾線條。

```css
text-decoration: underline;
text-decoration: line-through;
text-decoration-color: red;
```

選項：

* `none`（移除裝飾）
* `underline`（底線）
* `overline`（上線）
* `line-through`（刪除線）

---

### 7. `font-style`

設定斜體：

```css
font-style: italic;
```

---

### 8. `opacity`

設定整個元素的透明度（包含背景、文字、子元素）。

```css
opacity: 0.5;  /* 0 到 1 */
```

---

### 9. `text-align`

設定內部文字對齊方式（inline 元素）。

```css
text-align: center;
```

選項：

* `left`
* `center`
* `right`
* `justify` //兩端對齊，會撐滿整個寬度

---

### 10. `font-family`

設定字體：

```css
font-family: "Noto Sans", "Microsoft JhengHei", Arial, sans-serif;
```

* 前面是優先字型，會從最前面開始往後看client端有沒有，沒有就繼續往後找，最後建議加上 generic family（如 `sans-serif`）確保 fallback，讓client端至少能夠顯示字體。

---

## 區塊寬高與背景設定

```css
div {
  background: red;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
```

* `width`, `height`：設定元素寬高（單位可用 px, %, em）
* `background`：可用顏色、圖片、漸層
* `overflow: hidden`：超出內容裁切

  * `scroll`：強制出現捲軸
  * `auto`：內容超出才會出現捲軸

---


##  CSS Box Model

CSS 中每個 HTML 元素都被視為一個「盒子」，這套模型稱為 **Box Model**，是網頁排版的基礎。盒子由內而外分為：

```
+----------------------------+
|         margin             |   ← 外邊距（元素與元素之間的空間）
|  +-----------------------+ |
|  |      border           | |   ← 邊框
|  |  +-----------------+  | |
|  |  |   padding        | | |   ← 內邊距（內容與邊框之間的空間）
|  |  | +-------------+  | | |
|  |  | |   content   |  | | |   ← 內容區（文字、圖片等）
|  |  | +-------------+  | | |
|  |  +-----------------+  | |
|  +-----------------------+ |
+----------------------------+
```

###  四個區塊介紹

| 區塊        | 說明                            |
| --------- | ----------------------------- |
| `content` | 實際內容（文字、圖片等）                  |
| `padding` | 內邊距，讓內容不要太貼邊，會吃到背景色           |
| `border`  | 邊框，可以設定寬度、樣式與顏色               |
| `margin`  | 外邊距，用來隔開其他元素，不影響自身大小，也不會吃到背景色 |




元素總寬度 = content 寬度 + 左右 padding + 左右 border + 左右 margin



```css
div {
  background: red;
  width: 200px;
  height: 200px;
  border: 5px solid black;
}
```

這會產生一個紅底、四邊有黑色實線邊框的區塊。

* `border` 可以指定方向，例如 `border-right: 5px solid black;`
* `padding` 也可以針對方向設定，如：

  ```css
  padding: 50px 10px 20px 40px;
  /* 上 右 下 左（順時針） */
  ```
* `margin` 可以用 `margin: 0 auto;` 來置中區塊。

---

##  Box Sizing

CSS 預設情況下，`width` 和 `height` 只包含 `content`，不包含 `padding` 和 `border`，這會導致加上內距或邊框時整體大小變大。



```css
box-sizing: content-box; /* 預設值 */
box-sizing: border-box;  /* 計算時包含 padding 和 border */
```

通常會統一使用 `border-box`，這樣設定寬高會更直覺：

```css
* {
  box-sizing: border-box;
}
```

---

##  CSS Display 與 Position

###  Display

`display` 決定元素的排列行為，常見的值：

| 值              | 說明             |
| -------------- | -------------- |
| `block`        | 占一整行，會換行，可設定寬高 |
| `inline`       | 不換行，寬高由內容決定    |
| `inline-block` | 不換行，但可設定寬高     |
| `none`         | 完全隱藏元素，不佔空間    |

> 每個元素都有預設的 display，例如 `<div>` 是 `block`，`<span>` 是 `inline`。

---

###  Position

`position` 決定元素的「定位方式」，常見值如下：

| 值          | 說明                                           |
| ---------- | -------------------------------------------- |
| `static`   | 預設值，按照 HTML 順序排列，不受 top/left/right/bottom 影響 |
| `relative` | 相對原本位置偏移，會保留原位                               |
| `fixed`    | 固定在螢幕上的某個位置，不會因為滾動而改變                        |
| `absolute` | 相對最近的非 static 父元素定位，不保留原位                    |

會不會保留原位和重疊的判斷方式

| 特性     | static | relative      | fixed | absolute |
| ------ | ----------|----------- | --------|------- |
| 保留「原位」 | ✅   |   ✅     | ❌      |  ❌  |
| 是否會重疊  | ❌ | ✅   |    ✅    | ✅|

判斷會不會保留原位可以由是不是由自己的位置決定顯示位置來判定，會不會重疊則是用有沒有偏移和有沒有保留原位來判斷 保留原位且沒有偏移的才能保證不重複

---




##  其他 CSS 

###  Float 浮動

* `float: left/right;` → 元素脫離正常排版，靠左或右排列，其他元素會環繞它排列。
* 通常用在圖片，像報紙排版效果。
* 加 `clear: both;` 可讓元素停止環繞效果（例如段落排在圖片下方）。

```css
img {
  float: left;
}
#jack {
  clear: both;
}
```

* **浮動塌陷問題**：父元素內全部是浮動元素會導致高度為 0，解法：

  * 父元素加 `.clearfix`：

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

* **z-index**：用來控制重疊順序，數字越大越上層。預設後寫的會蓋在前寫的上面。

---

###  Pseudo-class 狀態樣式（互動）

```css
a {
  color: blue;
  text-decoration: none;
}

a:hover {
  color: red;
  text-decoration: underline;
  font-size: 60px;
}
```

* `:hover` 是偽類（pseudo-class），當滑鼠移上去時觸發。
* 常見還有 `:active`（點擊時）、`:focus`（表單元素聚焦時）等。

 記得：`a` 和 `a:hover` 是兩個獨立狀態，沒寫的屬性不會自動繼承。

---

###  CSS 左右置中技巧

####   置中整個區塊元素（如 div）

```css
div {
  width: 300px;
  margin: 0 auto; /* 上下 0、左右 auto => 左右置中 */
}
```

####  區塊內文字置中

```css
div {
  text-align: center;
}
```

 必須寫在包含文字的區塊上（如 div），不能只寫在`<p>` 本身，因為 `<p>` 不知道相對誰置中。

---




##  CSS 優先順序與 Specificity

###  Specificity

* 當多個 CSS 規則作用於同一元素時，`specificity` 用來決定哪一條規則最終生效。
* 計算規則：

  * ID 選擇器（`#id`）優先
  * 類別、屬性選擇器（`.class`, `[type='text']`）次之
  * 元素選擇器（`div`, `p`）最弱
  * 計算細節在前面有提到

###  `!important` 

* `!important` 會強制優先執行該規則，忽視 `specificity`。
* 盡量避免過多使用 `!important`，因為它會增加維護難度。
* 當多個 `!important` 規則指向同一元素時，依然會根據他們的 `specificity` 來決定最終生效的規則。

```css
color: red !important; 
```

---

##  Responsive CSS



`@media` 用來根據螢幕大小或其他條件修改樣式，常用於實現響應式設計。
* 可以針對不同的螢幕寬度設置不同的樣式。

```css
@media only screen and (max-width: 900px) {
  /* 螢幕寬度小於 900px 時生效 */
}

@media only screen and (max-width: 500px) {
  /* 螢幕寬度小於 500px 時生效 */
}
```
注意順序不能反過來，如果反過來寫前面符合了也會被後面的override。

* **小螢幕優先**（Mobile First）：使用 `min-width`，從小的螢幕開始設計。
* **大螢幕優先**（Desktop First）：使用 `max-width`，從大的螢幕開始設計。

#### 例子：Mobile First 方案

```css
@media only screen and (min-width: 320px) { /* >320px */}
@media only screen and (min-width: 500px) { /* >500px */}
```

#### 例子：Desktop First 方案

```css
@media only screen and (max-width: 900px) { /* <900px */}
@media only screen and (max-width: 500px) { /* <500px */}
```

###  `max-width` 

* `max-width` 屬性常用來讓元素隨著父元素或螢幕大小調整，保持比例。

```css
img {
  max-width: 100%; /* 圖片自動拉伸至父元素寬度 */
}
```

* 圖片會自動根據父元素的寬度縮放，保持比例。



---