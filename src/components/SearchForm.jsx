import classes from './SearchForm.module.scss'
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Divider,
  Select,
  MenuItem,
} from '@mui/material'
import {
  taipeiDistData,
  newpeiDistData,
  kind,
  shape,
  notCover,
} from '../configData'
import { useSelector, useDispatch } from 'react-redux'
import { searchActions } from '../store/search-slice'
import { searchCreateApi } from '../api/searchApi'

const SearchForm = () => {
  const currentSearch = useSelector((state) => state.search.currentSearch)
  const dispatch = useDispatch()

  return (
    <>
      <div className={classes.option__container}>
        <p className={classes.title}>
          條件組合名稱<span className={classes.highlight}> *</span>
        </p>
        <TextField
          id='searchName'
          size='small'
          className={classes.textField}
          style={{ marginLeft: '10px' }}
          onChange={(event) => {
            dispatch(searchActions.setName(event.target.value))
          }}
        />
        {currentSearch.name.trim().length > 20 && (
          <p className={classes.errorMessage}>字數限制 1 - 20 字</p>
        )}
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>其他關鍵字</p>
        <TextField
          id='searchName'
          size='small'
          className={classes.textField}
          style={{ marginLeft: '10px' }}
          onChange={(event) => {
            dispatch(searchActions.setKeyword(event.target.value))
          }}
        />
        {currentSearch.keyword.trim().length > 20 && (
          <p className={classes.errorMessage}>字數限制 1 - 20 字</p>
        )}
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>
          位置<span className={classes.highlight}> *</span>
        </p>
        <FormGroup className={classes.options__content}>
          <Button
            variant='text'
            onClick={() => {
              dispatch(searchActions.setRegion('台北市'))
              dispatch(searchActions.setSections(null))
            }}
          >
            台北市
          </Button>
          <Button
            variant='text'
            onClick={() => {
              dispatch(searchActions.setRegion('新北市'))
              dispatch(searchActions.setSections(null))
            }}
          >
            新北市
          </Button>
          <div>
            {currentSearch.region === '台北市'
              ? taipeiDistData.map((data) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={currentSearch.sections.includes(data)}
                        onClick={() => {
                          dispatch(searchActions.setSections(data))
                        }}
                      />
                    }
                    label={data}
                    key={data}
                  />
                ))
              : newpeiDistData.map((data) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={currentSearch.sections.includes(data)}
                        onClick={() => {
                          dispatch(searchActions.setSections(data))
                        }}
                      />
                    }
                    label={data}
                    key={data}
                  />
                ))}
          </div>
        </FormGroup>
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>
          類型<span className={classes.highlight}> *</span>
        </p>
        <Select
          labelId='kind'
          id='kind'
          label='kind'
          sx={{ width: '150px' }}
          defaultValue='不限'
        >
          {kind.map((data) => (
            <MenuItem
              value={data}
              key={data === '不限' ? '類型不限' : data}
              onClick={() => {
                dispatch(searchActions.setKind(data))
              }}
            >
              {data}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>
          型態<span className={classes.highlight}> *</span>
        </p>
        <Select
          labelId='shape'
          id='shape'
          label='shape'
          sx={{ width: '150px' }}
          defaultValue='不限'
        >
          {shape.map((data) => (
            <MenuItem value={data} key={data === '不限' ? '型態不限' : data}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>
          租金<span className={classes.highlight}> *</span>
        </p>
        <FormGroup className={classes.options__content}>
          <TextField
            id='rentMin'
            type='number'
            size='small'
            className={classes.textField}
            value={currentSearch.minPrice}
            placeholder='下限'
            onChange={(event) =>
              dispatch(searchActions.setMinPrice(Number(event.target.value)))
            }
          />
          <p>到</p>
          <TextField
            type='number'
            id='rentMax'
            size='small'
            className={classes.textField}
            value={currentSearch.maxPrice}
            placeholder='上限'
            onChange={(event) =>
              dispatch(searchActions.setMaxPrice(Number(event.target.value)))
            }
          />
          <p>元</p>
          {(currentSearch.maxPrice < 0 || currentSearch.minPrice < 0) && (
            <p className={classes.errorMessage}>坪數設定不得為負值</p>
          )}
        </FormGroup>
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>
          坪數<span className={classes.highlight}> *</span>
        </p>
        <FormGroup className={classes.options__content}>
          <TextField
            type='number'
            id='spaceMin'
            size='small'
            className={classes.textField}
            placeholder='下限'
            onChange={(event) =>
              dispatch(searchActions.setMinArea(Number(event.target.value)))
            }
          />
          <p>到</p>
          <TextField
            type='number'
            id='spaceMax'
            size='small'
            className={classes.textField}
            placeholder='上限'
            onChange={(event) =>
              dispatch(searchActions.setMaxArea(Number(event.target.value)))
            }
          />
          <p>坪</p>
          {(currentSearch.maxArea < 0 || currentSearch.minArea < 0) && (
            <p className={classes.errorMessage}>坪數設定不得為負值</p>
          )}
        </FormGroup>
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>限制</p>
        <FormGroup className={classes.options__content}>
          {notCover.map((data) => (
            <FormControlLabel control={<Checkbox />} label={data} key={data} />
          ))}
        </FormGroup>
      </div>
      <Button
        variant='contained'
        className={classes.submitBtn}
        onClick={async () => {
          await searchCreateApi(currentSearch)
          dispatch(searchActions.setIsSearchUpdated())
          dispatch(searchActions.setIsSearchShown())
          dispatch(searchActions.clearCurrentSearch())
        }}
      >
        儲存搜尋條件組合
      </Button>
    </>
  )
}

export default SearchForm
