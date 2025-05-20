

# React Hook

## 簡介

Hook 是 React 16.8 的新功能，讓原本一些只有 class component 可以用的功能 (state, lifecycle 等)，變成可以用 function component + Hook 實現。

Hook 本質上就是一種特殊的 JS 函數，主要目的是把 state、lifecycle 功能掛接到 function component 上，讓 function component 有和 class component 一樣的能力。

### 主要的目的:

1. **簡化 component 邏輯**: class component 的邏輯比較複雜

   * 用 Hook 更好做 state 和 side effect 的管理，程式碼會更簡潔
2. **減少重複邏輯**: 重複使用的邏輯可以封裝成自訂 Hook，減少程式碼的重複
3. **提高可測試性**: function component 比 class 更容易測試
4. **增加可讀性**: 語法比 class 的寫法更簡單直觀
5. **不用處理 this 的綁定問題**: function component 不用處理 this 的綁定問題

### 常見的 Hook

* `useState`
* `useEffect`
* `useRef`
* `useContext`
* `useReducer`
* `useCallback`
* `useMemo`

也可以自定義 Hook 來用

## React Hook 的一些限制

1. 只能在 function component 或是自定義的 Hook 中使用，不能隨便在一般 JS function 中使用。
2. 只能在 function component 最上層直接呼叫，不能在條件式、迴圈、巢狀函式裡呼叫 Hook 。

   * 這樣設計是為了保證每次 render 時呼叫 Hook 的順序不變
3. 名稱都要以 `use` 開頭，自訂的也一樣。

   * 這是 React 用來辨識 Hook 的關鍵

## 關於 Hook 的底層邏輯

### Hook 的閉包 (Closure) 機制

React 底層是透過一種叫做 **Fiber** 的資料結構來實現狀態保存。
每個 component 的 state 會被保存在對應 Hook 的 Fiber 節點裡面。

每次 component re-render 時，整個 function component 會重新執行。

* Hook 可以透過 Fiber 節點找到之前的狀態，達到儲存狀態的效果。

### 每個 Hook 都是一個 Fiber 節點

簡化的結構大概是長這樣，每一種 Hook 的結構會有不同 :

```js
{
  memoizedState: any,     // 當前的狀態值
  baseState: any,         // 上一次的狀態值
  queue: UpdateQueue,     // 儲存 setState 的變更
  next: Hook | null       // 指向下一個 Hook
}
```

可以看到他有 `next`，這是因為 Hook 是透過 linked list 儲存的

* 這意味著 search time 為 O(n)，但通常不會頻繁進行搜尋所以影響不大。
* 效能上的影響沒有那麼嚴重，但還是要避免過多 Hook 造成不必要的性能問題。


---


# React Hook - useState

## 簡介

`useState` 是 React 最基本的 Hook，主要用來在 function component 中管理狀態。

hook 使用前都要先 import：

```js
import { useState } from "react";
```

需要指定 import 什麼函式，不能把整個 "react" 都 import 

基本語法：

```js
const [state, setState] = useState(initialState);
```

* **state**: 當前的狀態值
* **setState**: 用來更新狀態的函數

  * 每次 `setState` 被呼叫並且 state 改變時，React 會觸發 component 的重新渲染 (rerender)
  * 在 function component 中，整個 function 都會重新執行，除了 state 之外的變數會被重置
* **initialState**: 初始狀態，只有第一次 render 的時候會用到

  * 可以是任何值（數字、字串、物件、陣列、`null` 等），也可以是返回初始值的函數

## 基本特性

### 1. 多個 useState

* 同一個 component 可以有多個 `useState`
* 它們是彼此獨立的，不會互相干擾

```js
function ExampleWithManyStates() {
  const [age1, setAge1] = useState(1);
  const [age2, setAge2] = useState(1);
  const [age3, setAge3] = useState(1);
}
```

### 2. 非同步更新 (Batching)

