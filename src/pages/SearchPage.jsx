import classes from './SearchPage.module.scss'
import GridSystem from '../Layout/GridSystem.jsx'
import { useSelector } from 'react-redux'
import ConditionList from '../components/ConditionList'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from '@mui/material'

const taipeiDists = [
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

const newpeiDists = [
  '板橋區',
  '三重區',
  '中和區',
  '永和區',
  '新莊區',
  '新店區',
  '土城區',
  '蘆洲區',
  '汐止區',
  '樹林區',
  '鶯歌區',
  '三峽區',
  '淡水區',
  '瑞芳區',
  '五股區',
  '泰山區',
  '林口區',
  '八里區',
  '深坑區',
  '石碇區',
  '坪林區',
  '三芝區',
  '石門區',
  '金山區',
  '萬里區',
  '平溪區',
  '雙溪區',
  '貢寮區',
  '烏來區',
]

const SearchPage = () => {
  const currentSearch = useSelector((state) => state.search.currentSearch)
  return (
    <GridSystem>
      <div className={classes.container}>
        <div className={classes.conditionSelector}>
          <FormControl sx={{ m: 1, minWidth: 175 }}>
            <InputLabel id='conditionSelector'>選擇搜尋條件組合</InputLabel>
            <Select
              labelId='conditionSelector'
              id='conditionSelector'
              label='conditionSelector'
            >
              <MenuItem>組合一</MenuItem>
              <MenuItem>組合二</MenuItem>
              <MenuItem>組合三</MenuItem>
              <MenuItem>組合四</MenuItem>
              <MenuItem>組合五</MenuItem>
            </Select>
          </FormControl>
        </div>
        <ConditionList data={currentSearch} />
        <TextField
          id='spaceMin'
          size='small'
          placeholder='請輸入額外搜尋條件'
          className={classes.textField}
          style={{ margin: '20px 0 15px 0px' }}
        />
        <div className={classes.separator}></div>
        <div className={classes.option__container}>
          <p className={classes.title}>
            位置<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <Button variant='text'>台北市</Button>
            <Button variant='text'>新北市</Button>
            <div>
              {taipeiDists.map((data) => (
                <FormControlLabel control={<Checkbox />} label={data} />
              ))}
              {/* {newpeiDists.map((data) => (
              <FormControlLabel control={<Checkbox />} label={data} />
            ))} */}
            </div>
          </FormGroup>
        </div>
        <div className={classes.separator}></div>
        <div className={classes.option__container}>
          <p className={classes.title}>
            類型<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <FormControlLabel control={<Checkbox />} label='不限' />
            <FormControlLabel control={<Checkbox />} label='整層住家' />
            <FormControlLabel control={<Checkbox />} label='獨立套房' />
            <FormControlLabel control={<Checkbox />} label='分租套房' />
            <FormControlLabel control={<Checkbox />} label='雅房' />
          </FormGroup>
        </div>
        <div className={classes.separator}></div>
        <div className={classes.option__container}>
          <p className={classes.title}>
            型態<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <FormControlLabel control={<Checkbox />} label='不限' />
            <FormControlLabel control={<Checkbox />} label='公寓' />
            <FormControlLabel control={<Checkbox />} label='電梯大樓' />
          </FormGroup>
        </div>
        <div className={classes.separator}></div>
        <div className={classes.option__container}>
          <p className={classes.title}>
            租金<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <TextField
              id='spaceMin'
              size='small'
              className={classes.textField}
            />
            <p>到</p>
            <TextField
              id='spaceMax'
              size='small'
              className={classes.textField}
            />
            <p>元</p>
          </FormGroup>
        </div>
        <div className={classes.separator}></div>
        <div className={classes.option__container}>
          <p className={classes.title}>
            坪數<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <TextField
              id='spaceMin'
              size='small'
              className={classes.textField}
            />
            <p>到</p>
            <TextField
              id='spaceMax'
              size='small'
              className={classes.textField}
            />
            <p>坪</p>
          </FormGroup>
        </div>
        <div className={classes.separator}></div>
        <div className={classes.option__container}>
          <p className={classes.title}>限制</p>
          <FormGroup className={classes.options__content}>
            <FormControlLabel control={<Checkbox />} label='排除頂樓加蓋' />
          </FormGroup>
        </div>
        <Button variant='contained' className={classes.submitBtn}>提交搜尋條件</Button>
      </div>
    </GridSystem>
  )
}

export default SearchPage
