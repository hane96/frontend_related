



# TypeScript 筆記

TypeScript = JavaScript + 型別系統

程式會被編譯成純 JavaScript 才能執行。

## TypeScript 的優勢

1. 靜態型別檢查
2. IDE 支援更強
3. 模組化、泛型

---

## 安裝環境

```bash
npm install -g typescript
tsc --version  # 確認是否安裝成功
```

---

## tsconfig.json（專案設定檔）

建立 TypeScript 專案：

```bash
mkdir ts-test && cd ts-test
npm init -y
tsc --init  # 會產生 tsconfig.json
```

這個檔案裡會設定 TypeScript 的行為，例如：

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

---

## 範例

```ts
// index.ts
function greet(name: string): string {
  return `Hello, ${name}`;
}

const result = greet("Hane");
console.log(result);
```

---

## 執行 TypeScript 要先編譯

檔案在編譯前是 `.ts` 檔，TypeScript 使用 `tsc` 當作編譯器。

編譯方式分為兩種：

### 單檔編譯（像 C 的 gcc）

明確指定要編譯的檔案：

```bash
tsc index.ts
```

### 專案模式編譯

由 `tsconfig.json` 決定：

```bash
tsc
```

不需指定檔案名稱，會自動從 `tsconfig.json` 裡面的 `rootDir` 開始編譯。

---



## 基本型別

基本型別和 JavaScript 相同，只是多了型別註記：

* `number`
* `string`
* `boolean`
* `void`
* `undefined`
* `null`
* `any`（可以是任何型別）

說明：

* TypeScript 裡的 `number` 不再細分為 int、float 等，統一就是 `number`。
* 所有變數的預設型別是 `any`（在 `strict` 模式關掉的情況下）。
* 如果開啟 `strict` 模式，會要求所有變數要標明確的型別。

```ts
let age: number = 25;
let name: string = "Hello";
let isAdmin: boolean = true;
```

型別是寫在變數名稱後面，用冒號 `:` 分隔。

函式的回傳型別也是一樣，標在整個函式名稱後面：

```ts
function log(message: string): void {
  console.log("LOG:", message);
}
```

---

## 型別推論 / 變數宣告

TypeScript 支援型別推論（Type Inference）：
如果變數有初始值，TS 可以自動判斷型別。

```ts
let x = 123;        // 推論為 number
let name = "Hane";  // 推論為 string
let isAdmin = true; // 推論為 boolean
```

---

### 有一些情況必須明確寫型別：

#### 1. 沒有指定初始值

```ts
let value: number;
value = 5;
```

這裡的 `value` 沒有初始值，因此一定要手動標明型別。

#### 2. 函式的參數

```ts
function greet(name: string): void {
  console.log("Hello", name);
}
```

函式參數不會自動推論型別，必須自己指定。

#### 3. 函式回傳型別不明顯時

```ts
function getStatus(code: number): string {
  if (code == 200) return "OK";
  return "Error";
}
```

當回傳值可能有不同型別時（或邏輯較複雜時），建議標明回傳型別。


型別錯誤會在 `tsc` 編譯時被偵測出來。

---


## 型別別名（Type Alias）與 Union 型別

### 型別別名（Type Alias）

當某個型別的結構較為複雜時，每次重複撰寫會變得冗長。

例如：

```ts
function login(user: { name: string; age: number; isAdmin: boolean }) {
  // ...
}
```

這裡的 `{ ... }` 是一個 Object Type（物件型別）。
為了簡潔，可以使用「型別別名」給它取一個名字。

語法格式如下：

```ts
type 名字 = 型別;
```

使用範例：

```ts
type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};

function login(user: User) {
  // ...
}
```

這樣就可以在多處重複使用 `User` 這個型別名稱，讓程式碼更乾淨。

---

### Union 型別（聯集型別）

當變數可以是「多種型別其中之一」時，可以使用 Union 型別。
使用 `|` 符號連接多個型別。

```ts
let input: string | number;
```

