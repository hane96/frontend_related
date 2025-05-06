

## JavaScript 基礎筆記

這篇筆記是以學過c++, c, python為基礎下去針對不同語法或新東西去寫的，內容較簡略一些。

---

###  `<script>` 標籤

在 HTML 中，JavaScript 要寫在 `<script>` 標籤之間：

```html
<script>
    alert("hello");
    alert("hello2");
</script>
```


`alert` 用於顯示彈出視窗並展示訊息。多個 `alert` 會依序顯示，第一個彈窗關閉後，第二個才會出現。

---

###  註解

和 C/C++ 一樣，JavaScript 也可以使用註解：

* 單行註解：`//`
* 多行註解：`/* */`

註解的內容不會被當作程式碼執行。

---

###  變數與資料型別

JavaScript 支援以下資料型別：

* `integer`（整數）
* `float`（浮點數）
* `string`（字串）
* `boolean`（布林值）
* `array`（陣列）
* `object`（物件）

JavaScript 在宣告變數時不需要指定資料型別，直接用 `var`、`let` 或 `const` 來宣告變數：

```js
var x = 1;
var y = x + 2;
alert(y);  // 輸出 3
```

字串可以用 `""` 或 `''` 來定義：

```js
var z = "Hi";
```

---

### 變數宣告方式

JavaScript 中有三種宣告變數的方式：`var`、`let` 和 `const`。

* `var`：函式作用域（function scope）。在同一函式中，`var` 宣告的變數不能重複，重複宣告會指向同一個變數。
* `let`：區塊作用域（block scope）。它的作用範圍被限制在 `{}` 內部，即使在同一函式中，也不會影響到其他區塊中的同名變數。
* `const`：常數宣告，區塊作用域，不能改變值，改動會報錯。

```js
function example() {
    let x = 1;
    if (true) {
        let x = 2;  // 是另一個 x（新的作用域）
    }
    console.log(x); // 輸出 1
}
```

---

###  函式

函式宣告的基本語法：

```js
function 函式名稱() {
    代碼內容
}
```

例如：

```js
function alert_x_plus1(x) {
    alert(x + 1);
}
alert_x_plus1(1);  // 輸出 2
```

函式也可以接受多個參數：

```js
function plus(x, y, z) {
    alert(x + y + z);
}
plus(1, 2, 3);  // 輸出 6
```

函式內的變數是區域變數，它們的作用範圍僅限於函式內部。

函式還可以回傳值：

```js
function plus(x, y, z) {
    return x + y + z;
}
var sum = plus(1, 2, 3);  // sum = 6
alert(sum);  // 輸出 6
```

---

### 動態類型

JavaScript 是動態類型語言，有點像python，變數類型可以根據賦值自動轉換。例如：

```js
var x = 1;
alert(x + " hi");  // 輸出 "1 hi"
```

這裡，`x` 被自動轉換成了字串。

---



### `if else` 

JavaScript 的 `if else` 語法與 C++ 相似：

```js
var x = 2;
if (x > 1) {
    alert("x is bigger than 1");
} else if (x < 1) {
    alert("x is smaller than 1");
} else {
    alert("x is 1");
}
```

條件判斷中，`==`、`!=`、`&&`、`||` 等邏輯運算符也可以使用。

###  `while` 與 `for` 迴圈

* **`while` 迴圈**：條件內可以放任意 boolean 或變數。

```js
while (條件) {
    // 執行內容
}
```

在 `while` 的條件中，這些值會被當作 "falsy"（假值）轉換為 `false`：

* `false`
* `0`
* `""`（空字串）
* `null`
* `undefined`
* `NaN`

其他值則被當作 "truthy"（真值）轉換為 `true`：

* `"hello"`

* `123`

* `[]`（空陣列）

* `{}`（空物件）

* `function() {}`（函式）

* **`for` 迴圈**：語法與 C++ 類似。

