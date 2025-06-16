

# 前端優化(Frontend Optimization)

## 前端優化基礎概念

### 前端與後端效能比較、分工

最簡單的區分方法是發生在使用者瀏覽器中的歸類在前端

發生在server端的歸類在後端

後端包括:
- API respond的速度(TTFB)
- database查詢和寫入
- 後端邏輯執行效率
- 資料壓縮、傳輸

重點在讓資料快速產生和回傳。


前端包括: 
- HTML/CSS/JS 的下載和解析
- DOM建立與渲染
- 畫面是否快速出現 (FCP、LCP)
- 使用者互動順暢 (FID、INP)
- 排版是否穩定 (CLS)
- 網頁是否快速可以操作



### 前端效能

目標就是要讓網站越快載入、越快可以互動，使用者體驗就越好。

前端效能可以分為兩類:

- 載入效能( loading performance ): 開啟網站後多久能看到東西
- 互動效能( runtime performance ): 使用網站時，點東西會不會卡

### 常見的效能指標

這些是 Google 定義的 "使用者體驗" 的指標:

- FCP (First Contentful Paint): 最早看到第一個內容的時間
- LCP (Largest Contentful Paint): 最大的內容載入完成的時間
- TTFB (Time to First Byte): 從請求開始到接收到第一個byte的時間( server 延遲)
- CLS (Cumulative Layout Shift): 頁面跳來跳去的程度(排版穩定性)
- FID (First Input Delay): 使用者第一次互動(ex: 點擊)後，系統實際回應的延遲
- INP (Interaction to Next Paint): 使用者互動後，下次畫面變化的延遲時間，就是點了以後多久有反應

在 Lighthouse、PageSpeed Insights 會看到這些


### 分析效能的工具


| 工具                                   | 功能                                  |
| ------------------------------------ | ----------------------------------- |
| **Chrome DevTools → Performance 面板** | 直接在瀏覽器看程式的運作流程與時間線                  |
| **Lighthouse**                       | Chrome 內建的效能評分工具（可分析 FCP、LCP、FID 等） |
| **Google PageSpeed Insights**        | 網頁版 Lighthouse，給建議與行動方案             |
| **WebPageTest.org**                  | 可模擬不同裝置、地區的效能分析                     |


### 開發重點

主要應該在意三件事

1) 網站能不能快一點顯示內容 (載入優化)
2) 用戶操作網站時會不會卡 (互動優化)
3) 裝置慢、網速差的狀況還能不能用? (適應性優化)


### Lighthouse

可以從`F12`裡面找到`Lighthouse`

在`categories`中選擇`performance`，`device`中可以選擇`Mobile`或`Desktop`，選擇後點`Analyze page load`。

`Mobile`版本會模擬比較差的手機+3G網路來測試效能，`Desktop`則是模擬快速CPU和無網速限制的桌機環境，所以正常情況下`Desktop`的效能會比`Mobile`好很多。


#### 測試範例 

這是我之前寫MiniShop的測試結果
| 指標          | Mobile | Desktop |
| ----------- | ------ | ------- |
| FCP         | 1.5s   | 0.3s    |
| LCP         | 1.5s   | 0.3s    |
| TBT         | 0ms    | 0ms     |
| CLS         | 0      | 0       |
| Speed Index | 1.5s   | 0.3s    |

除了這些數字以外底下還會有一些建議

像是:

1) 
```
Reduce unused JavaScript Est savings of 43 KiB
```
表示有一些JS是沒有用到的 可以省下43KiB 

這通常是 引入太大的函式庫 或是 有一些開發過程沒清掉的 code

2.
```
Avoid chaining critical requests
```
這表示某些資源(圖片、js檔)必須等另一個資源載入完成才開始下載，這會延遲頁面完成渲染的時間。

3.
另外會顯示`Largest Contentful Paint element`，報告會顯示哪個元素是  LCP(最大元素)，用來查看效能瓶頸，可以確認那個內容是不是重要的。

#### 為什麼要看 Mobile 模式?
- 使用者很常用手機瀏覽網站
- `SEO`也用`mobile-first index`，當作排名依據
- 所以優化主要是針對手機模式

---

## 資源與請求優化

### 壓縮和縮小 (Minify) CSS、JS、HTML

#### 目標
要讓傳送到使用者瀏覽器的檔案(HTML/CSS/JS)更精簡，減少檔案大小和傳輸時間，提升首次載入速度(FCP、LCP)。


### Minify (縮小化)

Minify 是想要在不改變功能的條件下讓檔案變更小