* 狀態更新是非同步的
* React 會將同一個 event handler 內的多次 `setState` 合併為一次 re-render（稱為 **batching**）
* 每次 component re-render 時，整個 function 會完整執行一次，不會因為 `setState` 提前結束

```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

* 上面範例中，即使有三次 `setCount`，React 只會 rerender 一次
* 但是因為 `setState` 是非同步的，所以每次都會拿到舊的 `count` 值，這個後面會講到

### 3. 避免無窮 rerender

* 不要在 component body 中直接呼叫 `setState`
* 只在 event handler 或 `useEffect` 中改變 state

### 4. 初始狀態是 lazy evaluated

* `initialState` 可以是一個函數，只有在第一次 render 時會執行
* 可以用來避免不必要的計算

```js
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    console.log("Calculating initial state...");
    return expensiveCalculation();
  });
  return <div>Data: {data}</div>;
}
```

### 5. 使用物件或陣列作為 state

* 常常會需要用物件或陣列來存放複雜的狀態
* 注意：React 是透過 reference 來判斷 state 是否改變，所以 setState 的寫法通常會像下面這樣複製一份再改不同的點，才會和原本物件的reference不同

```js
import { useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({
    name: "Alice",
    age: 25,
    location: "Taipei",
  });

  function updateLocation() {
    setUser({
      ...user,
      location: "Kaohsiung",
    });
  }

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Location: {user.location}</p>
      <button onClick={updateLocation}>Move to Kaohsiung</button>
    </div>
  );
}
```

*  `...user` 是使用 **spread operator** 來複製當前的 state，然後覆蓋要改變的部分

### 6. `setState` 參數的兩種寫法

* **直接傳新值**:

```js
setCount(count + 1);
```

* **傳遞函數**:

```js
setCount((prev) => prev + 1);
```

* **函數寫法的優點**:

  * 可以正確處理異步狀態更新
  * 避免 race condition

```js
// 直接傳值
setCount(count + 1);
setCount(count + 1); // 只會加 1

