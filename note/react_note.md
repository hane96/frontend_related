# React 學習筆記

## 架構環境

### Create React App

### Vite

* 這兩種都是前端框架的建構工具，`Vite`比較新，下面以使用`Vite`為主。

### 創建專案

```bash
npm create vite@latest
```

* 創建後需要先 `cd` 進入專案資料夾
* 執行 `npm install` 下載所需的套件
* 執行 `npm run dev` 開啟開發伺服器，會啟動一個每次存檔都會即時更新的網頁

### 專案結構

* **node\_modules**

  * 放會用到的套件，React 正常運作需要這些套件
* **public**

  * 放靜態資源 (e.g., 圖片, txt 檔案)，基本上和 React 無關
* **src**

  * 專案的原始碼主要放在這裡，大部分情況下會在這裡編寫程式
  * 裡面有一些 CSS、JSX 檔案，`assets` 資料夾可以放圖片
  * **JSX (JavaScript XML)** 是一種擴充語法，可以把 JS 和 HTML 寫在一起

### index.html

* 瀏覽器的進入點
* 可以看到 body 部分：

```html
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
```

* 網頁主要的內容都是從 `main.jsx` 拿出來的

### main.jsx

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

* `main.jsx` 的工作是將 `App` 組件渲染 (render) 到 `index.html` 中的 `root` 元素
* **App** 是主組件，通常由許多小組件組合而成

### 簡單架構

* **index.html**：定義頁面的基本結構，寫給瀏覽器看的
* **main.jsx**：負責初始化、渲染和掛載 React app
* **App.jsx**：App 的主程式，是小組件的結合體

### package.json

* 記錄專案的基本資訊，例如專案名稱、版本號、使用到的套件等
* 例如：

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
}
```

* 執行 `npm run dev` 就是執行 Vite


---



# React 組件 (Component)

## 組件的基本概念

* 可以把多個 HTML 元素組合在一起
* 可以將網頁拆分為不同部分來撰寫
* React 會將這些組件組合起來形成完整的網頁

## 組件創建方式

1. **Class 組件**

   * 比較老的寫法，早期只有 Class 可以使用 state 和生命週期
   * 現在可以用 function + hook 取代
   * 舊的教學或文章可能還是會用 Class，所以有必要了解

2. **Function 組件** (推薦)

   * 命名必須以大寫英文字母開頭，以便 React 區分組件和 HTML 元素
   * 通常使用大駝峰命名法 (e.g., MyComponent)
   * `return` 的內容必須是 JSX，可以先理解為是可以同時寫 JavaScript 和 HTML 的擴充語法

### 簡單範例

```jsx
function MyComponent() {
  return <h1>你好</h1>
}
```

* 當要使用這個組件時，可以直接用類似 HTML 標籤的寫法：

```jsx
function App() {
    return (
        <div><MyComponent/></div>
    )
}
```
*   `<MyComponent/>` 等同於 `<MyComponent></MyComponent>`

* 會在網頁上顯示「你好」

### Root Element 限制

* **return** 內容必須包在單一的 root element 內
* 否則會報錯，例如：

```jsx
return (
    <div>hi</div>
    <div><MyComponent/></div>
)
```

* 這樣會有兩個 root element，會出錯
* 正確做法是包在一個共同的容器內，例如：

```jsx
return (
    <div>
        <div>hi</div>
        <div><MyComponent/></div>
    </div>
)
```

### 簡寫形式

* `<MyComponent></MyComponent>` 可以簡寫為 `<MyComponent/>`
* 兩者是等價的，但要記得後面加 `/` 表示結束

## App 組件與樹狀結構

* App 組件又稱為**根組件** (Root Component)
* 與其他子組件組成樹狀結構
* main.jsx 負責將這個 App 組件渲染到 index.html

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

* `id="root"` 對應到 index.html 裡的這個 `<div id="root"></div>`
* React 會把我們寫的所有 HTML 元素塞到這個 root element 底下，再用 JS 管理這些元素

## 父子關係

* 組件之間有父子關係，例如：

```jsx
function App() {
    return (
        <div>
            <MyComponent/>
            <MyComponent/>
            <MyComponent/>
        </div>
    )
}
```

* 會顯示三個「你好」
* 可以看到 App 是父組件，MyComponent 是子組件

## 組件重用

* 組件可以重複使用
* 例如同樣的 UI 可以做成組件，避免重複編寫，減少錯誤機會

## 組件的定義位置

* 不要在另一個組件內定義組件
* 會讓 React 渲染效率變慢，甚至可能會報錯

## 組件拆分到不同檔案

* 一般會將不同的組件拆分到不同檔案，例如：

**MyComponent.jsx**

```jsx
function MyComponent() {
  return <h1>你好</h1>
}
export default MyComponent;
```

* 要記得 `export`，否則無法在其他檔案中使用
* `default` 是當檔案只有一個主要組件時常見的寫法

**App.jsx**

```jsx
import MyComponent from "./MyComponent";