表示 `input` 可以是 `string` 或 `number`。

範例：

```ts
function printValue(val: string | number) {
  if (typeof val === "string") {
    console.log("文字：" + val);
  } else {
    console.log("數字：" + val);
  }
}
```

這樣可以根據實際型別做不同處理。

---



## Literal（字面型別）與 Narrowing（縮小範圍）

### Literal 型別

Literal 型別是限制變數只能是某個「具體的值」。

```ts
let color: "red" = "red";
```

上述程式碼中，`color` 只能是 `"red"`，指定其他值會報錯。

這種方式可以與 Union 型別結合，實現類似「限定範圍」的效果：

```ts
type Direction = "up" | "down" | "left" | "right";

function move(dir: Direction) {
  console.log("Moving", dir);
}

move("up");
move("right");
```

這樣 `Direction` 就只允許是那四個字串中的一個。

---

### Narrowing（縮小型別範圍）

使用 Union 型別時，因為型別不明確，TypeScript 無法判斷當前變數是屬於哪一種型別，
導致無法使用某些限定於特定型別的方法。

為了解決這個問題，可以使用「Narrowing」根據條件縮小變數的型別範圍。

常見做法是使用 `typeof`：

```ts
type Input = string | number;

function printLength(input: Input) {
  if (typeof input === "string") {
    console.log(input.length); // input 被 Narrow 成 string
  } else {
    console.log(input.toFixed(2)); // input 被 Narrow 成 number
  }
}
```

說明：

* 原本 `Input` 是 `string | number`
* 經過 `typeof input === "string"` 的判斷後，TypeScript 就能確定 `input` 是 `string`
* 接下來就能安全地使用 `input.length`

---



## 更多 Narrowing（縮小型別）方法

除了 `typeof` 外，還有幾種常見方式可以幫助 TypeScript 判斷 union 型別的具體類型：

---

### 1. `in` 操作符

透過「屬性是否存在」來縮小型別。
如果某個屬性只存在於某一個型別中，就可以用來判斷。

```ts
type Dog = { kind: "dog", bark: () => void };
type Cat = { kind: "cat", meow: () => void };
type Animal = Dog | Cat;

function makeSound(animal: Animal) {
  if ("bark" in animal) {
    animal.bark(); // TS 現在知道 animal 是 Dog
  } else {
    animal.meow(); // 否則一定是 Cat
  }
}
```

---

### 2. `instanceof`（用於 class）

`instanceof` 用來判斷某個物件是否是某個 class 的實例，適用於 class 型別的 narrowing。

```ts
class Car {
  drive() { console.log("Vroom!"); }
}

class Bike {
  ride() { console.log("Pedal!"); }
}

type Vehicle = Car | Bike;

function useVehicle(v: Vehicle) {
  if (v instanceof Car) {
    v.drive(); // TS 知道是 Car
  } else {
    v.ride(); // 否則一定是 Bike
  }
}
```

---

### 3. Literal narrowing（根據具體屬性值）

這種方式常用於帶有 `kind` 或 `type` 欄位的物件型別判斷。

```ts
type Shape = 
  { kind: "circle", radius: number } |
  { kind: "square", size: number };

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.size ** 2;
  }
}
```

說明：

* 這類 pattern 通常稱為 "Discriminated Union"
* 直接判斷屬性值來縮小型別範圍

---



## Intersection Type（交叉型別）

交叉型別會把多個型別**合併成一個新型別**，需同時滿足所有型別的條件。
語法使用 `&`：

```ts
type Person = {
  name: string;
  age: number;
};

type Admin = {
  isAdmin: boolean;
};

type AdminUser = Person & Admin;
```

上述 `AdminUser` 型別就會有 `name`、`age`、`isAdmin` 三個屬性。

若合併的型別有相同屬性名稱但型別不同，TypeScript 會報錯，例如：

```ts
type A = { id: string };
type B = { id: number };
type C = A & B; // Error: 型別不相容
```

---

## interface