// 傳遞函數
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // 正確加 2
```

* 通常會優先考慮函數寫法，因為它可以確保在一次 render 週期內拿到最新的 state 值
* 用函數寫法會延遲執行，等到 re-render 前才會去計算，所以能夠拿到最新的 state 值。直接傳 state 的寫法會先計算好把結果存起來，所以只會拿到舊的 state 值


---


# useEffect

在 React 的 component 中，render 過程不應該直接執行會產生 side effect 的行為，例如資料讀取 (data fetching)、定時器 (timer)、或是訂閱 (subscriptions) 等。這些行為應該放在 Effect Hook 裡面處理，以確保 component 的邏輯清晰並減少潛在問題。

## Side Effect 是什麼？

Side effect 是指對 component 本身以外的環境造成影響的行為，例如：

* 資料讀取 (data fetching)
* DOM 操作 (直接修改 DOM)
* 設定 event listener
* 瀏覽器 API (localStorage, cookie, URL 參數)

這些行為通常會改變外部系統的狀態或影響其他 component，因此需要謹慎處理。

這些會影響外部的行為不能在 render 期間執行，因為 React 不保證 component render的順序，如果順序改變會影響執行結果的話render的結果會變得不可預測。所以這些會有 side effect 的行為需要另外處理。

### 為什麼要用 Effect Hook 處理 Side Effect？

1. **避免不必要的重複執行**

   * 可以控制 effect 的觸發時機，減少不必要的重新執行。

2. **避免 Memory Leak**

   * 可以在 component 卸載 (unmount) 前清除已註冊的資源，例如 timer 或 event listener。

3. **保證 State 一致性**

   * 可以確保讀到的 state 是最新的，避免 race condition。

### 適合用 Effect Hook 的情況

* Data fetching
* DOM 操作
* Timers
* 外部狀態同步 (storage, cookie, URL)
* 需要清除的資源 (subscriptions, event listeners)

## 使用方法

`useEffect` 接收兩個參數：Effect function 和 dependency array。

```js
useEffect(effectFunction, dependencyArray);
```

### Effect Function

* 通常用箭頭函數定義
* 執行時間是在 render 完成後
* 可以選擇回傳一個清除資源 (clean-up) 的函數

### Dependency Array

用來控制 effect function 什麼時候執行。

1. **空陣列 `[]`** - 只在初次 render 時執行。

```js
useEffect(() => {
  console.log('Initial render');
}, []);
```

2. **沒有 dependency array** - 每次 render 都會執行。

```js
useEffect(() => {
  console.log('Every render');
});
```

3. **裡面放 state / prop 的陣列** - 只有在指定的 state 或 prop 有改變時才會執行。

```js
useEffect(() => {
  console.log('Name changed');
}, [name]);
```

如果陣列內放多個元素，其中任何一個改變都會執行。

### Effect 的執行時機

* Effect function 會在 DOM 更新完成 (layout 和 paint) 後才執行。
* 這樣的設計是為了避免 block 掉瀏覽器的畫面更新。

所以有可能會出現已經看到畫面了卻又突然有值改變的情況，這樣就可以考慮用另一個會先執行完再顯示瀏覽器畫面的hook。


**需要更早執行的情況**

如果需要在 DOM 改變後立刻執行，例如計算 layout 時，可以使用 `useLayoutEffect`。

```js
useLayoutEffect(() => {
  console.log('Layout calculation');
});
```

但這樣會阻塞畫面渲染，如果執行時間需要很長的話不建議使用。

## 清理 Effect (Clean up)

* 在 component unmount 或重新執行 effect 之前，需要清除先前建立的資源，例如 timer ID 或 subscription。
* 只應該清除自己建立的資源，避免影響其他 effect。

```js
useEffect(() => {
  const subscription = props.source.subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```



* 如果 effect 沒有和 component 外部有連結，例如只是單純改變 state，就不需要清除。

## 多個 Effect

* 可以在同一個 component 中使用多個 `useEffect` 處理不同的 side effect。

```js
useEffect(() => {
  console.log('Effect 1');
}, []);

useEffect(() => {
  console.log('Effect 2');
}, []);
```

這樣的寫法可以讓每個 effect 更加獨立，方便維護。



---



# useContext

## Context 簡介

在 React 中，當 component 之間需要共享資料時，如果一層層傳遞 props 會很麻煩，很多component會收到自己根本用不到的東西，這種現象被稱為 **props drilling**。Context 可以解決這個問題，讓資料可以在整個 component tree 中共享，常見的應用包括：

* User Info (使用者資訊)
* Theme (主題)
* Localization (語言選擇)
* Auth State (認證狀態)

`useContext` 是一個 hook，可以讓 function component 直接存取 Context 資料，而不需要手動定義 Consumer component。

---

## 建立 Context

要使用 Context，首先需要建立一個 Context 物件，通常會用 `React.createContext()`：

```js
import { createContext } from "react";

// 建立 Context 物件
const MyContext = createContext("defaultValue");
```

* `createContext()` 會回傳一個 Context 物件，會包含 `Provider` 和 `Consumer` 兩個 component。
* `defaultValue` 是當 component 沒有被包在 `Provider` 內時使用的預設值。
* 以前一定要用 `Consumer` 才能拿到 Context，但現在大部分情況會直接用 `useContext`的 hook 取得資料，使用起來更簡單。

---

## 提供 Context 值 (Provider)

要讓 Context 在 component tree 中傳遞，需要使用 `Provider`。

```js
import { createContext } from "react";

// 1. 建立 Context 物件
const MyContext = createContext("defaultValue");

function App() {
  const value = "Hello from Provider";

  // 2. 使用 Provider 提供 Context 值
  return (
    <MyContext.Provider value={value}>
      <ChildComponent />
    </MyContext.Provider>
  );
}
```

### Provider 說明：

* **Context 範圍**: Provider 建立了一個 Context 範圍(從 Provider 的開始到結束標籤內)，範圍內的 component 可以存取到 Provider 提供的值。
* **Value Prop**: 透過 `value` prop 設定要共享的資料。
* **Context 範圍的限制**: 範圍外的 component 只能讀到 `defaultValue`，因為 Context 資料是自上而下傳遞的。

---

## 使用 Context (useContext)

使用 `useContext` 來存取 Context 值。

```js
import { useContext } from "react";

function ChildComponent() {
  const contextValue = useContext(MyContext);
  return <p>{contextValue}</p>;
}
```

### `useContext` 說明：

* **自動追蹤**: React 會自動追蹤 Context 的變化，每當 `Provider` 提供的值更新時，使用這個值的 component 都會重新 render，這個就叫做訂閱。
* **Subscription 機制**: `useContext()` 可以視為對 Context 的訂閱 (subscribe)，當 Provider 更新值時，自動通知所有使用這個 Context 的 component 要進行 re-render 。
* **效能問題**: 如果 `Provider` 經常更新，會導致大量 re-render，可以透過 `useMemo` 或其他最佳化技術來減少不必要的 render。

---

## Context 的範圍

* **多個 Provider**: 可以在同一個 component tree 中使用多個 Provider，只要範圍不重疊就不會互相干擾。
* **巢狀 Provider**: 如果 Context 是巢狀的，內層的 Provider 會覆蓋外層的 Context 值。意思就是 Consumer 會從內往外找第一個Provider的值用，沒有就用default值。
* **效能考量**: 每當 `Provider` 更新時，範圍內所有的 `useContext` consumer 都會重新 render，要小心效能問題。



---



# useMemo

React 的 component 是 declarative 的，如果計算內容複雜時每次 re-render 都會造成負擔。這種時候就可以用 `useMemo` 減少不必要的計算。

### 緩存計算結果

`useMemo` 是一個用來記住計算結果的 hook，只有在 dependency 改變時才會重新計算，避免重複計算。

### 基本語法

```js
import { useMemo } from "react";

const memoizedValue = useMemo(effectFunction, dependencyArray);
```

* **Effect function**：要回傳想要記住的計算結果的函數。
* **Dependency array**：用來決定什麼時候重新計算，和 `useEffect` 的概念類似。當陣列內的任一元素改變時，`useMemo` 都會重新執行 effect function。 

如果沒有放 dependency array，就等於沒用 `useMemo`，所以基本上一定要放兩個參數。

在 re-render 時，只有在 dependencies 改變的情況下才會執行 effect function，否則會直接使用緩存的結果，避免重複計算。

### 範例

**沒用 useMemo 的情況**：

```jsx
import React, { useState } from "react";

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveValue = (() => {
    for (let i = 0; i < 1000000000; i++) {} // 模擬昂貴計算
    return count * 2;
  })();

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>增加 Count</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入文字"
      />
    </div>
  );
}

