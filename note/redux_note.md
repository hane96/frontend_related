# Redux

## 基本概念

### 為什麼需要 Redux ?

React 是 UI Library、不是一個框架，React 中 state 的管理是很基本的，只有 useState。

```jsx
const [count, setCount] = useState(0);
```

當程式變得複雜，需要 state 變得很多，就需要一套可以集中管理 state 的機制，Redux 就是為了解決這個問題而生的。

### Redux 是什麼?

Redux 是一種 JS 應用的狀態管理工具，除了 React 也可以用在其他框架(Vue、Angular)或純 JS 中。

Redux 的三個核心原則 (設計理念)

1. Single Source of Truth: 所有的 state 都放在一個 "**唯一的 store**" 中
2. State is read-only: 只能透過 dispatch action 去修改 state，不能直接改
3. Changes are made with pure functions: 每次 state 改變都由 reducer 函式決定怎麼改

這些 state 的變動都可以被預測、追蹤、除錯、測試

### Redux 解決了哪些問題?

1. 多層 component 傳 props 容易 props drilling : 用 useSelector 解決
2. 多個元件共用同一份資料需要 lifting state up，邏輯分散: 集中在一個 store 管理
3. 很多的 useState 容易混亂: 用 reducer 統一管理邏輯
4. 非同步操作、錯誤處理複雜: Redux Toolkit 可以集中處理 async

### Redux 和 Context API

React 中的 Context 實際上不是狀態管理工具，主要的用途是提供資料，不是設計來處理做複雜邏輯或大量更新的。

| 特性     | Context API                    | Redux                  |
| -------- | ------------------------------ | ---------------------- |
| 應用     | 主題、語系、小型資料共享       | 多頁共享資料、大型應用 |
| 資料更新 | Provider 包住 → re-render 全部 | reducer 精準控制       |
| 可擴展性 | 小                             | 大                     |

---

## Redux 的核心架構/概念

### Redux 流程圖

```scss
Component => dispatch(Action) => Reducer接收Action =>
根據邏輯回傳新的state => 更新state => Component re-render
```

可以想像成是一個 unidirection data flow，也是 Redux 架構的關鍵

### Redux 資料流

Redux 的資料流主要有三個角色: `State`、`View`、`Action`

- `State`: 當前元件的資料來源 ex: `useState`
- `View`: 呈現元件狀態的介面 ex:畫面上顯示的 counter
- `Action`: 畫面上觸發的任何事件 ex:使用者輸入、按鈕

大致上的流程:

1. 元件初始化，宣告元件的 initial state
2. 元件的 view 讀取 state，呈現在頁面上
3. 使用者操作 (action)，發出事件
4. 元件收到事件後，針對事件執行邏輯，修改狀態
5. 元件的 view 讀取新狀態呈現在頁面上 (重複步驟 2)

只有單一元件需要用到時資料流會很單純 :

```
 --> View --> Action --> State --> View --> ...
```

但當多個元件需要用同一個 state 時就需要透過 `lifting state up` 去處理，但如果很複雜或分散時就會很難管理、所以才需要 Redux 這種狀態管理工具。

### 核心概念

#### Store

- Redux 應用的 data center
- store 是一個 object，存放整個應用的 state
- 使用 `createStore()` 或 `configureStore()` (Redux Toolkit) 建立
- 只能透過 `dispatch action` 改變它的內容
- 通常一個專案只用一個 `store` ，但這個 `store` 裡面可以有很多個 `slice` (小 reducer 模組) 來分工管理不同資料

```js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: yourReducer,
});
```

#### State

- 儲存在 Store 裡面的資料，不可直接修改
- 類似 useState() 中的那個值
- 只能由 Reducer 回傳新的 state

#### Action

- 描述要做什麼的純物件
- 常見的事件命名方式: `type: "事件類別(或功能)/行為"` ex: `todos/todoAdded`
- 通常至少有一個 `type` 欄位(字串)，事件要傳遞資料時會多一個 `payload`