`interface` 是 TypeScript 用來描述「物件型別」的另一種方式，功能和 `type` 類似，但也有以下特色：

###  特點：

* **只能描述物件**
* **可以重複定義同一個名稱，TS 會自動合併**

```ts
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}

const dog: Animal = {
  name: "Buddy",
  age: 3
}; // OK，自動合併 name + age
```

---

### 在 React 中的使用方式

常見用來描述 `props` 的型別：

```tsx
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function TodoItem({ todo }: { todo: Todo }) {
  return <div>{todo.title}</div>;
}
```

說明：

1. `{ todo }` 是**解構賦值**，取出 `props.todo`
2. `{ todo: Todo }` 是**TypeScript 型別註記**，表示 todo 這個變數型別為 `Todo`

---

你也可以直接在參數前使用 interface：

```tsx
interface TodoProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoProps) {
  return <div>{todo.title}</div>;
}
```

這樣會讓 props 的型別更清楚且可重複使用。

---





## 泛型（Generic）

TypeScript 的泛型類似 C++ 的 `template`，讓函式、介面或型別在撰寫時保持彈性，同時保留型別安全性。

---

### 為什麼不用 `any`？

```ts
function identity(arg: any): any {
  return arg;
}
```

這樣會讓 TypeScript **無法推論型別**，例如：

```ts
const a = identity("hello"); // a 的型別是 any，不是 string
```

---

### 用泛型解決這個問題

```ts
function identity<T>(arg: T): T {
  return arg;
}

const a = identity<string>("hello"); // T 被指定為 string
const b = identity<number>(123);     // T 被指定為 number
const c = identity(true);            // 沒指定，TS 自動推論 T 是 boolean
```

* `T` 是**型別參數**，代表任意型別
* 你也可以使用其他名字，如 `U`, `K`, `V`，只是 `T` 是常見慣例

---

### 泛型陣列

```ts
function firstItem<T>(arr: T[]): T {
  return arr[0];
}

const result = firstItem(["a", "b", "c"]); // T 推論為 string
```

---

### 泛型 in interface 和 type

#### 1. 泛型 interface

```ts
interface ApiResponse<T> {
  status: number;
  data: T;
}

const response: ApiResponse<string[]> = {
  status: 200,
  data: ["OK", "Success"],
};
```

* `T` 可代表任何資料型別
* 這裡 `ApiResponse<string[]>` 表示 `data` 是 `string[]`

#### 2. 泛型 type

```ts
type Wrapper<T> = {
  value: T;
};

const wrapped: Wrapper<number> = { value: 42 };
```

---


## 泛型限制（extends）

* 可以對泛型設定條件，限制泛型必須符合某種型別或擁有某些屬性。
* 語法是：`<T extends 條件型別>`，通常用物件型別定義屬性需求。

```ts
function printLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length);
}

printLength("hello");     // 正確，字串有 length 屬性
printLength([1, 2, 3]);   // 正確，陣列有 length 屬性
// printLength(123);      // 錯誤，數字沒有 length 屬性
```

---

## 多個泛型參數

* 泛型參數可多個，用逗號分隔，分別用不同字母代表。
* 可用於合併、交叉型別等情境。

```ts
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const merged = merge({ name: "Tom" }, { age: 30 });
// merged 的型別是 { name: string } & { age: number }
```

---

## 泛型應用範例

### 1. 泛型資料過濾函式 (filter + predicate 函式)

* 定義泛型陣列和過濾函式
* `predicate` 是一個函式，輸入型別是 `T`，回傳布林值，表示是否保留該元素。

```ts
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

const nums = filterArray([1, 2, 3, 4], (n) => n > 2); 
// 結果: [3, 4]

const words = filterArray(["a", "bb", "ccc"], (w) => w.length > 1);
// 結果: ["bb", "ccc"]
```

* predicate 後面是函式型別，接收一個型別為 `T` 的 item 回傳 boolean。
* 這樣寫可以保持型別安全且函式彈性高。

---

### 2. 泛型表單欄位