有幾個方法去實現:
- 移除註解、空白、換行、縮排
- 讓 code 變成單行機器可讀形式

ex:
```js
function add(a, b) {
  return a + b;
}

// minify 後
function add(a,b){return a+b;}
```

### Minify的工具和方法
- `Terser`: 縮小JavaScript
- `clean-css`: 縮小CSS
- `html-minifier`: 縮小html
- 線上工具: `minifier.org`, `cssminifier.com`
#### 自動化
- Vite/Webpack 會自動 minify 產出的檔案 (ex: `dist/`目錄)
- Vite預設使用`esbuild`，打包時會自動縮小


### 實務流程

因為 minify 後的 code 可讀性會變得很差，所以會將開發用的可讀性高的版本和上線的 minify 過的版本分開。

1) 開發時
- 用原始、可讀性高的程式碼 (有註解、縮排等)
- 使用模組化的寫法，開發方便的檔案結構
2) 打包(build)時

打包(bundle)的意思是將多個原始檔案轉換為瀏覽器可用的、最少檔案數的版本
- 使用工具(ex: `Vite`, `Webpack`, `Rollup`)將原始程式碼打包 + minify
- 自動產出: `main.js` -> `main.min.js`或`assets/index-hash.min.js`
- 同時也會處理CSS、HTML、圖片的壓縮
3) 上線時
- 放上線的是 minify 後的版本
- user只會看到經過壓縮、模糊化的程式碼(有保護原始碼結構的作用)
4) 除錯或維護時
- 本地環境會保留完整版本
- 如果需要遠端 debug，會搭配`source map`讓開發工具還原原始碼

如果是`Vite`, `React`, `Vue`, `Next.js`這類工具，在`npm run build`時
會自動:
- 打包 -> minify -> 產出dist目錄
- 分出多個檔案做資源切割
- 附上hash名稱和source map(可選)

#### source map
`source map`是用來把壓縮後檔案對應到原始碼的 map，通常產生`.map`檔，在瀏覽器的`DevTools`開啟`source map`，就可以像平常一樣看到原始檔案。

---

### 圖片優化 (Image Optimization)

#### 目標
- 減少圖片檔案大小，縮短載入時間(LCP)
- 確保在不同裝置/解析度下畫質合理
- 盡量不浪費頻寬(尤其是行動裝置)

#### 圖片格式選擇
| 格式       | 優點                    | 適用情境         |
| -------- | --------------------- | ------------ |
| JPEG     | 小檔案，畫質佳               | 一般照片、商品圖片    |
| PNG      | 支援透明，畫質好但檔大           | icon、有透明背景的圖 |
| **WebP** | 高壓縮率，支援透明、動畫          | 推薦主流新專案用它    |
| AVIF     | 壓縮率比 WebP 更好，但瀏覽器支援較少 | 有支援就更省空間     |

`WebP`是目前的主力，現代瀏覽器支援。

#### 圖片尺寸和解析度控制

不要用超大的圖然後使用 CSS 縮小，這樣就是使用小圖但消耗了載入大圖的成本
，導致浪費。

- 應該要針對不同解析度提供適合大小的圖 (responsive image)
```html
<img 
  src="image-600.jpg"
  srcset="image-600.jpg 600w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 600px, 1200px"
  alt="商品圖">

```
用`srcset`設定不同大小的圖

#### Lazy Loading (延遲載入)

只有當圖片即將出現在畫面上才載入，而不是一進網頁就全部載完:
```html
<img src="product.jpg" loading="lazy" alt="商品圖">
```
`loading="lazy"`會讓瀏覽器自動把不在視窗內的圖片延後載入