```js
const action = {
  type: "todos/todoAdded",
  payload: { id: 1, text: "Learning" },
};
```

不會直接去操作 state ，而是透過 `dispatch`(派送)一個 action，來表達要對 state 做什麼改變。

#### Action Creators

- 一個幫忙建立 `action` 物件的 function
- 通常在 Redux 內不會在 Reducer 內寫 action，而是用 action creator 避免重複不斷的 action。

```js
const addTodo = (text) => {
  return {
    type: "todos/todoAdded",
    payload: text,
  };
};
```

在 Redux Toolkit 中不需要手動寫 action creator，`createSlice` 會自動產生這些 function，直接解構使用就可以

#### Reducer

根據不同 action type 去處理不同的 state change function

- Reducer 是一個 **pure function** ，只根據目前的 `state` 和收到的 `action` 去回傳新的 `state` (不可以有非同步或有 `side effect` 的程式)
- 不可以直接修改舊的 state ，要用 immutable 的方式去建立新物件 (要複製一份目前的 state 去更動複製出來的狀態)
- `reducer function` 如果發現收到的 `action type` 找不到對應的邏輯計算，會回傳目前的 state
- Reducer 通常會拆成很多個去處理不同部分的 state

```js
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // Immer 處理了 immutable
    },
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

`Reducer` 的命名來源是因為 reducer function 的行為和 `Array.reduce()` 的 callback 類似

#### Dispatch

- Redux 唯一一個可以傳遞事件的 method
- 當 store 接收到一個 dispatch 時，讓 reducer 去執行狀態更新 (如果配對不到 action 類型，會回傳 store 當前的狀態)

#### Selector

- 一個 function 用來取得 store 內，某部分指定的 state
- 建立 selector function 的好處是當應用程式的規模變大，需要取得相同資料的機會變高，selector 可以避免建立重複的邏輯

在 Redux Toolkit (RTK) 中會使用 `useSelector` 的實務範例:

基本上可以可以這樣比喻

- `store` 是一個倉庫，整體資料來源
- `action` 是領貨單
- `dispatch` 把領貨單送到 store
- `reducer` 是倉庫內部工作的邏輯

主要流程:

1. 初始化
2. 在應用程式內建立一個 store 並初始化 root reducer
3. 初始化 root reducer 的同時，也會初始化內部的 state
4. 當渲染畫面時，會向 store 取得 state 顯示在畫面上，同時會向 store 訂閱這個狀態，當資料更新時可以同步更新畫面上的資料。
5. 資料更新
6. 使用者在畫面觸發事件 ex: 點按鈕
7. 應用程式會將觸發的 action dispatch 到 store
8. store 接收到事件以後開始執行 reducer ，這個 reducer 包含了前一個 state 和所收到的 action
9. reducer 更新 state 並回傳新的 state (符合 immutability)
10. store 會通知所有有訂閱 state 的元件，告訴他們狀態有更新
11. 元件到 store 檢查自己需要的狀態是否有更新
12. 元件如果發現自己所需的 state 有更新時會 re-render ，並顯示最新的資料

---

### Redux Toolkit (RTK)

`Redux Toolkit (RTK)` 是官方推出的 Redux 精簡版和最佳實踐的封裝，是 Redux 的推薦用法

RTK 的特色:

1. `configureStore()`: 包含 `createStore`、整合 `devtools` 和預設 `middleware`
2. `createSlice()`: 自動建立 reducer + actions (不用自己寫 switch 和 action creator)
3. `createAsyncThunk()`: 處理 async 非同步流程簡潔化
4. `immer` 自動處理 immutable: 可以直接在 reducer 內用看起來像是修改 state 的寫法

- 簡化了複雜的程式碼，可以更專注在邏輯本身
- 可維護性、可讀性更好
- 內建功能強大: `middleware`、`devtool`、`thunk`非同步處理都配置好，不用自己設定

---

## 概念 / 語法

在 React 中安裝 Redux

```bash
npm install @reduxjs/toolkit react-redux
```

`RTK` 中包括原版的 redux

### `Actions`

一個 Action 物件一定會有`type` 如果要傳入值會再多一個 `payload`

- 可以用值也可以用 function 寫

```js
//value
const addTodoAction = {
  type: "todos/todoAdded",
  payload: "Buy milk",
};