* 用泛型來描述表單欄位，可以讓表單欄位的值和改變函式都支援任意型別。
* `onChange` 是函式型別，參數型別和欄位值型別相同。

```ts
interface FormField<T> {
  value: T;
  onChange: (newValue: T) => void;
}

const nameField: FormField<string> = {
  value: "Hane",
  onChange: (val) => console.log("new name:", val),
};

const ageField: FormField<number> = {
  value: 20,
  onChange: (val) => console.log("new age:", val),
};
```

* 這樣設計可以讓表單欄位靈活接收不同資料型別。

---

### 3. 泛型搭配 Promise

* 泛型可用來描述非同步函式的回傳型別，讓 Promise 能保持型別資訊。
* `fakeFetch` 是一個模擬非同步取資料的函式，回傳一個 `Promise<T>`。

```ts
function fakeFetch<T>(data: T, delay: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

fakeFetch<string>("Hello!", 1000).then(console.log);
```

* 其中 `Promise<T>` 是泛型型別，代表回傳的 Promise 會 resolve 一個 T 型別的資料。
* `new Promise` 的參數是帶有 `resolve` 的函式，delay 後呼叫 `resolve(data)`。

---



## 將純 JavaScript 轉為 TypeScript

### 1. 幫變數、參數、函式回傳值加上型別

範例：

```js
// JS
function greet(name) {
  return "Hello " + name;
}

// TS
function greet(name: string): string {
  return "Hello " + name;
}
```

---

### 2. 處理 DOM 時的型別問題

* `document.querySelector` 會回傳 `Element | null`，TS 不確定具體是哪種元素，或可能為 null。
* 如果要用 `input.value`這類特殊型別才能使用的函式，就需要告訴 TS `input` 是哪個具體型別( ex : `HTMLInputElement` )。

#### 有三種常用方法：

1. **型別斷言 (Type Assertion)**

```ts
const input = document.querySelector("#myInput") as HTMLInputElement;
input.value = "hello";
```

* `as` 告訴 TS 這個變數一定是 `HTMLInputElement`，TS 會相信。

2. **用 `instanceof` 判斷**

```ts
const input = document.querySelector("#myInput");
if (input instanceof HTMLInputElement) {
  input.value = "hello";
}
```

* 先用 `instanceof` 確認型別，再使用。

3. **使用後綴的非空斷言 `!`**

```ts
const input = document.querySelector("#myInput")!;
input.value = "hello";
```

* `!` 表示這個變數絕對不會是 null 或 undefined。
* 僅適用於你確定該元素一定存在的情況。
* 不適用於多型別情況，需用其他兩種方法。

---

### 3. 原本自由使用的物件，通常要先定義結構型別

```ts
type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const todo: Todo = { id: 1, text: "Learn TS", done: false };
```
* 尤其是要重複使用的物件，會用 type 包裝起來。
* 如果多個檔案會用到同一個物件，可以獨立出一個 type 檔案給大家 import type 。

---

### 4. 盡量只在必要時使用 `any`

* 過度使用 `any` 會失去 TypeScript 的型別保障意義。

---

### 5. DOM 相關

會在下面補充:

---



## 常見 DOM 型別與用法

### 1. HTML 元素與對應型別

型別名稱通常是 `HTML` + 元素英文單詞（大寫開頭） + `Element`

| HTML 元素    | 對應型別                | 常用屬性/方法範例                      |
| ---------- | ------------------- | ------------------------------ |
| `<input>`  | `HTMLInputElement`  | `.value`, `.checked`, `.files` |
| `<button>` | `HTMLButtonElement` | `.disabled`, `.innerText`      |
| `<form>`   | `HTMLFormElement`   | `.submit()`, `.reset()`        |
| `<a>`      | `HTMLAnchorElement` | `.href`, `.target`             |
| `<div>`    | `HTMLDivElement`    | `.innerHTML`, `.classList`     |
| `<span>`   | `HTMLSpanElement`   | 同上                             |
| `<ul>`     | `HTMLUListElement`  | `.children`, `.appendChild`    |

