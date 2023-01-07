export const baseURL = 'https://412e-223-136-148-157.jp.ngrok.io/api/'

export const navItemData = [
  { title: '搜尋', pathname: '/search' },
  { title: '收藏', pathname: '/collect' },
  { title: '自定義條件', pathname: '/setting' },
  { title: '登出', pathname: '/login' },
]

export const taipeiDistData = [
  '松山區',
  '信義區',
  '大安區',
  '中山區',
  '中正區',
  '大同區',
  '萬華區',
  '文山區',
  '南港區',
  '內湖區',
  '士林區',
  '北投區',
]

export const newpeiDistData = [
  '板橋區',
  '三重區',
  '中和區',
  '永和區',
  '新莊區',
  '新店區',
  '土城區',
  '蘆洲區',
  '汐止區',
  '三峽區',
  '淡水區',
  '林口區',
]

export const kind = ['不限', '整層住家', '獨立套房', '分租套房', '雅房']

export const shape = ['不限', '公寓', '電梯大樓']

export const notCoverLimitation = ['排除頂樓加蓋']

export const memos = [
  '設定條件組合的位置時，只能選擇同為台北市或同為新北市的行政區，類型與型態預設為不限',
  '* 記號代表該欄位必填',
  '最多新增五個條件組合',
  '程式根據所有條件組合到 591 租屋網上搜尋合適物件，同時傳送通知到您的 line',
  '新增或編輯條件組合後，需 20 分鐘後可以成功連動 Line 推薦',
]

export const errorMessages = {
  name: '不可超過 20 個字',
  keyword: '不可超過 20 個字',
  sections: '最多選擇五個行政區',
  minPrice: '下限不得大於上限',
  maxPrice: '不得大於 50000',
  minArea: '下限不得大於上限',
  maxArea: '不得大於 50',
  number: '不得為負值',
  condition: '最多設定 20 字',
}