//function ( action creator )
const addTodo = (text) => {
  return {
    type: "todos/todoAdded",
    payload: text,
  };
};
```

### `Reducers`

依據不同的 action type 去處理不同的 state change function

```js
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  //利用 action.type 決定 state change function
  if (action.type == "counter/increment") {
    //複製時需要做一個 copy 不能直接改
    return {
      ...state,
      value: state.value + 1,
    };
  }
  //沒有對應的 action.type 就回傳原本的 state
  return state;
}
```

### `store` / `configureStore()`

- 建立 store 是通過傳入一個 `Store Configuration Object` (或稱為 `option object` )來創建的
- 在原版的 Redux 中是使用 `createStore()` 加上很多需要寫的設定，RTK 則是用 `configureStore()` 來建立 store ，他做了很多原本該自己寫的設定
- 會有一個 `getState()` 的 method 可以返回當前的 state 值

```js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });

console.log(store.getState());
// {value: 0}
```

- 這裡的 `{ reducer: counterReducer }` 裡面有很多參數，設定整個 store 要怎麼運作

```js
configureStore({
  reducer, // 必填：一個 reducer 函式或 reducer 組成的物件
  middleware, // 選填：中介函式清單（可擴充 dispatch 行為）
  devTools, // 選填：是否開啟 Redux DevTools（預設 true）
  preloadedState, // 選填：預先載入的初始 state
  enhancers, // 選填：額外的 store enhancer
});
```

### `Dispatch`

`store.dispatch()` 是 Redux store 唯一更新 state 的方法，傳入 `action object` 作為參數，會觸發 reducer 內定義好的 function 並更新 state

```js
store.dispatch({ type: "counter/increment" });

console.log(store.getState());
// {value: 1}
```

- `action object` 的參數包含:

```js
const action = {
  type: 'SOME_ACTION',
  payload: <any>,     // 要傳給 reducer 的資料
  meta: <any>,        // 補充資料，不一定進 reducer
  error: <boolean>,   // 代表這是不是錯誤（通常在 async/rejected）
}
```

### `Selectors`

selector 是知道如何從 store 中提取特定 state 訊息的 function，這是當程式規模越來越大時，避免重複的`getState()`邏輯使用的

```js
const selectCounterValue = (state) => state.value;

const currentValue = selectCounterValue(store.getState());
console.log(currentValue);
```

---

## 範例

這邊開始會先以原版 Redux 來做

在開始 redux 專案之前先講情境，假設要做的是一個店家的庫存管理，會有店本身(老闆)、店員、客戶。

- 客戶 -> 買商品
- 店員 -> 處理(買商品)事件 -> 提供商品並減庫存

把這樣的情境轉換到 redux 上面:

| 對象           | Redux   | 功能                   |
| -------------- | ------- | ---------------------- |
| 店本身庫存     | Store   | 紀錄所有陣列的庫存     |
| 買商品         | actions | 紀錄買商品的需求       |
| 店員處理買商品 | reducer | 接到買商品的需求並處理 |

- 這個是 Redux 專案裡常做的檔案分離，主要分為這三個部分。

假設今天要做一個咖啡廳的管理，先定義一個 `initial state`，各個商品預設有 20 份。

```js
{
   numOfCoffee: 20,
   numOfCoffeeBean: 20,
   numOfCake: 20,
}
```

### Actions

以顧客的角度有三種可能的行為，買咖啡、咖啡豆、蛋糕。這邊先只處理購買單一項

我們可以寫出他的 `action` 或 `action creator`:

```js
//action creator
const orderCoffee = () => {
  return {
    type: COFFEE_ORDERED,
    payload: 1,
  };
};