範例：

```ts
const input = document.querySelector("#myInput") as HTMLInputElement;
console.log(input.value);
```

> 用型別斷言告訴 TS `input` 一定是 `HTMLInputElement`，這樣才可使用 `.value` 屬性。

---

### 2. Event 型別

* 一般事件：`Event`
* 滑鼠事件：`MouseEvent`
* 鍵盤事件：`KeyboardEvent`

事件處理函式中要標註 `event` 參數型別，才能使用該事件特有屬性：

```ts
// 點擊事件
btn.addEventListener("click", (e: MouseEvent) => {
  console.log(e.clientX, e.clientY);
});

// 鍵盤事件
document.addEventListener("keydown", (e: KeyboardEvent) => {
  console.log(e.key);
});
```

---

### 3. `event.target` 型別

預設型別是 `EventTarget | null`，通常需要斷言具體元素型別才能使用特有屬性：

```ts
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  console.log(target.value);
}
```

---

### 4. NodeList 與陣列型別處理

`querySelectorAll` 回傳 `NodeListOf<Element>`，裡面元素常需斷言型別：

```ts
const items = document.querySelectorAll(".item"); // NodeListOf<Element>

items.forEach((el) => {
  const div = el as HTMLDivElement;
  div.style.color = "blue";
});
```

可以用泛型簡化：

```ts
const inputs = document.querySelectorAll<HTMLInputElement>("input");
inputs.forEach((i) => console.log(i.value));
```

---

### 5. 不同資料型別的處理

例如：

```ts
display.innerText = seconds; // 會錯，因為 innerText 需要 string，seconds 是 number
```

處理方法：

1. **轉型**

```ts
display.innerText = seconds.toString();
```

2. **模板字串**

```ts
display.innerText = `${seconds}`;
```

模板字串可讀性更好也更常用。

---




## React 轉 TypeScript

### 1. Event Types（事件處理型別）

React 中的事件物件是封裝過的，不同於原生 DOM 的 event，所以型別要用 `React.*Event`。

| 事件類型         | TypeScript 型別                         | 適用元素                            |
| ------------ | ------------------------------------- | ------------------------------- |
| Click event  | `React.MouseEvent<HTMLButtonElement>` | `<button>`, `<div>`, `<span>` 等 |
| Change event | `React.ChangeEvent<HTMLInputElement>` | `<input>`, `<textarea>`         |
| Submit event | `React.FormEvent<HTMLFormElement>`    | `<form>`                        |

這些型別是泛型，`<HTML...Element>` 用來指定事件發生在哪個元素上，讓 TS 能正確推導成員屬性。
可想成指定了 `T = React.MouseEvent<HTMLButtonElement>` 這樣的型別別名。

---

#### 範例一 ：點擊事件

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Clicked!");
};
```

---

#### 範例二：輸入事件

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setText(e.target.value);
};
```

* 大多數事件處理中會用到 `.preventDefault()`，所以建議事件參數都要標清楚型別。

---

### 補充： `.target` / `.currentTarget`


#### `.target` vs `.currentTarget`

* `e.target`：事件觸發來源，可能是 button 內部的 `<span>` 或 `<i>` 等。
* `e.currentTarget`：一定是綁定事件的元素本身。

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.target);        // 可能是內部元素
  console.log(e.currentTarget); // 一定是 <button>
};
```

---



## 2. Function Component（函式元件型別）

在 React 中，一個 component 就是一個回傳 JSX 的函式。
TypeScript 中可以用兩種方式來為 function component 加上型別。

---

###  方法一：使用 `React.FC<PropsType>`

```tsx
type Props = {
  title: string;
};

// 箭頭函式寫法
const MyComponent: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};