function App() {
  return (
    <div>
      <MyComponent/>
      <MyComponent/>
    </div>
  )
}
export default App;
```

* `./MyComponent` 是相對路徑，`./` 表示同一層資料夾，`../` 表示上一層
* App 組件也需要 `export` 出去，才能在 `main.jsx` 中使用



---


# JSX

### Function Component Structure

```js
function App() {
  return (
    <MyComponent/>
    <MyComponent/>
  )
}
```

前面講到每個組件只能回傳一個元素，這是 JS 的限制，而不是 JSX 的規定。實際上，JSX 裡的每個 HTML element 或 component 都是 JS 物件，因此 JS function 不能同時回傳多個物件。

所以當需要回傳多個元素時，必須用一個單一 (根) 元素包起來：

```js
function App() {
  return (
    <div>
      <MyComponent/>
      <MyComponent/>
    </div>
  )
}
```
這種作法會出現一個問題是多加的 `<div>` 會被視為DOM裡的結構。

### Fragments

如果不想要產生多餘的 `<div>` 結構，可以用空標籤 (Fragment) 包住元素，這樣就不會影響 DOM：

```js
function App() {
  return (
    <>
      <MyComponent/>
      <MyComponent/>
    </>
  )
}
```

Fragment 也是一種 JS object，用來避免不必要的 DOM 包裝。

### JSX 語法要點

* `return` 後的內容建議用 `()` 包起來，避免縮排問題。
* JSX 可以在 HTML 標籤內寫 JavaScript，例如變數、函式或屬性。
* 空元素需要閉合，也就是JSX中所有的標籤都一定要有開頭和結束 例如：

  * HTML: `<input type="text">`
  * JSX: `<input type="text" />`

  HTML 的某些元素會不需要結束標籤是因為瀏覽器會自動補上。

### 屬性 (Attributes)

* 屬性要用 `{}` 包起來才能使用 JS 變數，這點在後面的其他概念也是，用到 JS 語法時通常都需要用 `{}` 包住來和 HTML 文字做區隔。

例如：

```js
const text = "input";
<input type="text" placeholder={text} />
```

* 注意有些屬性名稱和HTML中的不同，例如：

  * `class` => `className`
  * `for` => `htmlFor`
  * CSS style: `background-color` => `backgroundColor`

  這是因為 React 會用到這些關鍵字

### Inline Styles

* 可以用 JS 物件定義 CSS 樣式：

```js
<h1 style={{color: 'red'}}> hi </h1>
```

這裡外層的 `{}` 是用來表示這是 JS 語法，裡面的 `{color: 'red'}` 是 JS object 。

### Event Handling

* 可以直接在標籤上綁定事件：

```js
<button onClick={() => alert("hello")}> 按鈕 </button>
```

在 React 中的 event 名稱都是 on 開頭的，這是為了區分 HTML 和 React event 。

* 也可以把 handler 獨立成 function：

```js
const handleClick = () => {
    alert("hello");
}
<button onClick={handleClick}>按鈕</button>
```

* handler 可以回傳 `event` 物件：

```js
const handleClick = (e) => {
    console.log(e);
}
```

* 記得不要加括號，不然會直接執行：

```js
<button onClick={handleClick} />  // 正確
<button onClick={handleClick()} />  // 錯誤

