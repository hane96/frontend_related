


這份筆記主要是將常用的tailwind class做分類

方便查詢使用


## 文字樣式


### 文字顏色
#### text-顏色-深度

ex: `text-gray-300`, `text-blue-800`, `text-black`

大部分都會有這幾種深度:

50(最淺), 100, 200, 300, 400, 500(通常是預設), 600, 700, 800, 900(最深)

可以這樣記: 每100都有一級 共有10級(包含50)

* 有一些顏色不能調深度 (black、white、transparent)


### 背景顏色
#### bg-顏色-深度

ex: `bg-blue-300`, `bg-white`

顏色深度的概念和text的一樣


### 字體大小
#### text-* 

ex: `text-sm`, `text-lg`, `text-2xl`, `text-[10px]`

`*`可以是預設的 `sm` `lg` `xl` `2xl` `3xl` 等

 也可以用`[]`包起來 裡面放實際大小和單位


### 字體粗細

#### font-*

ex: `font-thin`, `font-bold`

從細到粗: `font-thin` `font-light` `font-normal` `font-medium` `font-bold` `font-black`


### 字體樣式
ex: `italic`,`not-italic`


### 對齊方式
#### text- *
ex: `text-left`, `text-center`, `text-right`

相對於容器的對齊方式


### 行高
#### leading-*
ex: `leading-tight`, `leading-relaxed`

- leading-none 1  完全貼緊
- leading-tight 1.25 較緊
- leading-normal 1.5 預設
- leading-relaxed 1.625 稍微寬鬆
- leading-loose 2 寬鬆 常用於段落


### 字母間距
#### tracking-*
ex: `tracking-tight`, `tracking-wide`

從小到大: 

`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`

也可以自訂 ex: tracking-[10px]



---


## 排版 Layout 

### 容器寬度/高度
#### w-* ,  h-* 
寬度高度語法一樣 下面只用w講

ex: `w-1/2`, `w-full`, `w-4`, `w-auto`, `w-screen`

有三種常見的寫法
1) 比例寬度
用分數或full代表佔容器(父元素)的多少比例
`w-1/2`, `w-2/3`, `w-full`等
這個分數有限制 最多只有到分母為5 像是3/7就沒有這種class

2) 固定寬度
使用固定的單位 1單位代表0.25rem
`w-4` 代表1rem  `w-8`代表2rem

3) 特殊寬度
w-auto 根據內容寬度
w-screen 寬度為整個螢幕
w-[500px] 自定義寬度(自訂值要用[]包起來)


### padding/margin

#### p-* / m-*

ex: `p-4`, `mt-2`, `mx-8`

前綴 方向-數值

1) 前綴: m/p 對應 margin / padding
2) 方向: t/r/l/b 對應 top/right/left/bottom

   x/y 對應 l+r / t+b

   不寫方向就是4個方向
3) 數值: 1單位0.25rem


### 邊框

#### border border-顏色-深度
ex: `border`, `border-gray-300`

顏色、深度的用法和前面一樣
要注意`border-顏色-深度`只是定義顏色不會出現邊框 要再加一個`border`才會出現邊框


### 圓角

#### rounded
ex: `rounded-sm`, `rounded`, `rounded-xl`

從小到大 xs, sm, md, lg, xl, 2xl, 3xl 
有none可以用


### 陰影

#### shadow
ex: `shadow-sm`, `shadow`, `shadow-xl`

從小到大 2xs, xs, sm, md, lg, xl, 2xl 

有none可以用



---



## Flex / Grid


### flex 

ex: `flex`, `inline-flex`

flex 是將containter變成flex container 

inline-flex 等同 display: inline-flex


### flex-direction

ex: `flex-row`, `flex-row-reverse`, `flex-col`, `flex-col-reverse`

決定主軸方向


### justify-content

#### justify-* 

ex: `justify-start`, `justify-center`, `justify-end`, `justify around`

- `start` 靠左
- `center` 置中
- `end` 靠右
- `between` 均分(兩側貼邊)
- `around` 均分(兩側有間距)
- `evenly` 所有間距相等(包含到兩側的間距)


### align-items

#### items-*

ex: `items-start`, `items-center`

交叉軸對齊 (垂直主軸的方向)
start
center
end
stretch 撐滿高度(預設)
baseline 以文字基線對齊


### flex-wrap

ex: `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`

決定滿了能不能換行 預設是nowrap

reverse 是反向換行


### gap

#### gap-*

ex: `gap-2`, `gap-x-4`, `gap-y-2`

放在flex容器 控制容器的子元素之間的間隔

單位一樣是1單位=0.25rem


## Grid

### grid

ex: `grid`, `inline-grid`

將容器改為grid容器

inline是變成inline的


### grid-template-columns / grid-template-rows