// 或是 function 寫法
function MyComponent({ title }: Props) {
  return <h1>{title}</h1>;
}
```

* `React.FC` 是泛型型別，需要指定 `<Props>`。
* `({ title }: Props)` 是解構賦值寫法，等同於：

```tsx
function MyComponent(props: Props) {
  const { title } = props;
}
```

* 使用 `React.FC` 時會**自動內建 `children`**，即使沒寫在 `Props` 裡也能使用。

---

###  方法二：直接標註 Props（官方推薦）

```tsx
type Props = {
  title: string;
};

function MyComponent({ title }: Props) {
  return <h1>{title}</h1>;
}
```

如果要用 `props.children`，記得要在型別中加上 `children` 欄位：

```tsx
type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return <div>{children}</div>;
}
```

這種寫法不會自動有 `children`，需要自己加進 `Props` 裡。

---

###  為什麼要用 `type` 包 Props？

雖然你可以直接把型別寫在參數上，但把它**封裝成 `type` 或 `interface`** 有這些好處：

* 結構清楚、可讀性高
* 可重複使用（在多個元件或函式中）
* 適合多人協作

#### 常見會用 `type` 包的情境：

* React component 的 `props`（幾乎一定會包）
* 傳入函式的物件參數（為了提升可讀性）
* 重複出現的型別結構

只有在非常簡單或只用一次的情況，才會不封裝成 `type`。

---


## 3. useState 型別

React 的 `useState` 是常見的 hook，在有初始值的情況下，TypeScript 通常可以**自動推論型別**。

---

### 有初始值 → 自動推論型別

```tsx
const [count, setCount] = useState(0);        // 推論為 number
const [text, setText] = useState("hello");    // 推論為 string
```

---

### 沒有初始值 → 一定要手動指定型別

```tsx
const [user, setUser] = useState(null);
```

* 如果沒有指定型別 TypeScript 會認為他只能是 null ，後續就不能用特定的方法

* 所以需要去指定型別：

```tsx
const [user, setUser] = useState<User | null>(null);
```

---

###  useState 型別範例

```tsx
const [user, setUser] = useState<User | null>(null);

const [items, setItems] = useState<string[]>([]);

const [form, setForm] = useState<{ name: string; age: number }>({
  name: "",
  age: 0,
});
```

---

## setState 有兩種寫法



### 1) 直接指定值（direct assignment）

```tsx
const [count, setCount] = useState<number>(0);
setCount(5); // 直接給一個 number
```

這種情況型別會由 `useState<number>` 決定，TS 可以自動檢查是否正確。

---

### 2) 使用函式更新（functional update）

這種寫法適用在依賴「前一個狀態值」的情況：

```tsx
setCount((prev) => prev + 1);
```

這裡的 `prev` 型別會自動由 `useState` 推斷（上例中為 `number`）。

---

### setState 傳給子元件時會建議用 type 包起來

```tsx
type SetCount = React.Dispatch<React.SetStateAction<number>>;

function ChildComponent({ setCount }: { setCount: SetCount }) {
  return <button onClick={() => setCount((prev) => prev + 1)}>+1</button>;
}
```

* `React.Dispatch<T>`：代表一個 dispatch 函式型別
* `React.SetStateAction<T>`：可以是值或函式的 union 型別（`T | ((prev: T) => T)`）

這種寫法可以明確告訴 TS：這個 `setCount` 是一個 setState function，使用起來更安全。

---




## 4. useRef 型別

`useRef` 在 React 中有兩種常見用途：

1. **存 DOM element**（取代 `document.querySelector` 的方式）
2. **存放不需要 re-render 的資料**（像是變數暫存）

---

### 1) 存 DOM element

```tsx
import { useRef, useEffect } from "react";

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

* `useRef<HTMLInputElement>(null)`  : 明確告訴 TS：這是要參考一個 `<input>`
* 初始值設為 `null` 是因為還沒 render
* `inputRef.current` 的型別是 `HTMLInputElement | null`
  所以要加 `?.`，表示確認他不是`null`才會呼叫 `.focus()` 

---

### 2) 當作「不會導致 re-render」的狀態容器

```tsx
const countRef = useRef<number>(0);

// 更新值，但不會觸發 re-render
countRef.current += 1;
```