```js
for (i = 0; i < 10; ++i) {
    // 執行內容
}
```

### 陣列（Array）

JavaScript 的陣列語法如下：

```js
var arr_name = [value1, value2, value3, ...];
```

訪問陣列元素的方式和 C++ 類似：

```js
alert(arr_name[index]);
```

JavaScript 的陣列更像是 C++ 的 `vector`，甚至比 `vector` 更自由：

```js
var score = [100, 90, 80];
alert(score[0]); // 輸出 100
```

陣列沒有固定大小，會自動調整。

常用的內建函式：

* `arr_name.push(x)`：類似 C++ 的 `push_back()`，將元素放到陣列末尾，並自動調整大小。
* `arr_name.pop()`：刪除並回傳陣列的最後一個元素。
* `arr_name.find(目標函式)`：根據目標函式的條件，返回第一個符合的元素。如果找不到，則回傳 `undefined`。
* `arr_name.sort(比較函式)`：根據比較函式的規則對陣列排序。如果不提供比較函式，會依照字串排序。如果是數字比較，必須自己寫比較函式。

例如：

```js
arr.sort((a, b) => a - b);  // 排序從小到大
```

或者使用傳統的寫法：

```js
arr.sort(function(a, b) { return a - b; });  // 等同於上述寫法
```

sort裡面的目標函式邏輯是以{}內的值<0時照()內的順序去排，以上面的例子來說`a-b < 0`時也就是`a < b`時，`a`會排在`b`前面，就是由小排到大。

也就是說如果要從大到小，這兩種方式都可以：

```js
arr.sort(function(b, a) { return a - b; });
arr.sort(function(a, b) { return b - a; });
```

* `arr_name.reverse()`：反轉陣列。
* `arr_name.length`：返回陣列的長度。

這裡的陣列（Array）與物件的 `Array` 類型實際上是同一個東西，只是語法糖。

---





### 物件（Object）

JavaScript 的物件一樣可以存儲屬性（property）和方法（method），而且可以動態地新增或刪除屬性。物件不像類別（class）那樣需要先定義一個模板，再建立實體；在 JavaScript 中，物件是直接創建實體。

#### 定義物件

```js
var person = {
    name: "jack",
    age: 18,
    skills: ["skillA", "skillB"]
};
```

注意：物件的定義中使用 `=`，因為這不是在宣告變數，而是在創建物件。

在 JavaScript 中沒有指標（pointer），所以訪問物件的屬性時，使用點（`.`）符號就好不用(`->`)：

```js
alert(person.age); // 輸出 18
alert(person.skills[1]); // 輸出 "skillB"
```

#### 動態新增或刪除屬性

可以動態地新增或刪除物件的屬性：

```js
person.gender = "male";  // 新增 gender 屬性
delete person.age;       // 刪除 age 屬性
```

#### 物件內的函式

在物件內定義的方法需要使用 `this` 來引用物件本身的屬性，否則會找不到該屬性。

```js
var person = {
    name: "jack",
    age: 18,
    skills: ["skillA", "skillB"],
    add_age: function() {
        this.age++;  // 使用 this 來引用物件本身的 age 屬性
    }
};
person.add_age(); // 呼叫方法
alert(person.age); // 輸出 19
```

#### 作用域鏈（Scope Chain）

在 JavaScript 中，當你訪問一個變數時，會根據以下順序查找變數：

1. 先查找當前函式內部（local scope）。
2. 如果在函式內找不到，向外查找外部作用域（closure scope）。
3. 如果在外部作用域也找不到，查找全域變數（global scope）。
4. 如果找不到，會拋出 `ReferenceError`。

由於 JavaScript 物件會被視為 `var person`作用域看不到裡面的property或method，因此在外部無法直接訪問物件內部的屬性。要訪問物件的屬性，必須使用 `person.` 來呼叫。

在物件內部也一樣，需要使用 `this.` 來訪問自身的屬性（避免使用名字，否則會出錯）。