#### grid-cols-* , grid-rows-*

ex: `grid-cols-none`, `grid-cols-3`, `grid-rows-none`, `grid-rows-2`

grid-cols-1 ~ grid-cols-12 建立對應數量的欄位

grid-cols-none 移除欄位設定

rows的邏輯相同 只是變成只有 1~6 rows


### 元素跨欄/列 col-span / row-span

#### col-span-* / row-span-*

ex: `col-span-2`, `row-span-3`, `col-span-full`

讓元素跨欄/跨列

- `col-span-1` ~ `col-span-12` 元素跨幾欄

- `col-span-full` 跨整行

- `row-span-1` ~ `row-span-6` 元素跨幾列

- `row-span-full` 跨整列


### gap

#### gap-* / gap-x-* / gap-y-*

ex: `gap-4`, `gap-x-8`

和 flex 的 gap 類似 但因為是二維的 可以再指定方向

- gap-* 設定列和欄的距離

- gap-x-* 設定列的距離

- gap-y-* 設定欄的距離


### grid-auto-flow

#### grid-flow-*

ex: `grid-flow-row`, `grid-flow-col`

- `grid-flow-row` 先排直行 (預設)
- `grid-flow-col` 改成橫向排列
- `grid-flow-dense` 緊密填入空格


### auto-cols-* / auto-rows-* 自動欄/列大小

#### auto-cols-* auto-rows-*

- `auto-cols-auto` 自動欄寬
- `auto-cols-fr` 每格等分
- `auto-cols-min` / `auto-cols-max` 最小/最大寬度

rows 同理 只是把 cols換成rols


### 格子內對齊 place-items / justify-items, align-items

- `place-items-center` 垂直水平置中
- `justify-items-*` 水平對齊方式
- `items-*` 垂直對齊方式 和flex同名

`*` 都可以換成start, center, end等


### 整體格線對齊 place-content, justify-content, align-content

- `place-content-center`  垂直水平置中整個grid
- `justify-content-*` / `content-*` 控制主軸/交叉軸上grid的整體對齊


## RWD相關

Tailwind 中 RWD 是使用 prefix (前綴)的語法來做

用 `斷點 : class` 的方式去寫

ex: 
```css
<p class="text-sm md:text-base lg:text-xl">
```

* 使用習慣上會一個一個屬性寫完所有大小(從小到大)，再換下一個屬性

### 常用斷點

- `sm:`  640px 手機轉橫、平板直向
- `md:`  768px 平板
- `lg:`  1024px 筆電
- `xl:`  1280px 桌機
- `2xl:` 1536px 超寬螢幕


## 互動樣式

寫法和 RWD 處理斷點一樣是用 prefix

### Hover / Focus / Active

- `hover:` 當滑鼠移動到元素上時作用
- `focus:` 當鍵盤聚焦(通常是表單元素)時作用
- `active:`當點擊時作用 
- `disabled:` 當被禁用(不能操作)時作用 (搭配buttom、input)

ex: `hover:bg-blue-600`


### group-* / peer-* 

- `group` 可以加在父元素 觸發時會影響所有帶有對應`group-*`的子元素

- `peer` 概念類似 變成是 sibling (兄弟)元素觸發時會讓`peer-*`作用

ex:
```css
<div class="group hover:bg-gray-200 p-4">
  <p class="group-hover:text-blue-500">文字會變藍</p>
  <button class="group-hover:underline">按鈕會加底線</button>
</div>
```


## 其他 tailwind 相關筆記

### 重複樣式

在 React 中如果相同的 css 要一直重複使用 可以獨立出來寫一個 component

```jsx
function Card({ title, description, imageUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 max-w-sm">
      <img src={imageUrl} className="w-full h-40 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

<Card title="第一張卡片" description="這是描述" imageUrl="img1.jpg" />
<Card title="第二張卡片" description="另一段描述" imageUrl="img2.jpg" />
```
像這樣把 tailwind class 提出來重複使用同一個設定

### Tailwind layer 

Tailwind 有三個核心 layer

- `@tailwind base;`   基礎樣式 ex: reset, html, body

- `@tailwind components;` 比較抽象的元件 ex: 表單元件樣式 按鈕等

- `@tailwind utilities;` Tailwind的utility class ex: text-sm 

有點像原生 css 內優先度的概念。

後面的優先度更高，有衝突時會覆蓋掉前面的設定。


### Custom Components(客製化元件)

用 Tailwind class 組合成自訂的 class 並放在`componeny layer`之後就可以套用相同的設定。
```css
@tailwind components; //引入tailwind預設的component layer

@layer components { //用來把自訂的class放進component層裡面
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded; //@apply用來組合class
  }
}
```
之後只要套用 btn-primary 的 class 就可以套上設定。