* 型別寫法跟 `useState<number>(0)` 很像
* 重點是 `.current` 不標型別會變成 `any`

特點：

* 改 `.current` 不會 re-render
* 適合放「不需要畫面更新但要保留的值」（如計時器、前一個值、外部 callback）

---



## 5. 表單處理和輸入框（TS型別）

表單處理的重點在於要讓 TS 知道 `event` 發生在哪個元素，從而推斷 `.target` 的型別和 `.value` 的型別。

---

###  1) 處理 `<input>` 的輸入變化

```tsx
import { useState } from "react";

function InputExample() {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return <input value={text} onChange={handleChange} />;
}
```

* `React.ChangeEvent<HTMLInputElement>`  告訴 TS：`e.target` 是 `<input>`
* 所以 `.value` 會自動推論為 `string`
* 如果沒有標型別，TS 會不知道 `.value` 是什麼型別

---

###  2) 處理 `<form>` 的 submit

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // 處理 submit 邏輯
};
```

* 一樣要標成 `React.FormEvent<HTMLFormElement>`
* 才能安全使用 `.preventDefault()`，並讓 `.target` 被推成 `<form>`

---

### 3) 多個輸入欄位和物件型 state（例如 username + email）

```tsx
type FormData = {
  username: string;
  email: string;
};

const [formData, setFormData] = useState<FormData>({
  username: "",
  email: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

* 重點是 `<input>` 要記得加 `name="username"`、`name="email"`
* 才能靠 `[name]: value` 正確更新欄位值
* `name` 是 string，但 TS 可以推論 `formData` 的 shape

---


## 6. Component 陣列 render 時的 key 和型別


### 基本寫法：用 `.map()` 渲染陣列

```tsx
type Todo = {
  id: number;
  title: string;
};

const todos: Todo[] = [
  { id: 1, title: "吃飯" },
  { id: 2, title: "寫作業" },
];

function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

* `key` 是 React 最重要的渲染優化指標
* React 透過 key 判斷「哪個元素改了」，提高更新效率
* **key 建議用獨一無二的 id，不要用 index（容易導致 re-render 錯誤）**

---

### 如果用子 component 呈現項目

```tsx
type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => (
  <li>{todo.title}</li>
);

function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```

* `TodoItem` 明確指定 `props` 的型別為 `Todo`
* `.map()` 時 `key` 要加在外層的 `TodoItem` 上（不要加在 `<li>` 裡）
* props 傳遞型別清楚，TS 就能確保每個元件都拿到正確資料

---


## 7. Props 傳遞 children 型別



### children

```tsx
<MyComponent>
  <p>Hello</p>
</MyComponent>
```

* `<p>Hello</p>` 就是 `MyComponent` 的 **children**
* 是 component 標籤「包住」的內容

---

### 寫法一：用 `React.PropsWithChildren`

```tsx
type Props = {
  title: string;
};

const MyCom: React.FC<React.PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};
```

* `React.PropsWithChildren<T>` 會幫你自動加上：

  ```ts
  children?: React.ReactNode
  ```
* 用起來乾淨，不用手動補 `children` 的型別

---

### 寫法二：自己補上 `children` 欄位

```tsx
type Props = {
  title: string;
  children?: React.ReactNode;
};

function MyCom({ title, children }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

* 效果跟 `PropsWithChildren` 一樣，只是你自己寫出 `children` 的型別
* `?` 表示 **可選**，沒傳也不會報錯

---

###  `React.ReactNode`

* 是能被 render 的所有東西的統一型別
* 包含：`JSX`, `string`, `number`, `array`, `null`, `boolean`（不會 render）等
* 非常彈性，適合當作 `children` 的型別

---

### 補充：集中管理型別

* 常見的 `type` 建議放在 `types/` 資料夾
* 統一 import，更乾淨：

```ts
import type { MyCustomType } from "@/types/my-types";
```

* `import type` 是 TypeScript 的語意強化，表示這只是型別，不會被編譯成 JS 程式碼