#### 壓縮圖片工具
| 工具/平台                           | 功能                 |
| ------------------------------- | ------------------ |
| [Squoosh](https://squoosh.app)  | 線上壓縮，支援轉 WebP、AVIF |
| TinyPNG / TinyJPG               | 簡單拖拉壓縮             |
| ImageMagick                     | CLI 批次壓縮、調整尺寸      |
| Vite plugin (如 vite-imagetools) | 在打包階段自動壓縮          |


#### 小結
- 壓縮圖片檔案 => 減少體積，加快載入速度
- 選對格式(WebP) => 新格式壓縮率高
- lazy loading => 降低首次載入的壓力
- 設定srcset => 根據裝置給對應大小的圖
- 工具自動處理 => 開發階段自動優化，減輕手動負擔

---

### 使用CDN (Content Delivery Network)

#### 目標
使用`CDN`的目的是要讓使用者就近取得資源，減少 latency (延遲)和分散集中在單一伺服器的壓力。

#### CDN (Content Delivery Network)
CDN 是分散在世界各地的伺服器節點 (Edge Servers)，會將網站的靜態資源(HTML、JS、CSS、圖片等)快取在靠近使用者的位置。

簡單來說 CDN 就像是一個分散的伺服器 用物理位置來做到加速
- 沒用 CDN 就是所有人連線到同一台主機
- 用 CDN 就變成每個人會連到就近的節點，CDN 會幫忙分擔流量和加速

#### CDN的好處
- 從物理位置上加快載入速度
- 減輕主機負擔: 分散壓力到各個 edge server
- 自動快取資源: JS、CSS、圖片等靜態資源會被快取
- 提升可用性: 主機掛掉還有機會從 CDN 拿到快取版
- 安全性強化: 大部分 CDN 會提供基本防DDoS和HTTPS

#### 適合放在CDN的資源
- JS Library (ex: React、jQuery)
- CSS 框架 (ex: Bootstrap)
- 網站的 JS/CSS 檔
- 圖片、影片、字體檔
- API respond (可以設定為可快取)

#### 怎麼用 CDN

1) 引用公開的 CDN 資源
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```
常用的CDN平台:
- jsDeliver: 支援npm
- unpkg: 針對前端函式庫
- google CDN: 部分庫
- cdnjs.com: 由Cloudflare支援

把自己的資源放到CDN:
- 自己買CDN服務(Cloudflare、AWS CloudFront)
- Vercel/Netlify 內建就有CDN化

#### CDN 使用的注意事項
- 資源更新的問題: 要處理不同步的問題 要設定版本號、hash
- fallback的機制: 公開CDN如果掛掉要有備援或備份
- 同源策略: 跨域資源要注意 CORS 設定
- SEO/分析影響: 靜態資源透過 CDN 送出不會經過原主機，要用工具才能追蹤

---


### Bundling (檔案合併) 與 HTTP/2 特性

#### Bundling
在 HTTP/1.1 的時代，每個資源都需要一個 TCP 連線，同一時間的 request 數量會有限制(通常一個 domain 只能開6條連線)，如果網站用超過6個檔案瀏覽器就得排隊處理他們，所以需要透過 Bundling 減少檔案的數量。

常用的工具: Webpack、Vite、Rollup

把許多小的 JS/CSS 合併成1~2個檔案，減少request的數量，更快開始載入，也會更容易做 minify 和 tree shaking，缺點是首次載入體積變大，不利於只使用部分功能的頁面。

#### HTTP/2 的特性
HTTP/2 以後解決了幾個問題

- 多工(Multiplexing): 一條連線上可以同時有很多request，不像1.1那樣會因為請求太多卡住
- HPACK(Header壓縮): 把重複的request/response headers做壓縮做壓縮(cookie, user-agent)

HTTP/3 基本概念上和2差不多，但速度更快更穩定。

#### 現代開發不一定需要Bundling
因此現代開發不一定需要 Bundling 把檔案數壓低，可以針對不同 pages 做資源切割(code splitting)，只載入需要的那塊。保留模組化維護性也會越高

簡單來說就是 bundling 不再把檔案全部塞在一起，而是照功能/pages去bundling。

---

### Cache控制

用 cache 的好處
- 減少 server 負擔
- 加速使用者第二次輸入
- 節省流量

#### Cache-Control (設定資源的快取行為)

這是 HTTP Header 中最常用的控制方式，可以設定
- `max-age=3600`: 表示資源在cache中最多保留3600秒
- `no-cache`: 要先重新驗證才可以使用cache
- `no-store`: 完全不快取 (login頁面、帳戶資訊頁等)
- `public`: 所有人都可cache (CDN使用)
- `private`: 只能瀏覽器自己存 (不能CDN cache)

ex:
```http
Cache-Control: public, max-age=86400
```
大家都可以快取 快取壽命是86400 sec

#### ETag (實體標籤)

ETag 基本上就是利用版本號來確認是否已經下載最新版本

- 每個 resource 在 server 上會有一個版本標籤
- 下次 request 時瀏覽器會戴上這個標籤
- 如果 resource 沒變，server 會回傳 `304 Not Modified`，省下重新下載

流程:
1) 第一次請求: server 會給ETag: `"版本編號"`
2) 第二次請求時: 加上if-None-Match: `"版本編號"`
3) 如果內容沒改變， server 只會回傳`304`，不會重複送資料本體


#### 搭配使用情境

| 使用場景           | 建議設定                          |
| -------------- | ----------------------------- |
| 靜態資源（圖、CSS、JS） | Cache-Control: max-age + ETag |
| 私人頁面（帳號、個資）    | Cache-Control: no-store       |
| 頁面變動頻繁         | Cache-Control: no-cache       |


---

## 渲染優化與瀏覽器工作原理

從我們在瀏覽器輸入網址到畫面出現中間經過了那些過程?

1) 輸入網址以後先透過 DNS查詢 得到對應的 IP address
2) 建立 TCP connection(三次握手)與伺服器建立連線
3) 發送 HTTP request ( ex: `GET /index.html` )
4) server 端回應網頁的內容 (HTML、CSS、JS、圖片等)
5) 瀏覽器的解析和渲染
6) 執行JS

1~3 的部分主要在於網路問題

4 的部分是前一個主題(資源與請求優化) 

接下來將進入5 的部分

---
### 瀏覽器渲染流程

接下來要先解釋瀏覽器的解析和渲染的具體流程:

大架構是這樣:

`HTML -> DOM -> CSSOM -> Render Tree -> Paint`

1) HTML 解析成 DOM Tree
- 瀏覽器從上往下讀取 HTML，依結構建立出 DOM tree
- 每個標籤變成一個 DOM 節點
2) CSS 解析成 CSSOM (CSS Object Model)
- CSS被解析為一顆樣式規則的樹狀結構
- 每個樣式規則會對應 DOM 裡的元素
3) DOM + CSSOM 合併成 Render Tree (渲染樹)
- Render Tree 只包含實際會出現在畫面上的元素
- 隱藏的元素(ex: `display:none`)不會被加入 Render Tree
4) Layout (Reflow)計算
- 瀏覽器計算每個元素在畫面的位置和大小 (用尺寸、位置、padding、margin等
)
- 改變寬高、加元素、改文字等都會觸發 reflow
5) Paint (繪製)
- 把每個元素實際畫到螢幕上 (ex: 畫邊框、文字、背景圖等)
- 複雜的動畫和大量圖片都會加重這階段的負擔


| 名詞              | 說明                           |
| --------------- | ---------------------------- |
| **DOM**         | 根據 HTML 結構建立的節點樹             |
| **CSSOM**       | 根據 CSS 樣式建立的樣式規則樹            |
| **Render Tree** | 結合 DOM + CSSOM 產出的最終「畫面用結構」  |
| **Reflow**      | 重新計算元素位置與尺寸（layout）          |
| **Repaint**     | 更新元素的樣式（color、shadow 等）但不變位置 |

簡單來說初次載入會計算 layout (元素位置大小)再 paint 出來。

之後更新都一定會 repaint 重新把畫面畫出來，Reflow 是只有當變更的東西會影響排版 (ex: 元素大小 排版) 需要重新計算 layout 時才會觸發。

更新是有 `diff` 概念的
- Repaint 會嘗試只繪製有變動的區塊
- Reflow 也會盡量只處理受影響的節點和子節點
- React 中虛擬 DOM 的 diff 比一般 DOM 的 diff 更快


---

### Critical Rendering Path (CRP) 

從接收到 HTML 到螢幕顯示畫面的所有步驟，由原始碼變畫面的流程，每一段都可能會影響效能

#### 流程
1) HTML下載和解析 -> 建立 DOM Tree
2) CSS下載和解析 -> 建立 CSSOM Tree
3) 合併DOM、CSSOM -> 產生 render tree
4) Layout (Reflow) -> 計算每個節點的位置/大小
5) Paint -> 根據樣式把每個節點畫出來
6) Composite -> 將各層合成後顯示到畫面上

會叫做 Critical 是因為這條路徑走完使用者才能看到內容

如果路徑中的任一資源卡住 整個頁面會延遲顯示

所以這部分效能優化的目標就是去 **縮短這條路徑的時間**


#### Render-Blocking
Render-Blocking 指的是某些資源在下載或處理的過程中，會讓瀏覽器必須**暫停建構 render tree** 或 **暫停解析 HTML**，導致畫面變慢、延遲顯示。

基本上一個東西會不會造成 Render-Blocking 可以用會不會影響到 render tree 來判斷

- CSS: HTML中出現`<link rel="stylesheet">`，瀏覽器會停止建構 render tree 等 CSS 下載解析完
- 同步JS: 遇到`<script>`時會停止 HTML 解析和後續渲染，等 JS 執行完
- Web 字體 (web fonts): 如果是用`@font-face`，字體檔沒載完，有時候文字不會顯示

#### 優化 CRP 的做法

- 減少 render-blocking 的資源: JS 加上 `defer/async`，CSS合併或分 critical CSS
- 使用 lazy load: 圖片等非必要資源延遲載入
- 預載重要資源(preload): 提前加載字體、關鍵JS
- Minify 檔案: 減少傳輸時間
- font-display: 控制字體載入的顯示策略 (避免FOIT)


--- 

### async / defer

在預設情況下 `<script src="...">` 是同步執行的:

意思是當瀏覽器讀到 script 時，會暫停 HTML 的解析和渲染，先下載並執行完 JS 才會繼續解析/渲染 HTML。這就會造成前面提到的 Render-Blocking

可以使用 `async`和`defer`這兩個屬性來解決這個問題

#### async

```html
<script src="example.js" async></script>
```

- 下載和 HTML 解析同時進行
- 下載完立刻執行，不等HTML結束
- 可能在 DOM 還沒準備完成就執行，操作到還沒準備好的 DOM 會失敗

適合用在分析工具、廣告、第三方SDK ，不依賴 DOM 的 script

#### defer

```html
<script src="example.js" defer></script>
```

- 下載與 HTML 解析同時進行
- 等 HTML 完整解析後 (DOM ready)後才執行
- 多個 defer 會依照順序執行 (async 不保證順序)

適合用在大部分需要 DOM 的 JS 、 單頁式應用、初始化邏輯等

簡單來說預設是會阻塞 HTML 的，如果不想阻塞就要使用 async / defer ，兩者的差別在於 defer 會等 HTML 載完在執行，async 用在不依賴 DOM 的，defer 用在依賴 DOM 的

---

### 字體載入優化 (font-display、FOIT、FOUT)

當網頁使用 Google Fonts 或 自訂 web fonts，字體本身的檔案通常不小，載入時可能影響首次繪製的速度 (FCP、LCP)，甚至可能會字體閃爍

- FOIT (Flash of Invisible Text): 文字不可見直到字體下載完成

- FOUT (Flash of Unstyled Text): 先用備用字體顯示文字，字體載入後再換自訂字體

#### `font-display`

這是 CSS 屬性，可以設定 web font 的載入策略，控制是否要先顯示備用字體，以及何時切換下載完成的字體

- `auto` : 預設行為
- `block` : 最多等 3 秒，期間不顯示 ( FOIT )，超過時間後顯示備用字體
- `swap` :  文字立刻顯示備用字體，下載完成後換字體 (FOUT)
- `fallback` : 最多等100ms，沒下載到就用備用字體，不再切換
- `optional` : 只在網速允許時才載入字體，不影響主要內容優先度

最常使用的是 `swap` 模式

- 網站字體檔案較大或載入慢 => 建議用 font-display: swap
- 對排版穩定性敏感(ex: 品牌標準字體) => 用 fallback 或自行控制 preload
- 最好搭配瀏覽器預先載入字體檔(<link rel = "preload">) 提高載入效率


---

## JavaScript 與 互動效能

瀏覽器大部分的工作( JS、DOM、樣式、Layout、Paint )都在 main thread ， main thread 是**單執行緒**的，所以只要一段 JS 還沒執行完， main thread 就不能做別的事 (ex: 處理點擊、畫面更新)。

這就會導致畫面凍住、操作沒有反應

### 為什麼會 Blocking?
Blocking 的原因有幾種
1) 執行過長的 JS 任務
ex: 
```js
for (let i = 0; i < 1000000000; i++) {
  // 做一些計算
}
```
- 像這種重的迴圈會讓 JS thread 卡住
- 網頁會卡住，用戶點擊、滾動都沒反應

2) 大量同步 DOM 操作

```js
const items = document.querySelectorAll(".item");
items.forEach(item => {
  item.style.width = getComputedStyle(item).width;
});
```
- 操作 DOM 時觸發 reflow、repaint 太頻繁，主線程會塞爆

3) 網頁載入時過多 script 同時執行
- 頁面一載入就執行大量 JS ，還在 Parse HTML時就卡住了

4) 第三方 script 沒處理好 (廣告、追蹤碼)
- 常見於使用不當的外部 script，影響整個 main thread 


目標: 保持主線程暢通

如果 JS 任務可以切小段、非同步執行，就能避免卡住整個 UI 

接下來的主題就是要解決這個問題

---

### 長任務切分 (Long Task 分段執行)

前面提到 main thread 一次只能執行一個任務。如果一段 JavaScript 執行的時間超過 `50ms`，瀏覽器就會將它視為 `Long Task(長任務)`

Long Task (長任務) 會導致:
- 使用者點擊、輸入沒反應
- 畫面無法更新 ( FPS 掉到 0 )
- 互動性下降，出現卡頓和延遲

在大量資料處理、密集計算、初次載入頁面時特別常見

#### Long Task 處理

假設有一個需要一堆計算的 Long Task 需要處理
```js
const data = Array(100000).fill(0);