```
這裡加了括號就變成是直接呼叫函式，而真正的 handler 變成 handleClick 回傳的值。 如果不加括號就是傳函數的reference，handler就會是我們要的函數。


前面有用到箭頭函式所以這邊複習一下語法:
```js
const 函數名稱 = 參數 => {執行內容}
```
這裡的參數如果兩個以上就需要用 `()` 包起來，一個就不需要，如果沒有參數就寫空的括號。




---


## JSX 編譯過程

React 處理 JSX 的方式是會先把 JSX 轉成純 JavaScript 再去渲染。



1. **JSX 轉換**

   * JSX 在編譯時會被轉換成等價的 JavaScript 函數 `React.createElement()`。
   * 範例：

   ```jsx
   function MyComponent() {
     return <h1>Hello, World!</h1>;
   }
   // 轉換後：
   function MyComponent() {
     return React.createElement("h1", null, "Hello, World!");
   }
   ```

2. **React.createElement()**

   * `React.createElement()` 會返回一個純 JavaScript 物件，這個物件就是 **虛擬 DOM (Virtual DOM)**。
   * 範例：

   ```js
   {
     type: "h1",
     props: {
       children: "Hello, World!"
     }
   }
   - 虛擬 DOM 物件描述了 UI 的結構，但還不會更新到瀏覽器上。

   ```

3. **ReactDOM 處理流程**

   * 當呼叫 `ReactDOM.createRoot().render()` 的時候，會進行 DOM 更新，主要流程如下：

     1. **初始化渲染**

        * 第一次呼叫 `ReactDOM.createRoot().render()` 時，會根據 JSX 產生初始的虛擬 DOM。
     2. **虛擬 DOM 更新**

        * 當 `state` 或 `props` 改變時，React 會根據新的 JSX 生成新的虛擬 DOM。
     3. **Diffing**

        * React 會拿舊的（和當前網頁結構相同的）虛擬 DOM 和新的虛擬 DOM 做比較，看哪些節點有變化。
     4. **Batch Update**

        * React 不會立刻更新 DOM，而是把所有變化打包起來一次更新，減少 DOM 操作量。
     5. **真實 DOM 更新**

        * 將變更套用到真正的 DOM 上，並更新舊的虛擬 DOM 以便之後的比較。



---


# JSX 中的陣列

在 JSX 中可以處理物件或組件的陣列。

### 基本範例

```jsx
function App() {
  const listItems = [
    <MyComponent/>,
    <MyComponent/>,
    <MyComponent/>
  ];
  return (
    <>
      {listItems}
    </>
  )
}
```

在這個範例中，`listItems` 是一個包含三個 `MyComponent` 組件的陣列，透過 `{}` 包起來就可以在 JSX 中渲染出來，不一定要在 return 後面才可以寫JSX。

### Key 屬性

如果直接這樣寫會看到以下警告：

```
Warning: Each child in a list should have a unique "key" prop.
```

這是因為React需要key屬性來精準定位每個元素，增加渲染效率。

可以透過增加 `key` 屬性來解決：

```jsx
const listItems = [
  <MyComponent key="0"/>,
  <MyComponent key="1"/>,
  <MyComponent key="2"/>
];
```

### 使用 map() 產生陣列

另一種更常見的做法是使用 `map()` 來產生組件陣列：

```jsx
const listItems = [
  {content: "one", id: 1, key: "0"},
  {content: "two", id: 2, key: "1"},
  {content: "three", id: 3, key: "2"}
];

return (
  <>
    {listItems.map((item) => {
      return <div key={item.key}> {item.content} </div>
    })}
  </>
);
```
map 可以想成是陣列的轉換，會把陣列內的每個元素值轉換成 return 出來的東西。 在這裡就是將每個物件轉換成 HTML 的樣子

這樣寫會對每個 `listItems` 裡的物件產生對應的 `<div>`。

### 使用 filter() 過濾陣列

可以用 `filter()` 過濾掉不需要的元素：

filter 的邏輯是 callback function 如果回傳 `true` 就會保留資料，回傳 `false` 或沒有回傳值就是不保留資料。

```jsx
const filteredItems = listItems.filter((item) => item.content !== "two");