export default ExpensiveComponent;
```

這段程式碼中有兩個 state：`count` 和 `text`，其中 `count` 是很複雜的計算。在這個 component 中，就算只有 text 改變，都會導致整個 component re-render， 讓count要重新計算、造成浪費。

**使用 useMemo 的情況**：

```jsx
import React, { useMemo, useState } from "react";

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 用 useMemo 包起來
  const expensiveValue = useMemo(() => {
    console.log("🔄 計算...");
    for (let i = 0; i < 1000000000; i++) {} // 模擬昂貴計算
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>增加 Count</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入文字"
      />
    </div>
  );
}

export default ExpensiveComponent;
```

在這個版本中，`useMemo` 把 count 複雜的計算獨立出來，只在 `count` 改變時才會重新計算，text改變造成的 re-render 就不會重算 count 的部分。

### 注意事項

* `useMemo` 的 effect function 會在 **render 期間執行**，因此不能執行會產生 side effect 的計算。
* **不要過度使用 `useMemo`**，如果 dependency array 中有大量 state 或 object，比對也會造成額外的開銷。



---


# useCallback

基本概念和 `useMemo` 相似，都是為了避免不必要的重複計算。

* **`useMemo`**：記住計算結果。
* **`useCallback`**：記住 function 本身。通常是為了避免 function 被重作導致子 component 跟著re-render

## 基本語法

```jsx
import { useCallback } from "react";

