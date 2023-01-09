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
  notCoverLimitation,
} from '../configData'
import { useSelector, useDispatch } from 'react-redux'
import { searchActions } from '../store/search-slice'
import { searchCreateApi, searchEditApi } from '../api/searchApi'
import Swal from 'sweetalert2'
import { errorMessages } from '../configData'
import { useState } from 'react'
import { Loop } from '@mui/icons-material'

const SearchForm = () => {
  const currentSearch = useSelector((state) => state.search.currentSearch)
  const dispatch = useDispatch()
  const isEdit = useSelector((state) => state.search.isEdit)
  const [isLoading, setIsLoading] = useState(false)
  const isNameValid =
    currentSearch.name.trim().length < 20 &&
    currentSearch.name.trim().length > 1
  const isKeywordValid = currentSearch.keyword.trim().length < 20
  const isSectionsValid =
    currentSearch.sections.length > 1 && currentSearch.sections.length <= 5
  const isPriceValid =
    currentSearch.maxPrice > 0 &&
    currentSearch.minPrice >= 0 &&
    currentSearch.maxPrice <= 50000 &&
    currentSearch.maxPrice > currentSearch.minPrice

  const isAreaValid =
    currentSearch.maxArea > 0 &&
    currentSearch.minArea >= 0 &&
    currentSearch.maxArea <= 50 &&
    currentSearch.maxArea > currentSearch.minArea

  const submitErrorMessage = `${!isNameValid ? '條件組合名稱欄位、' : ''}${
    !isKeywordValid ? '其他關鍵字欄位、' : ''
  }${!isSectionsValid ? '位置欄位、' : ''}${!isPriceValid ? '租金欄位、' : ''}${
    !isAreaValid ? '坪數欄位、' : ''
  }`.replace(/.$/, '')

  const submitFormHandler = async () => {
    if (
      (isNameValid &&
        isKeywordValid &&
        isSectionsValid &&
        isPriceValid &&
        isAreaValid) === false
    ) {
      Swal.fire({
        icon: 'warning',
        title: '請重新確認以下欄位是否有誤',
        text: `${submitErrorMessage}`,
      })
      return
    }
    if (isEdit === true) {
      await searchEditApi(currentSearch)
      dispatch(searchActions.setIsSearchUpdated())
      dispatch(searchActions.setIsSearchShown(false))
      dispatch(searchActions.setIsEdit(false))
      return
    }
    setIsLoading(true)
    const res = await searchCreateApi(currentSearch)
    if (res.status !== 200) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: `${res.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      setIsLoading(false)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '條件組合新增成功',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    dispatch(searchActions.setIsSearchShown(false))
    dispatch(searchActions.setIsSearchUpdated())
  }
  return (
    <>
      {isLoading ? (
        <div className={classes.loadingContainer}>
          <Loop
            className={classes.loading}
            sx={{ cursor: 'wait', fontSize: '54px' }}
            color='success'
          />
          儲存搜尋條件組合中
        </div>
      ) : (
        <>
          <div className={classes.option__container}>
            <p className={classes.title}>
              條件組合名稱<span className={classes.highlight}> *</span>
            </p>
            <TextField
              id='searchName'
              size='small'
              value={currentSearch.name}
              className={classes.textField}
              style={{ marginLeft: '10px' }}
              onChange={(event) => {
                dispatch(searchActions.setName(event.target.value))
              }}
            />
            {currentSearch.name.trim().length > 20 && (
              <p className={classes.errorMessage}>{errorMessages.name}</p>
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
              value={currentSearch.keyword}
              onChange={(event) => {
                dispatch(searchActions.setKeyword(event.target.value))
              }}
            />
            {currentSearch.keyword.trim().length > 20 && (
              <p className={classes.errorMessage}>{errorMessages.keyword}</p>
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
              {currentSearch.sections.length === 5 && (
                <p className={classes.errorMessage}>{errorMessages.sections}</p>
              )}
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
            <p className={classes.title}>類型</p>
            <Select
              labelId='kind'
              id='kind'
              label='kind'
              sx={{ width: '150px' }}
              defaultValue={currentSearch.kind}
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
            <p className={classes.title}>型態</p>
            <Select
              labelId='shape'
              id='shape'
              label='shape'
              sx={{ width: '150px' }}
              defaultValue={currentSearch.shape}
            >
              {shape.map((data) => (
                <MenuItem
                  value={data}
                  key={data === '不限' ? '型態不限' : data}
                >
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
                  dispatch(
                    searchActions.setMinPrice(Number(event.target.value))
                  )
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
                  dispatch(
                    searchActions.setMaxPrice(Number(event.target.value))
                  )
                }
              />
              <p>元</p>
              <br />
              <div>
                {currentSearch.maxPrice < currentSearch.minPrice && (
                  <p className={classes.errorMessage}>
                    {errorMessages.minPrice}
                  </p>
                )}
                {(currentSearch.maxPrice < 0 || currentSearch.minPrice < 0) && (
                  <p className={classes.errorMessage}>{errorMessages.number}</p>
                )}
                {currentSearch.maxPrice > 50000 && (
                  <p className={classes.errorMessage}>
                    {errorMessages.maxPrice}
                  </p>
                )}
              </div>
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
                value={currentSearch.minArea}
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
                value={currentSearch.maxArea}
                onChange={(event) =>
                  dispatch(searchActions.setMaxArea(Number(event.target.value)))
                }
              />
              <p>坪</p>
              <div>
                {currentSearch.maxArea < currentSearch.minArea && (
                  <p className={classes.errorMessage}>
                    {errorMessages.minArea}
                  </p>
                )}
                {(currentSearch.maxArea < 0 || currentSearch.minArea < 0) && (
                  <p className={classes.errorMessage}>{errorMessages.number}</p>
                )}
                {currentSearch.maxArea > 50 && (
                  <p className={classes.errorMessage}>
                    {errorMessages.maxArea}
                  </p>
                )}
              </div>
            </FormGroup>
          </div>
          <Divider sx={{ margin: '15px 8px' }} />
          <div className={classes.option__container}>
            <p className={classes.title}>限制</p>
            <FormGroup className={classes.options__content}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currentSearch.notCover}
                    onClick={() => {
                      dispatch(searchActions.setNotCover())
                    }}
                  />
                }
                label={notCoverLimitation}
                key={notCoverLimitation}
              />
            </FormGroup>
          </div>
          <Button
            variant='contained'
            className={classes.submitBtn}
            onClick={submitFormHandler}
          >
            儲存搜尋條件組合
          </Button>
        </>
      )}
    </>
  )
}

export default SearchForm