#### 使用 `this` 的注意事項

`this` 會根據函式的執行上下文而改變。在物件內部使用 `this` 時，它通常指向該物件；但如果在某些情況下，`this` 可能指向其他物件或全域物件。例如，在 `setTimeout` 函式中：

```js
setTimeout(function() {
    this.age++;  // 這裡的 `this` 指向 `window`（在瀏覽器中）
}, 1000);
```

如果希望 `this` 仍然指向物件本身，可以事先將 `this` 保存到變數中：

```js
var self = this;
setTimeout(function() {
    self.age++;  // 使用 `self` 來引用物件本身
}, 1000);
```

#### 匿名函式（Anonymous Function）

匿名函式是指沒有名稱的函式，通常用於只需要一次性執行或不需要重複使用的情境：

```js
setTimeout(function() {
    alert("Hello!");
}, 1000);
```

#### Object 方法的寫法

在物件內定義方法時，必須寫成函式的形式。這是因為物件的屬性是有類型的，而方法的屬性必須是函式，不能直接寫成其他形式。

```js
add_age: function() {
    this.age++;  // 必須寫成 function()，否則會出錯
}
```

如果省略 `function`，會導致語法錯誤。

###  物件與類別的區別

* **物件（Object）**：通常用於一次性存儲資料或設定，不會重複使用的結構。例如，一次性的配置設定或資料存儲。
* **類別（Class）**：當資料結構需要重複使用時，才會選擇使用類別來定義結構，這樣可以創建多個實例。

---




###  JSON（JavaScript Object Notation）

JSON 是一種輕量級的資料交換格式，通常用來儲存或傳輸資料，與 Python 的 `dict` 類似。JSON 基本上將物件的變數名稱轉為字串，對應的值則保持原本的資料型態。

#### 基本格式

```json
{
    "name": "jack",
    "age": 18,
    "skills": ["skill1", "skill2"]
}
```

JSON 格式不能包含函式、`undefined` 或 `symbol`。(只是有的話會被排除而已，不會錯誤)

#### 將 JavaScript 物件轉換為 JSON

使用 `JSON.stringify()` 方法可以將 JavaScript 物件轉換為 JSON 字串：

```js
const person = {
    name: "Jack",
    age: 18,
    skills: ["HTML", "CSS"]
};

const jsonString = JSON.stringify(person);
// 結果是：'{"name":"Jack","age":18,"skills":["HTML","CSS"]}'
```

#### 將 JSON 轉換回 JavaScript 物件

使用 `JSON.parse()` 方法可以將 JSON 字串轉換回 JavaScript 物件：

```js
const data = '{"name":"Jack","age":18,"skills":["HTML","CSS"]}';
const obj = JSON.parse(data);
// obj 就是正常的 JS 物件，可以像 obj.name 拿資料
```

###  回呼函式（Callback Function）

回呼函式是指作為參數傳遞給另一個函式並在其執行完後被呼叫的函式。這使得函式可以在某些條件下延遲執行或執行其他動作。

#### 範例：`setTimeout()` 方法

`setTimeout()` 是一個常見的回呼函式範例，用來延遲執行某段程式碼。它的語法如下：

```js
setTimeout(function, milliseconds, param1, param2, ...);
```

* `function`：要延遲執行的函式。
* `milliseconds`：延遲的時間，單位為毫秒（ms），例如 1000ms = 1秒。

```js
setTimeout(function() {
    alert("after 2secs");
}, 2000);
```

`setTimeout()` 不會阻塞主程式，它會在主程式執行完畢後開始執行延遲的函式。

#### 多個 `setTimeout()` 呼叫

當有多個 `setTimeout()` 時，它們會同時開始計時。例如，一個等 5 秒，另一個等 10 秒。它們不需要等前一個執行完成，會在主程式結束後同時開始計時。

