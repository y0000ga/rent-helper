# Rent Helper 租屋小幫手
Rent Helper 租屋小幫手是一個使用 React.js 與 Material UI 等工具所打造的前端專案，搭配後端專案 [Rent Helper API](https://github.com/SimonHung8/rent-helper-api) 與[設計稿](https://www.figma.com/file/aVZybAfmifxvDPZv0ql1PZ/rent-helper?node-id=0%3A1)，提供使用者可以在 Line 上接收最新 591 租屋資訊的功能，同時可以在 Rent Helper 平台上收藏感興趣的物件，並針對自定義條件、額外支出與個人評論做相關編輯。

### [DEMO 頁面](https://y0000ga.github.io/rent-helper/)

## 功能與畫面
測試帳號密碼 **(已和其他 Line 帳號連結，故僅供平台操作，若使用者需要使用 Line 通知合適物件，則須自行註冊新的帳號密碼)**
```
帳號：testuser
密碼：Testuser1!
```
✅**註冊與登入**
1. 使用者註冊帳號後可建立專屬搜尋條件組合、收藏物件與自定義條件
2. 帳號與密碼若不符合設定限制，Error Message 會出現以提示使用者

![image](https://user-images.githubusercontent.com/111579529/211322906-90480f69-de90-4e39-bcfb-89c47c3b8fb1.png)

✅**自定義條件**
1. 使用者可以設定額外的自定義條件
2. 自定義條件限定 10 組

![image](https://user-images.githubusercontent.com/111579529/211322870-766e0854-9534-43aa-80dc-73337fe693fd.png)

✅**收藏**
1. 使用者可在收藏總覽頁面依據是否符合自定義條件進行篩選
2. 使用者貼上591頁面的網址後，可收藏感興趣的591物件，其基本資訊(名稱、地區、類型、型態、租金、坪數、照片、設備)將自動代入
3. 僅支援台北市/新北市部分行政區、月租 50000 以下與坪數50坪以下
4. 使用者可針對個別物件撰寫個人備註、增加潛在額外支出與設定是否符合自定義條件

![image](https://user-images.githubusercontent.com/111579529/211322653-80e4d1c6-2242-4c84-9456-6a88493b421b.png)
![image](https://user-images.githubusercontent.com/111579529/211322748-d0646f19-4a32-4fe8-be23-95eb2c3371fb.png)


✅**搜尋**

1. 使用者可於搜尋頁面建立搜尋條件組合
2. 僅支援台北市/新北市部分行政區、月租 50000 以下與坪數50坪以下
3. 新增搜尋條件組合後 20 分鐘，若以將 Line 與帳號連結，則可於 Line Notify 收到與其相符的物件資訊

![image](https://user-images.githubusercontent.com/111579529/211322553-111c46ff-cae8-4613-a674-1eba323c2d2f.png)

✅**Line 通知**
1. 使用者創建帳號後進入搜尋頁面，即引導至 Line Notify 連動頁面
2. 使用者成功連動 Line 帳號與 Line Notify，立即出現 **與「租屋小幫手」連動完成** 訊息

![image](https://user-images.githubusercontent.com/111579529/211353224-34c47793-049a-4408-b0e5-4a6111e8d065.png)


## 安裝
### 取得專案
```
git clone https://github.com/y0000ga/rent-helper.git
```
### 移動到專案內
```
cd rent-helper
```
### 安裝套件
```
npm install
```
### 運行專案
```
npm start
```
### 開啟專案
在瀏覽器網址列輸入以下即可看到畫面
```
http://localhost:3000/
```
## 資料夾說明
* Layout - 重複網站結構放置處
* UI - 具重複性之小型元件放置處
* api - 串 API 相關方法放置處
* assets/icons - 靜態資源放置處
* pages - 各頁面完整結構放置處
## 專案主要技術
* React
* React Router Dom
* Redux
* Material UI
* Redux Toolkit 
* Axios
* Formik
* sass
* yup
## 開發人員
[Simon Hung | 後端](https://github.com/SimonHung8)

[Yoga Huang | 前端](https://github.com/y0000ga)
## 聯絡作者
可以透過以下方式與我聯絡

[Medium 連結](https://medium.com/@shiusun246)