//action object
const orderCoffeeObj = {
  type: COFFEE_ORDERED,
  payload: 1,
};
```

### Reducers

描述以店員的角度收到什麼 action 該做什麼事

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "COFFEE_ORDER":
      return {
        ...state,
        numOfCoffee: state.numOfCoffee - 1,
      };
  }
};
```

如果把前面的概念畫成圖的畫會長這樣:

```
      -- >  JavaScript App  -- >
   ^                             |
   |
Redux Store                   Action
   ^                             |
   |                             |
      ---  >   Reducer    < ---

```

- JavaScript App 不能直接修改 Redux Store 內的 state ，需要透過 dispatch action 叫 reducer 去做

這邊試著做更完整的 Action:

```js
const COFFEE_ORDERED = "COFFEE_ORDERED";

// 用 action creator
const orderCoffee = () => {
  return {
    type: COFFEE_ORDERED,
    payload: 1,
  };
};

// 用 action object
const orderCoffeeObj = {
  type: COFFEE_ORDERED,
  payload: 1,
};

// 透過function也可以帶參數來設定
const orderCoffeeByNum = (num) => {
  return {
    type: COFFEE_ORDERED,
    payload: num,
  };
};
```

`Action` 的 `type` 可以想成是點餐單，定義好單號以後交給 店員(reducer) 處理

再來實做 `Reducer` ，`Reducer` 有幾個原則需要注意:

- 只根據傳入的 `state` 和 `action` 來處理新的 `state`
- 不允許修改現有的 state (immutable)，必須透過複製現有的 state 再對複製的值做更改
- 會需要強制複製是為了避免副作用和為了讓 React 或 RTK 可以用 reference 改變來判斷 state 有沒有更新
- 需要避免 `async function` 造成 side effect

```js
//建立 initial state
const initialState = {
  numOfCoffee: 20,
  numOfCoffeeBean: 20,
  numOfCake: 20,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COFFEE_ORDERED:
      return {
        ...state,
        numOfCoffee: state.numOfCoffee - action.payload,
      };
    default:
      return state;
  }
};
```

### Redux store

再來要建立 Redux Store ， 首先要先引入 redux 到專案當中

```js
const createStore = require("redux").createStore;
```

createStore 是舊的寫法，在 RTK 中會用 `configureStore` 取代，這邊先講舊的。

```js
//建立store
const store = createStore(reducer);

//拿initial state
console.log("initial state: ", store.getState());

//當 state change 時觸發的 callback
const unsubscribe = store.subscribe(() =>
  console.log("更新", store.getState())
);

//試著點餐
store.dispatch(orderCoffee());
store.dispatch(orderCoffeeObj);
store.dispatch(orderCoffeeByNum(2));

unsubsribe();
```

這裡的`subscribe()`可以注意一下，寫這一行時就已經訂閱好了(註冊了一個監聽 state 的 listener )，每當 state 改變都會觸發裡面的 callback function。

他會回傳一個`unsubscribe`的 function ，可以把他理解成是一個寫好的 cleanup function，執行 `unsubscribe()`以後會把這個 listener 清掉

---

## 檔案分離

最基本會照 `store`, `action`, `reducer` 去分離檔案

這邊使用 `module.exports` 和 `require` 來做，這是 `Node.js` 原生的模組系統 ( `CommonJS` ) 的檔案分離語法。 `import`、`export`是 ES6+ 以後才有的東西

### action

這邊做一個 `action` 資料夾，裡面會包括 `action creator` (這裡的 order ) 和 `types`(定義 type 變數)

把 action 的部分放到 `types.js` 中

```js
// types.js
const orderCoffee = () => {
  return {
    type: "COFFEE_ORDERED",
    payload: 1,
  };
};

const orderCoffeeObj = {
  type: "COFFEE_ORDERED",
  payload: 1,
};

const orderCoffeeByNum = (num) => {
  return {
    type: "COFFEE_ORDERED",
    payload: num,
  };
};

module.exports = {
  orderCoffee,
  orderCoffeeByNum,
  orderCoffeeObj,
};
```