const memoizedCallback = useCallback(
  callbackFunction,  // 需要記住的函式
  dependencyArray    // 什麼時候重新生成函式
);
```

第一個參數是要記住的 callback function，第二個參數是 dependency array，用來決定什麼時候重新生成 function。

## 使用範例

### **沒有使用 `useCallback` 的情況**

```jsx
import React, { useState } from "react";

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 每次 ParentComponent re-render 都會生成一個新的 handleClick function
  const handleClick = () => {
    console.log("Clicked!");
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加 Count</button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
}

function ChildComponent({ handleClick }) {
  console.log("ChildComponent render");
  return <button onClick={handleClick}>Child Button</button>;
}

export default ParentComponent;
```

* **問題**：

  * 每次 `ParentComponent` 改變 state 時，`handleClick` 都會被重新生成，重新生成以後內容雖然一樣但 handleClick 的 reference 不同 。
  * 導致接收 handleClick 的 `ChildComponent` 也會做不必要的 re-render。

### **使用 `useCallback` 的情況**

```jsx
import React, { useState, useCallback } from "react";

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 用 useCallback 包起來
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // dependency array 為空，只在第一次 render 時生成一次

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加 Count</button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
}

function ChildComponent({ handleClick }) {
  console.log("ChildComponent render");
  return <button onClick={handleClick}>Child Button</button>;
}

export default ParentComponent;
```

* **效果**：

  * 只在第一次 render 時生成 `handleClick`。
  * 後續的 re-render 不會重新生成 function，減少不必要的計算。

## **注意事項**

* `useCallback` 只會影響指定的 function，其他 state 或 props 改變時仍然會 re-render。
* **Memory Cost**：

  * `useCallback` 會保留 function 直到 component unmount，會占用記憶體。
* **Performance**：

  * 如果 dependency 頻繁變化，可能比直接寫 function 還慢。
* **實際應用**：

  * 不要過度使用，只在確定能提升效能時才使用。


---


# useRef

### 常見的用途

1. 存取 DOM 元素
2. 儲存 component 生命週期內的可變變數 (ex: timer 的 id, 前一次的狀態等)

---

### 基本語法

```js
import { useRef } from "react";

function MyComponent() {
  // 建立一個 ref 物件
  const myRef = useRef(initialValue);

  // 取得 ref 物件的當前值
  console.log(myRef.current);

  return <div ref={myRef}>Hello</div>;
}
```

* `useRef()` 回傳一個 ref 物件，這個物件只有一個 `.current` 屬性，可以用來存任何值。
* 可以指定 `initialValue` 作為初始值，`useRef(initialValue)` 就是建立一個初始值為 `initialValue` 的 ref 物件。
* `.current` 可以用來讀取或寫入這個 ref 物件的值。

### 跟 `useState` 的比較

* `useState` 和 `useRef` 的主要差別在於 **state 變化會觸發 re-render**，但 **ref object 不會**。
* 如果想要有一個變數能夠在 component 生命週期內保存，但不會觸發 re-render，就可以選擇 `useRef`。

---

### DOM 元素存取範例

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` 指向目前的 text input element
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

* `ref` 屬性是專門給 `createRef` 和 `useRef` 用的，這樣 `inputEl` 就會是這個 DOM element 的 ref。
* React 在修改 DOM 時會直接從舊的 element 修改，不會重新生成，因此 `inputEl` 會在整個 component 生命週期內維持不變，這樣就不用每次執行都重找一次 element 。

---

### 使用 `useRef` 的優點