###  網頁重導向（Redirection）

JavaScript 可以通過 `window.location` 屬性來將使用者導向其他網頁。

```js
window.location = "https://google.com";
```

#### 範例：延遲重導向

```js
setTimeout(function(){
    window.location = "https://google.com";
}, 3000);  // 3秒後跳轉到 Google 首頁
```

---


### String 的一些方法

1. **`substring(start, end)`**

   * 與 C++ 的 `substr` 類似，從 `start` 開始到 `end` 前一個字元（不包含 `end`）的子字串。
   * 如果 `start` 大於 `end`，會自動交換位置。

   ```js
   var str = "0123456";
   var temp = str.substring(1, 4);
   alert(temp); // 輸出 "123"
   ```

2. **`indexOf(substring)`**

   * 返回子字串首次出現的位置。如果沒有找到，會回傳 `-1`。
   * 請注意 `indexOf` 是區分大小寫的。

   ```js
   var str = "Hello hi";
   var temp = str.indexOf("hi");
   alert(temp); // 輸出 6
   ```

3. **`length`**

   * 返回字串的長度（字元數量）。

   ```js
   let str = "hello";
   alert(str.length); // 輸出 5
   ```

4. **`includes(substring)`**

   * 檢查字串是否包含指定的子字串，返回 `true` 或 `false`。

   ```js
   "banana".includes("nan"); // 輸出 true
   ```

5. **`slice(start, end)`**

   * 返回從 `start` 到 `end` 之間的字串，`end` 是不包含的。
   * 也可以使用負數，表示從字串的尾端計算。

   ```js
   "abcdef".slice(-4, -1); // 輸出 "cde"
   ```

6. **`toLowerCase()` / `toUpperCase()`**

   * 將字串轉換成小寫或大寫。

   ```js
   "Hello".toLowerCase(); // 輸出 "hello"
   ```

7. **`trim()`**

   * 移除字串前後的空白字符（不影響字串中間的空白）。

   ```js
   "   hi hello   ".trim(); // 輸出 "hi hello"
   ```

8. **`replace(old, new)`**

   * 替換字串中符合 `old` 的部分為 `new`。僅會替換第一個符合的部分。

   ```js
   "apple pie".replace("pie", "juice"); // 輸出 "apple juice"
   ```

9. **`split(separator)`**

   * 根據分隔符（`separator`）將字串拆分為陣列。

   ```js
   "a,b,c".split(","); // 輸出 ["a", "b", "c"]
   ```

---

###  Console 用法

`console.log()` 用來在控制台輸出訊息，常用於調試程式碼。

```js
console.log("Debugging...");
```

在瀏覽器中，你可以右鍵點擊頁面並選擇檢查（Inspect），然後切換到 Console 標籤，查看輸出的結果。

---

###  流程控制

1. **`switch` 語句**

   * `switch` 的概念與 C++ 類似，每個 `case` 後面需要加上 `break`，否則會繼續執行下面的 `case`。

   ```js
   let fruit = "apple";

   switch (fruit) {
       case "apple":
           console.log("This is an apple.");
           break;
       case "banana":
           console.log("This is a banana.");
           break;
       default:
           console.log("Unknown fruit.");
   }
   ```

2. **`break`**

   * `break` 用來跳出迴圈或 `switch` 區塊。

3. **`continue`**

   * `continue` 用來跳過當前迴圈的這次迭代，進入下一次迴圈。

   ```js
   for (let i = 0; i < 6; i++) {
       if (i === 2) continue;
       console.log(i); 
       if(i === 4) break;
   }
   // 輸出：0 1 3 4
   ```

4. **`==` 和 `===` 的差別**

   * `==` 會進行類型轉換再比較，會比較值是否相等。

     * 例如：`1 == "1"` 會返回 `true`。
   * `===` 比較的是值和型別是否都相等。

     * 例如：`1 === "1"` 會返回 `false`。

---