- `module.exports` 會傳遞一個物件出去，這個物件可以包含 function、object 等，其他人可以用 `require('檔案路徑')`拿到這個物件，由此達到不同檔案溝通的效果
- 一個檔案只能有一個 `module.exports`

`index.js` 加上這一行拿到檔案傳來的物件

```js
const {
  orderCoffee,
  orderCoffeeByNum,
  orderCoffeeObj,
} = require("./action/order");
```

### 命名/分離 type

前面的 `action object` 中我們都是直接用字串寫，在中大型專案中常會刻意用一個變數來表示 `action type` ，且這些 type 會獨立為一個檔案來存

```js
// /action/type
const COFFEE_ORDERED = "COFFEE_ORDERED";
const COFFEEBEAN_ORDERED = "COFFEEBEAN_ORDERED";
const CAKE_ORDERED = "CAKE_ORDERED";

module.exports = {
  COFFEE_ORDERED,
  COFFEEBEAN_ORDERED,
  CAKE_ORDERED,
};
```

更改原本的 `order.js`:

```js
// /action/order
const { COFFEE_ORDERED } = require("./types/types");

const orderCoffee = () => {
  return {
    type: COFFEE_ORDERED,
    payload: 1,
  };
};

const orderCoffeeObj = {
  type: COFFEE_ORDERED,
  payload: 1,
};

const orderCoffeeByNum = (num) => {
  return {
    type: COFFEE_ORDERED,
    payload: num,
  };
};
```

將 `action type` 用變數來存有很多好處:

- 避免打錯字 (原本的字串拼錯 redux 不會報錯) 方便 debug
- 集中管理所有 `action type`
- 方便重構 (當要改變 `action.type` 名稱時只要從 `type.js` 改就好

### Reducer / combineReducers

一個專案中通常會有很多個 reducer，所以會需要用 redux 內建的 `combineReducers` 把多個 reducer 結合起來

會建立一個 reducer 資料夾放所有的 reducer 和最後結合出來的 combineReducers

- `orderReducer.js`

```js
// reducer/orderReducer
const { COFFEE_ORDERED } = require("../action/types");

const initialState = {
  numOfCoffee: 20,
  numOfCoffeeBean: 20,
  numOfCake: 20,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case COFFEE_ORDERED:
      return {
        ...state,
        numOfCoffee: state.numOfCoffee - action.payload,
      };
    default:
      return state;
  }
};

module.exports = { orderReducer };
```

會開一個 `index.js` 用來存 combineReducers 的結果

- `index.js`

```js
// reducer/index
const { combineReducers } = require("redux");

const { orderReducer } = require("./orderReducer");

const reducers = combineReducers({
  orderReducer,
});

module.exports = {
  reducers,
};
```

先從 redux 拿出 `combineReducers` ，再把要放進來的 reducer 用物件的形式放到 combineReducers 裡面

### store

`store` 資料夾底下通常只會有 index.js

```js
// /store/index
const { createStore } = require("redux");

const { reducers } = require("../reducer");

const store = createStore(reducers);

module.exports = {
  store,
};
```

接收 `combineReducers` 結合出來的 reducers，放進 `createStore` 裡面建立 `store`

### index.js

原本的 `index.js` ，引入 `store`、`action creator`，就可以用 `dispatch(action object)` 和 `getState()` 來操作

```js
const {
  orderCoffee,
  orderCoffeeByNum,
  orderCoffeeObj,
} = require("./action/order");

const { store } = require("./store");

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("更新", store.getState())
);

store.dispatch(orderCoffee());
store.dispatch(orderCoffeeObj);
store.dispatch(orderCoffeeByNum(2));

unsubscribe();
```

執行的結果:

```
initial state {
  orderReducer: { numOfCoffee: 20, numOfCoffeeBean: 20, numOfCake: 20 }
}
更新 {
  orderReducer: { numOfCoffee: 19, numOfCoffeeBean: 20, numOfCake: 20 }
}
更新 {
  orderReducer: { numOfCoffee: 18, numOfCoffeeBean: 20, numOfCake: 20 }
}
更新 {
  orderReducer: { numOfCoffee: 16, numOfCoffeeBean: 20, numOfCake: 20 }
}
```

可以看到 state 裡面多了 key 表示是哪一個 reducer 來的 state

(可以試著把咖啡豆和蛋糕的邏輯寫出來當練習)

#### 結論

- 檔案分為三個資料夾: `store`、`action`、`reducer`
- `action` 通常包含多個 `action creator` 的檔案和 `types`(定義 action.type 的變數)
- `reducer` 通常包含多個 `reducer` 檔案和 `index.js` 把這些 reducer 結合起來
- `store` 通常只有一個 `index.js`，接收 reducer 裡 `index.js` 那個結合完成的 `reducers` ，拿來建立一個 store
- 專案最外層的 `index.js` 拿取 `store` 和 `action creator` 拿來操作

---

### Reducer 拆分

我們再前面的狀態裡面新增一個 assets 代表店的資產，並把購買和販賣的邏輯做出來:

```js
// /reducer/orderReducer.js
const {
  COFFEE_ORDERED,
  COFFEE_RESTOCKED,
  COFFEEBEAN_ORDERED,
  COFFEEBEAN_RESTOCKED,
  CAKE_ORDERED,
  CAKE_RESTOCKED,
} = require("../action/types");

const initialState = {
  numOfCoffee: 20,
  numOfCoffeeBean: 20,
  numOfCake: 20,
  assets: 1000,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case COFFEE_ORDERED:
      return {
        ...state,
        numOfCoffee: state.numOfCoffee - action.payload.qty,
        assets: state.assets + action.payload.income,
      };
    case COFFEE_RESTOCKED:
      return {
        ...state,
        numOfCoffee: state.numOfCoffee + action.payload.qty,
        assets: state.assets - action.payload.pay,
      };
    case COFFEEBEAN_ORDERED:
      return {
        ...state,
        numOfCoffeeBean: state.numOfCoffeeBean - action.payload.qty,
        assets: state.assets + action.payload.income,
      };
    case COFFEEBEAN_RESTOCKED:
      return {
        ...state,
        numOfCoffeeBean: state.numOfCoffeeBean + action.payload.qty,
        assets: state.assets - action.payload.pay,
      };
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCake: state.numOfCake - action.payload.qty,
        assets: state.assets + action.payload.income,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCake: state.numOfCake + action.payload.qty,
        assets: state.assets - action.payload.pay,
      };
    default:
      return state;
  }
};

module.exports = { orderReducer };
```

可以看到 reducer 變得很複雜，所以實務上通常會把 reducer 拆成很多個再用 `combineReducers` 結合起來

- 這邊先將 reducer 按照商品做拆分

```js
// /reducer/coffeeReducer.js
const { COFFEE_ORDERED, COFFEE_RESTOCKED } = require("../action/types");

const initialState = {
  numOfCoffee: 20,
};

const coffeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case COFFEE_ORDERED:
      return {
        ...state,
        numOfCoffee: state.numOfCoffee - action.payload.qty,
      };
    case COFFEE_RESTOCKED:
      return {
        ...state,
        numOfCoffee: state.numOfCoffee + action.payload.qty,
      };
    default:
      return state;
  }
};

module.exports = { coffeeReducer };
```

- 同理也可以拆出 `coffeeBeanReducer` 和 `cakeReducer`
- 拆 reducer 時 initail state 也會被拆開來，state 管理的東西需要不被這個 reducer 以外的其他 reducer 影響

可以注意到這邊少了 `assets` 的部分，是因為大家用的是同一個 `assets`，如果分散寫在不同 reducer 的 state 裡面會有同步問題，因此將 `assets` 獨立為一個 reducer 來管理

```js
// /reducer/assetsReducer.js
const {
  COFFEE_ORDERED,
  COFFEE_RESTOCKED,
  COFFEEBEAN_ORDERED,
  COFFEEBEAN_RESTOCKED,
  CAKE_ORDERED,
  CAKE_RESTOCKED,
} = require("../action/types");

const initailState = {
  assets: 1000,
};

const assetsReducer = (state = initailState, action) => {
  switch (action.type) {
    case COFFEE_ORDERED:
      return {
        ...state,
        assets: state.assets + action.payload.income,
      };
    case COFFEE_RESTOCKED:
      return {
        ...state,
        assets: state.assets - action.payload.pay,
      };
    case COFFEEBEAN_ORDERED:
      return {
        ...state,
        assets: state.assets + action.payload.income,
      };
    case COFFEEBEAN_RESTOCKED:
      return {
        ...state,
        assets: state.assets - action.payload.pay,
      };
    case CAKE_ORDERED:
      return {
        ...state,
        assets: state.assets + action.payload.income,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        assets: state.assets - action.payload.pay,
      };
    default:
      return state;
  }
};

module.exports = { assetsReducer };
```

- 在 `index.js` 做結合:

```js
// /reducer/index.js
const { combineReducers } = require("redux");
const { coffeeReducer } = require("./coffeeReducer");
const { coffeeBeanReducer } = require("./coffeeBeanReducer");
const { cakeReducer } = require("./cakeReducer");
const { assetsReducer } = require("./assetsReducer");

const reducers = combineReducers({
  coffee: coffeeReducer,
  coffeeBean: coffeeBeanReducer,
  cake: cakeReducer,
  money: assetsReducer,
});

module.exports = {
  reducers,
};
```

- `combineReducers` 內的這些 `coffee:` 是 key。 `getState()` 的結果會長這樣:

```
{
  coffee: { numOfCoffee: 20 },
  coffeeBean: { numOfCoffeeBean: 20 },
  cake: { numOfCake: 20 },
  money: { assets: 1000 }
}
```

- `getState()` 後面加`.key名稱` 可以得到指定 reducer 的 state:

```js
console.log(store.getState().coffee);
```

輸出:

```
{ numOfCoffee: 20 }
```

如果真的想要讓 `assets` 分散在不同 reducer 中，我們就需要 `Redux-middleware` 來做到不同 reducer 之間的溝通。

---

## Redux-thunk / middleware

`Redux-thunk` 是其中一種 redux-middleware

安裝套件:

```bash
npm install redux-thunk
```

### Redux middleware

一個框架的 middleware 通常是指可以在某個階段的執行期間插入一段自定義的程式。

而 Redux 的 middleware 是夾在 `dispatch action` 和 `到達reducer` 之間的中間層，可以攔截、修改、延遲或觸發額外的邏輯

- Redux 中的 data stream:

```js
dispatch(action) --> middleware --> reducer --> update state
```

middleware 可以想成是 Redux 的中繼站，可以做:

- 非同步處理 (發 API )
- log 紀錄 (loggeer)
- 條件判斷 (ex: 檢查 aseets 夠才可以下單)
- 派發其他 action

可以注意到上面這些和 **與其他 reducer 溝通** 都是 side effect

但前面有提到 reducer 要是 **pure function** 。

- Reducer 是 pure function 的好處

1. 可預測性高: 只看 action 和舊的 state 就知道新的 state 是什麼
2. 可以 time travel : 可以用 DevTools 回放所有 state 的過程，中間如果有 console.log 或 非同步邏輯會擾亂這個流程
3. 更容易測試: 可以把 reducer 當作 pure function 測試，(丟 action)

**Redux middleware 的特性:**

- middleware 的執行時機由框架決定，我們可以決定的只有 middleware 要執行的內容，無法指定時機點
- Redux 的 middleware 執行時機在 `dispatch action` 到 `action 傳到 reducer` 之間的這段時間
- 可以定義多個 middleware ，我們可以按照順序調用 middleware ，每次 dispatch 都會把所有 middleware 走過一遍

#### 單用 redux-thunk 作為唯一的 middleware

```js
import { createStore, applyMiddleware } from "redux";

import { reducers } from "../reducer.js";

import { thunk } from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

export { store };
```

( 這邊原本使用 `require(redux-thunk)` 的方式寫會出錯，所以改用 ES module 的方式去寫 )

我們看多出的部分:

1. `import {thunk} from "redux-thunk";`

```js
import { thunk } from "redux-thunk";
```

將 middleware ( `thunk` ) 拿出來

2. `applyMiddleware(thunk)`

把剛才載入的 middleware 裝進 redux store 中，告訴 Redux: 每次 dispatch action 都要先經過這個 middleware 再進入 reducer

3. `createStore(reducers, applyMiddleware(thunk))`

`createStore` 多傳遞一個 `applyMiddleware(thunk)` 可以將 middleware 串進來

這個 store 有定義好的 reducers 並且在每次 dispatch() 都會先經過 middleware (這裡是 thunk )

**結論:**

- `redux-thunk` 裝進 store 以後可以想成是在 `dispatch action` 和 `進入reducer` 之間裝了一個 middleware 的過濾器
- middleware 會攔截 function，所以當 `dispatch(function)` 時 middleware 就會處理這個 function，而 `dispatch(action object)` 則會通過後進入 reducer
- 這個 function 被攔截以後理論上不會再往下去 reducer，除非我的 function 裡面還有 dispatch
- function 內部的 dispatch 可以是 `dispatch(action object)` 讓他進入 reducer，也可以繼續 `dispatch(function2)` 做巢狀 function

如果要做多層 middleware:

```js
applyMiddleware(middleware1, middleware2, ...)
```

#### 範例:

`Redux-thunk` 處理 fetch API 的範例，和平時 React 專案中一樣我們維護三個 state (data, loading, error)。

基本上做法就是給這三個動作各一個 action type，並用同一個 reducer 處理他們。 reducer 內的 state 也是包含這三個東西

- `action.js`

```js
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      dispatch(fetchUsersSuccess(data));
    } catch (err) {
      dispatch(fetchUsersFailure(err.message));
    }
  };
};

export {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  fetchUsers,
};
```

fetch 的寫法基本上和平常在 React 專案裡做 GET request 差不多，只是過程當中的那些 `setState` 變成使用 `dispatch(action)` 去做。

程式邏輯本質上都是一樣的，只是加了一套狀態管理的方式

- `reducer.js`

```js
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./action.js";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { loading: false, user: action.payload, error: "" };
    case FETCH_USERS_FAILURE:
      return { loading: false, user: [], error: action.payload };
    default:
      return state;
  }
};

export { reducer };
```

每種 action.type 對應要處理的 reducer ， 每個 action.type 可以獨立決定下一個 state 的結果

- `store.js`

```js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./reducer.js";

const store = createStore(reducer, applyMiddleware(thunk));

export { store };
```

建立 store ( 輸入 reducer 並裝上 middleware )

使用的例子 :

- `index.js`

```js
import { store } from "./store.js";
import { fetchUsers } from "./action.js";

const unsubscribe = store.subscribe(() => {
  console.log("state updated:", store.getState());
});

store.dispatch(fetchUsers());
```

一次 `fetchUsers()` 會造成兩次 state 的改變 ( 第一次先改 loading，第二次改 API 傳來的 data )，所以會觸發`console.log` 兩次。

因為 `fetch` 非同步，所以假設我在最下面加上 `unsubscribe();` 就只會輸出一次 loading 變化的 state，等 fetch 完就已經 unsubscribe 了不會輸出 。

- 整個範例中用到 `redux-thunk` 的只有這一行

```js
store.dispatch(fetchUsers());
```

`redux-thunk` 讓我們可以 `dispatch(function)`

---