data.forEach((item, i) => {
  data[i] = Math.sqrt(i * 123456);
});
```

有兩種切分任務的方法可以解決，兩個方法的目的都是不要讓 JS 一口氣做太多事而是分批做。讓瀏覽器可以去處理畫面更新、使用者互動

#### 方法一: 用`setTimeout`切分

```js
let i = 0; // 全部資料從第0筆開始跑
function processChunk() {
  const start = performance.now(); // 記錄現在的時間

  // 開始跑，但最多只跑16ms
  while (i < data.length && performance.now() - start < 16) {
    data[i] = Math.sqrt(i * 123456); // 跑某筆運算
    i++; // 換下一筆
  }

  // 如果還沒跑完所有資料，就再排一次setTimeout
  if (i < data.length) {
    setTimeout(processChunk, 0); // 下一段馬上再繼續
  }
}
processChunk(); // 啟動
```
每次只跑一小段 ( 16ms )，下一段排進`setTimeout`，`setTimeout`會把 callback 放到任務 queue 排隊，等 main thread 空了再繼續

可以想成是把長任務切很多份，每一份執行完才會將下一份放進 queue，由此讓 main thread 中間可以和使用者互動

16ms 是因為 60 FPS下 1 幀大約 16.6ms，在這時間內跑完就不會卡畫面。


#### 方法二: 用 `requestIdleCallback`

```js
let i = 0;
function work(deadline) {
  // deadline 是瀏覽器給你的時間限制
  while (i < data.length && deadline.timeRemaining() > 0) {
    data[i] = Math.sqrt(i * 123456);
    i++;
  }

  if (i < data.length) {
    requestIdleCallback(work); // 沒跑完就再排一次
  }
}
requestIdleCallback(work); // 啟動
```
`requestIdleCallback`是告訴瀏覽器:「 等你真的有空再來跑這段function 」

通常用在任務不急著跑(ex: log蒐集、背景資料統計等)，可以等瀏覽器空閒時再跑。

簡單來說就是急事用`setTimeout`，不急的用`requestIdleCallback`

---

### throttle(事件節流)、debounce(防抖)

這通常是在處理滑鼠移動、捲動、輸入框變化這種高頻事件

#### 目標
避免某些高頻事件 (`scroll`、`resize`、`input`)觸發的太頻繁導致:
- 重複計算或 DOM 操作造成卡頓
- 浪費資源(尤其在手機、低效能裝置)

#### Throttle (節流)

這個做法是去限制一段時間內最多觸發一次函式

適用的場景:
- `scroll` 事件中追蹤捲動位置
- `resize` 事件中重新計算畫面大小
- 滑鼠移動追蹤滑鼠位置

```js
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  console.log('Scroll triggered');
}, 100));
```

#### Debounce (防抖)

這個想法是如果這個事件會一直發生那就等他停下來再做

定義: 等完全不再觸發事件後再真正執行一次

適用的場景:
- 輸入框自動查詢 (`input`事件)
- 文字搜尋、按鈕防止狂點
- 視窗大小調整後才觸發一次

```js
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const input = document.querySelector('#search');
input.addEventListener('input', debounce(() => {
  console.log('Search triggered');
}, 300));
```

|       | Throttle（節流）              | Debounce（防抖）              |
| ----- | ------------------------- | ------------------------- |
| 觸發時機  | 固定間隔內執行一次                 | 停止觸發一段時間後才執行              |
| 忽略的行為 | 短時間內重複觸發會被略過              | 每次觸發都會延後執行時間              |
| 用途    | scroll, resize, mousemove | input, search, resize end |


---

### `requestAnimationFrame`

這是瀏覽器提供用來優化動畫效能的 API，比`setTimeout`、`setInterval`更適合處理畫面更新

前端開發中常會寫動畫:
- 元素移動、縮放、透明度變化等
- 捲動事件中手動改變 DOM 樣式

以前很多會用`setInterval`處理更新
```js
setInterval(() => {
  // 每 16ms 更新一次畫面
}, 16);
```
但這樣會有幾個問題:
- 跟瀏覽器畫面的更新頻率不同步，容易跳格、卡頓
- 設定 16ms 但瀏覽器可能還沒準備好畫面

#### `requestAnimationFrame`

這是用 API 告訴瀏覽器: 「我要更新畫面，你在下一幀畫面要繪製前再叫我執行這段程式」
```js
function update() {
  // 改變 DOM 或樣式
  box.style.left = box.offsetLeft + 1 + 'px';

  // 下一幀繼續執行
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
```
這樣就能和瀏覽器的畫面更新同步，只有畫面真的要更新時才執行。而且在背景分頁時不會觸發，可以避免浪費資源。

常用在:
- 動畫更新 loop (平滑移動)
- 取代 `setInterval` / `setTimeout`做動畫
- 視差效果、捲動動畫、canvas畫圖

要小心不要放太重的任務在裡面，不然會影響一幀畫面繪製(掉fps)


---

### 避免 Layout Thrashing(布局抖動)

當頻繁讀取/寫入 DOM 的 layout 相關屬性，會重複觸發 reflow 導致效能降低，這種來回操作 layout 的行為叫做 Layout Thrashing

先看一個例子
```js
const items = document.querySelectorAll('.item');
items.forEach(item => {
  // 讀取 layout
  const height = item.offsetHeight;
  
  // 馬上寫入
  item.style.height = (height + 10) + 'px';
});
```
讀取高度時觸發一次 reflow，接著改變高度導致 layout 需要重新計算，下一個元素又讀，又觸發一次 reflow

當有很多元素時就會造成很多次不必要的layout計算。

解法是將讀寫的階段分開
```js
const items = document.querySelectorAll('.item');
const heights = [];

// 先全部讀取
items.forEach(item => {
  heights.push(item.offsetHeight);
});

// 再全部寫入
items.forEach((item, i) => {
  item.style.height = (heights[i] + 10) + 'px';
});
```
這樣就只會有一次 reflow 和一次 repaint，大幅提升效能

簡單來說就是如果需要讀取再繪製的情況要先一次讀完再一次全部繪製，如果是每個元素分開讀取和繪製就會導致每個元素繪製前都需要排好(必須要reflow完)導致浪費。


--- 

## React 效能優化

### Virtual DOM (虛擬DOM)

React 中的 Virtual DOM 是一個用 JS 物件表示的 DOM Tree，它的目的是當狀態變化時，不直接修改真實DOM，而是先比較虛擬 DOM 的差異，再去更新必要的部分，藉此簡單 DOM 操作的成本。

#### Virtual DOM 的運作流程
1) **Render 階段**: Component 的 JSX 會轉成 Virtual DOM (React Element 的樹狀結構)。

2) **Diff 階段**: React 會將新的 Virtual DOM 和上一次的 Virtual DOM 比較 (Reconciliation)。 

比較過程是 Diffing Algorithm，React使用的策略是:
- 相同 Content type 才會繼續比較內容
- list rendering 會依賴 `key` 幫助比較 (這是key很重要的原因)

3) **Commit 階段**: React 找出差異後，會有選擇的對真實 DOM 做最少的更新( Patch )

整個流程就是: **Virtual DOM** + **Diffing** + **Reconciliation**


#### 為什麼要用 Virtual DOM 

- 操作真實 DOM 的成本是高的，因為每次改變都可能觸發 Reflow、Repaint、Layout Thrashing
- 使用 Virtual DOM 可以減少直接操作 DOM 的次數 (集中在 commit 階段)、可以批次更新降低效能開銷、可以做任務切分。


#### Virtual DOM 的限制
1) 比較差異比直接操作真實 DOM 快，但還是有成本:
- Diffing 過程是 O(n)，還是需要成本
- 如果每次都重新 render 一大段 component 還是會慢
2) 所有 render 都會建立新的 Virtual DOM:
- 每當component需要re-render (state/props/context改變等) 就會產生新的 Virtual DOM
- 還是要用`memo`、`useMemo`，來避免不必要的 re-render
3) 不會自動優化畫面更新的策略
- 動畫、滾動這類 UI 較重的情境還是需要自己用 `requestAnimationFrame` 這類的方法協助


---

### React.memo、useMemo、useCallback

這三個都是用來避免不必要的 re-render 或 重複運算

#### React.memo

用在 function component 上，如果傳入 component 的 props 沒有改變就跳過 re-render

用法:
```js
const MyComponent = React.memo(function MyComponent(props) {
  // ...
});
``` 
這樣只會比較 props 有沒有變化，不管 state、context，也不管子元素內部變化。

- 如果 props 是 object/array/function，每次傳新 reference 會失效，要搭配 `useMemo`、`useCallback` 使用


#### useMemo
用來記住一個值，只有 dependency array 內的變數改變時才重新計算

```js
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```
- 避免每次 render 都重新算計算過的東西
- 常用在排序、大量計算、過濾等

#### useCallback
用來記住一個函式，只有在 dependency array 內的變數改變才會建立新函式

```js
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```
- 避免函式在每次 render 都變成新的引用
- 避免子元件因為收到新函式 re-render

| Hook / 技術     | 解決問題             | 使用時機             |
| ------------- | ---------------- | ---------------- |
| `React.memo`  | 跳過子元件的 re-render | 子元件 props 沒變     |
| `useMemo`     | 避免重複計算值          | 計算成本高、依賴沒變       |
| `useCallback` | 避免函式引用變動         | 傳函式給 `memo` 子元件時 |


---

### 避免不必要的 re-render
每當 React component 重新 render 時，會
- 重新執行 function component 的程式碼
- 重新建立 Virtual DOM
- 比對 (diff) Virtual DOM -> 更新 DOM
有時候元件的 props / state 根本沒改變，或變化不影響畫面，這樣 render 就是不必要的 re-render，會浪費效能

#### 常見的 re-render 來源
- 父層 re-render -> 子層跟著 re-render
- props 為新的 object / array / function (內容相同但 reference 不同導致不必要的 re-render)
- context 改變 -> 用到 context 的所有 component 都會 re-render
- state 改變但值一樣 (setState()兩次同樣的東西也會觸發 re-render )

#### 優化方法

1) 用`React.memo`包住不常改變的元件:

讓他在 props 沒改變時跳過 re-render
```js
const Child = React.memo(function Child(props) {
  return <div>{props.value}</div>;
});
```
2) 用`useCallback`、`useMemo`穩定 reference:

避免每次重新 render 都產生新函式或新資料
```js
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);
```
3) 拆分 component、局部 state:

讓 state 只影響需要的部分，減少影響面

4) 避免無意義的`setState`

```
if (newName !== name) setName(newName);
```
增加判定是否相同值 避免值沒變還 re-render

重點:
- `React.memo`: 跳過不變的 component
- `useCallback`/`useMemo`: 穩定傳入 props
- 拆分 state: 只讓必要的部分更新


---

### list rendering 最佳化 (key、分割列表)

#### 使用正確的 key
React 會需要 `key` 來判斷前後 vitual DOM，判斷哪些元素可以重用、哪些要新增/刪除。`key`使用錯誤會讓 React 誤判，造成不必要的 re-render 或 DOM 操作。

可以看這個例子

用 index 當 key
```jsx
items.map((item, index) => <li key={index}>{item}</li>)
```
如果資料位置變動(ex: 新增/刪除)，index會改變造成全部重新渲染。

最好是要用唯一/穩定的 id
```jsx
items.map(item => <li key={item.id}>{item.name}</li>)
```

#### 大型 list 的分段渲染
當 list 非常大(幾百筆)時，一次全部渲染會很卡

解決方法:
1) infinite scroll (分頁):

只渲染需要顯示的部分，其他等滑動時再載入。

2) 列表虛擬化:

用像 `react-window` 或 `react-virtualized` 這種套件，只渲染畫面上可見的項目
```jsx
import { FixedSizeList as List } from 'react-window';