1. **避免舊寫法的限制**

   * `getElementById` 和 `querySelector` 是全域搜尋，可能會命名衝突。
   * `useRef` 只會存取自己的 component DOM，不會影響外部。

2. **效能更佳**

   * `useRef` 隨 React 的 virtual DOM 同步變更，避免 UI 不一致的問題。
   * 傳統 DOM 查找在 Concurrent Mode, Suspense, Lazy Loading 下有可能出錯。

3. **初始化效率更高**

   * `getElementById` 每次執行都要重新查找 DOM 元素，而 `useRef` 只會初始化一次，後面就不需要重新查找。

---

### 使用時的注意事項

* 更改 `.current` 屬性算是 **side effect**，應該寫在 `useEffect` 裡面。
* **Side effect 判斷**：如果執行順序會影響結果，就是 side effect，例如 `ref.current` 的更新會影響顯示結果，所以是 side effect 。



---


# useReducer

可以想成是複雜版的 `useState`，把 **狀態如何改變** 和 **觸發狀態改變的事件** 明確分開。

### 主要用途

* 當 state 變化邏輯複雜時，使用 `useReducer` 可以更清晰地管理狀態轉換。
* 常用於需要更細緻控制的狀態，例如表單處理、Redux 風格的全域狀態管理。

### reducer function

reducer function 是一個 **pure function** (純函式)，不應包含 **side effect**，接收兩個參數：

1. **state** - 當前狀態
2. **action** - 觸發變更的動作

**基本結構：**

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
```

這裡的 `reducer` 是根據 `action.type` 決定下一個 `state`，並返回新的 `state` 物件。

### useReducer 語法

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

* **reducer**: 之前定義的 reducer function
* **initialArg**: 初始 arg，可以是任意類型的資料。如果沒有第三個參數，本身就會當作初始值
* **init (optional)**: 初始化函數，不一定要有，如果有就會用 `init(initialArg)` 計算真正的初始值

### 基本範例

```js
import React, { useReducer } from "react";

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default Counter;
```

**流程:**

1. 定義 `action` 物件（例如 `increment` 和 `decrement`）。
2. 定義 `reducer function`，負責處理 `action` 並回傳新的 `state`。
3. 使用 `useReducer` 初始化 state 和 dispatch function。
4. 使用 `state` 渲染畫面。
5. 用 `dispatch` 來觸發 `reducer function`。

### 其他寫法

不一定要用 `switch` 來寫，可以用 object mapping 或 if-else。

```js
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
```

要記得加一個 **default case** 來處理例外狀況，避免 `action.type` 出錯時沒有對應處理。




---


# Custom Hook

Custom Hook 通常是將「可重複使用的邏輯」從 component 中抽離出來的工具。

- 名稱必須以 `use` 開頭，這是為了讓 React 可以辨識它是 hook。
- 和一般函式一樣，可以自訂輸入參數與回傳內容。
- 裡面可以使用其他 hook（例如：`useState`, `useEffect`）。

---

## 適合使用 Custom Hook 的情況：

1. 重複邏輯需要在不同 component 中使用（例如 API request、scroll 等）。
2. component 過於複雜，將邏輯抽離讓 component 更簡潔。
3. 將功能封裝後，更方便測試與維護。

---

##  模板範例

```js
function useXXX(param) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // 執行有副作用的邏輯，例如 API request
  }, [dependency array]);

  return state; // 或其他需要回傳的資料
}
````



###  ex: useToggle.js

```js
import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(v => !v);
  return [value, toggle];
}
```

使用方式就像使用一般 hook 一樣：

```js
const [on, toggle] = useToggle();
```

---

### 常見 Custom Hook 中會用到的 Hook

| 類型    | Hook                             |
| ----- | ----------------------------------- |
| 資料處理  | `useFetchData`, `useWeather`        |
| UI 狀態 | `useToggle`, `useModal`, `useTheme` |
| 事件處理  | `useScroll`, `useKeyPress`          |
| 表單    | `useInput`, `useForm`               |


---