return (
  <>
    {filteredItems.map((item) => {
      return <div key={item.key}>{item.content}</div>
    })}
  </>
);
```

這樣會只顯示 "one" 和 "three"， `content` 是 "two" 的元素會被過濾掉。

### 注意事項

* **key 必須是唯一的**：確保每個 `key` 都是唯一的，否則 React 會無法正確追蹤元素變化。實務上通常會拿來對應到資料庫內的某個唯一`id`。

* **不能直接 return 陣列**：

```jsx
return(
  {filteredItems}
)
```

這樣寫是不行的，因為 `filteredItems` 是物件陣列而不是 JSX。

* **避免使用 index 當作 key**：在可能會有元素新增或刪除的情況下，直接用 `index` 當 `key` 可能會導致 React 無法正確追蹤元素變化。


---


## React 裡面的條件判斷

在 React 中經常會需要根據某些條件來決定是否顯示某個元素，這通常可以透過 `if-else`、三元運算子或 `&&` 來實現。

### 1. if-else

最基本的方式是使用 `if-else`。可以注意的是 `return` 會提前結束函數可以後面的 `else` 有時候不寫也可以。

```jsx
function App() {
  if (true) {
    return <h1>Hello</h1>;
  }
  else return <h1>World</h1>;
}
```

這樣的寫法會根據條件回傳不同的 JSX 元素。因為 `return` 後會結束函數執行，所以這裡的 `else` 刪掉也會有一樣的結果。

### 2. 三元運算子 (Ternary Operator)

JSX 可以直接使用 JavaScript 本來就有的三元運算子，這對於需要根據條件動態展示不同內容時很方便。

```jsx
function App() {
  const condition = true;
  return (
    <div>
      {condition ? <h1>true</h1> : <h1>false</h1>}
    </div>
  );
}
```

**語法**：

```
條件 ? true 時的結果 : false 時的結果
```

這種寫法在需要根據條件設定 `className` 或其他屬性時也很好用：

```jsx
function App() {
  const isActive = true;
  return (
    <div className={isActive ? 'active' : 'inactive'}>
      {isActive ? 'Active' : 'Inactive'}
    </div>
  );
}
```

### 3. 多個 class 切換

如果有部分的 CSS 需要固定保留，可以結合字串和條件來實現：

```jsx
<div className={isActive ? 'a c' : 'b c'}>
```

或者用 **Template Literals** (反引號字串) 來組合：

```jsx
<div className={`c ${isActive ? 'a' : 'b'}`}></div>
```

這裡面的語法是`字串內容 ${變數或表達式}`，可以混合字串和表達式( 用`${}`括起來 )

### 4. 使用 && (Logical AND)

`&&` 是另一個常見的條件判斷方式。JS 和 Python 的 `&&`運算比較特別，實際回傳的是最後一個truthy或第一個falsy。

```jsx
function App() {
  const showMessage = true;
  return (
    <div>
      {showMessage && <h1>Hello</h1>}
    </div>
  );
}
```

這樣的寫法只會在 `showMessage` 為 `true` 時展示 `<h1>Hello</h1>`。


這幾種條件判斷方式在 React 中都很常見，可以根據需求選擇使用。通常在處理簡單的條件時會用 `&&` 或三元運算子，比較複雜的情況則可能需要拆分函數或引入其他邏輯處理。


---


# props

`props` 是 `properties` 的簡寫，用來將父組件的資料傳遞給子組件。

### 基本用法



```jsx
function MyComponent(props) {
  console.log(props);
  return <div>{props.a}</div>
}

function App() {
  return (
    <>
      <MyComponent a="hello" />
    </>
  )
}
```

* 這裡的 `MyComponent` 接收到了一個 `props`，其中包含父組件 `App` 傳遞的屬性 `a`。
* 雖然 `props` 是慣用名稱，但可以用其他名稱，只是 `props` 比較常見。

### 多個屬性

可以一次傳多個屬性而只需要用一個 `props` 接收就好，可以把`props` 想成是一個打包好所有要傳的東西的物件。

```jsx
function MyComponent(props) {
  console.log(props);
  return (
    <>
      <div>{props.a}</div>
      <div>{props.b}</div>
    </>
  )
}

function App() {
  return (
    <>
      <MyComponent a="hello" b="你好" />
    </>
  )
}
```

* `props` 是一個物件，包含父組件傳遞的所有屬性，可以包含任意資料類型。

### 解構賦值

* 因為 `props` 是物件，可以用解構賦值來簡化寫法。

範例 3:

```jsx
function MyComponent({a, b}) {
  return (
    <>
      <div>{a}</div>
      <div>{b}</div>
    </>
  )
}
```

* 物件的解構賦值是根據屬性名稱取值，因此順序不重要。
* 另外可以設定預設值，例如：

```jsx
function MyComponent({a, b="hihi"}) {
  return <div>{a} - {b}</div>
}
```

* 如果 `b` 沒有傳遞，會使用預設值。

### 單向數據流

* `props` 只能從父組件傳到子組件，無法反向傳遞。
* 這是 React 的設計理念之一，確保數據流是單向的，減少錯誤。

### 傳遞組件

* `props` 不僅可以傳遞資料，還可以傳遞組件。

範例 4:

```jsx
function SecondComponent() {
  return <h1>Hello</h1>
}

function MyComponent({children}) {
  return <>{children}</>
}