<List
  height={300}
  itemCount={1000}
  itemSize={35}
  width={300}
>
  {({ index, style }) => (
    <div style={style}>Row {index}</div>
  )}
</List>

```

3) Chunked rendering (分批載入):

手動用 `setTimeout` 或 `requestIdleCallback` 把一堆資料切分批 render，手機裝置常用

這些搭配使用可以減少 paint 的次數和 reflow 的成本，互動更流暢。

---

### Lazy loading(懶加載) / code splitting(程式碼切割)

#### Lazy loading
簡單來說就是用到再載入
```jsx
import React, { lazy, Suspense } from 'react';

const ProfilePage = lazy(() => import('./ProfilePage'));

function App() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
```
- `lazy()`: 告訴 React 這個 component 是 lazy loading 的
- `Suspense`: 在 component 載入期間顯示 fallback (ex: 載入中)

#### Code Splitting
簡單來說就是將一個大檔案切成多個檔案，避免一次下載全部的程式碼， lazy loading 就是其中一種方法

如果用 Vite、Webpack、Next.js，會自動支援 code splitting，只要用 `lazy()` 動態 import component 就會自動打包成獨立檔案
```
main.js
profilePage~chunk.js   <-- 懶加載的部分

```

#### 適合Lazy loading的component:
- 不常出現的頁面
- 圖表、地圖、編輯器等大型套件

要記得包在 `Suspense` 裡面才能顯示 fallback UI 

loading 元件最好是簡單的文字或 spinner ，避免 loadaing 時卡住畫面