function App() {
  return (
    <>
      <MyComponent>
        <SecondComponent />
      </MyComponent>
    </>
  )
}
```

* 外部組件 (`MyComponent`) 會把內部的組件 (`SecondComponent`) 當作 `children` 屬性處理。
* 在 App 內的寫法等價於這樣：

```jsx
<MyComponent children={<SecondComponent />} />
```

* 雖然可以直接使用 `children` 屬性來指定內部的組件，但第一種寫法更常見且更直觀。


---


# state

可以先看一下這個例子:

```jsx
function MyComponent() {
  let clicks = 0;
  const handleClick = () => {
    clicks++;
    console.log(clicks);
  };
  return (
    <>
      <button onClick={handleClick}>點擊次數: {clicks}</button>
    </>
  );
};
```

* 會發現點按鈕以後畫面上的點擊次數不會改變，但 console 裡的 `clicks` 變數是有改變的。
* 這是因為 button 沒有重新渲染 (render)。

### 為什麼需要 state？

在 React 中，一般的變數發生變化並不會觸發網頁（HTML 元素）重新渲染。

為了讓元件根據變數的變化自動重新渲染，需要使用 **state**。

### useState() 的基本用法

* 要使用 state，需要使用 `useState()` 這個 hook。

* `useState()` 會回傳一個**陣列**，包含兩個元素：

  1. **state 的內容**（變數）
  2. **用來更改 state 內容的 function**（通常習慣以 `set` 開頭）

* 基本語法：

```jsx
import { useState } from 'react';

function MyComponent() {
  const [clicks, setClick] = useState(0);  // 初始值為 0

  const handleClick = () => {
    setClick(clicks + 1);
  };

  return (
    <>
      <button onClick={handleClick}>點擊次數: {clicks}</button>
    </>
  );
};
```

* 這樣 `clicks` 被改變時會觸發 `setClick`，React 就會知道需要re-render。

### 注意事項

* React 偵測 state 有變化是透過監聽 `setState` ，當`setState`被呼叫了 React 才會去檢查 state 是否有變化來去呼叫 re-render 。
* **不要**直接改變 state（例如 `clicks++`），這樣 React 因為沒觸發 `setState` 所以不會察覺到變化，可能會有資料不同步的問題。
* `useState()` 是陣列的**解構賦值**，所以順序很重要：

```jsx
const [state, setState] = useState(初始值);
```

第一個參數一定是 `state` ，第二個一定是 `setState`。

* **不同組件的 state 是分開的**，不會互相影響。

### State 和 re-rendering

React 的渲染分為兩種：

1. **Initial Rendering** - 初次渲染，第一次將 JSX 轉換為 HTML。
2. **Re-rendering** - 重新渲染，根據 state 的變化再次轉換 JSX。

* React 會在偵測到 state 改變時進行 re-render，並只更新有變化的部分，這部分是用虛擬DOM來做到的，前面講JSX的處理有稍微提到。

### 將 state 傳遞給子元素

```jsx
function ChildComponent({ clicks }) {
  return <div>{clicks}</div>;
}

function MyComponent() {
  const [clicks, setClick] = useState(0);
  const handleClick = () => {
    setClick(clicks + 1);
  };

  return (
    <>
      <button onClick={handleClick}>點擊次數: {clicks}</button>
      <ChildComponent clicks={clicks} />
    </>
  );
}
```

* 可以將 `clicks` 傳遞給子元件 `ChildComponent`，並根據 state 改變進行同步更新。

```jsx
function App() {
  return(
    <>
      <MyComponent/>
      <MyComponent/>
      <MyComponent/>
    </>
  )
}
```
就算去使用多組同樣的組件，彼此也能夠獨立分開，不同的 MyComponent 之間不會互相影響到。

### Two-way Binding

* 當 UI 改變時，state 也會跟著改變。
* 當 state 改變時，UI 也會跟著更新。

像這裡的 button 記數就算是 Two-way Binding 的作法

### state 傳遞的限制

如果要傳遞 state 需要確保 state 的宣告在所有會用到該 state 的組件之上，這樣才不違反上往下傳的單向數據流。

* 如果將全部的 state 宣告在最上層的 `App()` 中，雖然可以確保所有組件都能讀取到，但會造成結構複雜，而且為了傳遞有些組件會拿到根本用不到state。這種情況稱為 **Props Drilling**。
* **盡量將 state 宣告在適當的位置**，避免組件接收到過多沒用的 state。