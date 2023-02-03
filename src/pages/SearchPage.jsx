import classes from './SearchPage.module.scss'
// material UI
import { Button, Divider } from '@mui/material'
import { Add, Loop, Close } from '@mui/icons-material'
// component
import LayoutWrapper from '../Layout/LayoutWrapper.jsx'
import SearchItem from '../components/SearchItem'
import SearchForm from '../components/SearchForm'
import Swal from 'sweetalert2'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// store
import { searchActions } from '../store/search-slice'
// api
import { searchGetAll } from '../store/search-slice'

const SearchPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const searchCollection = useSelector((state) => state.search.searchCollection)
  const isSearchUpdated = useSelector((state) => state.search.isSearchUpdated)
  const isSearchLoading = useSelector((state) => state.search.isSearchLoading)
  const lineAuthUrl = useSelector((state) => state.search.lineAuthUrl)
  const searchFormStatus = useSelector((state) => state.search.searchFormStatus)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
  }, [dispatch, navigate, token])

  useEffect(() => {
    dispatch(searchGetAll())
  }, [dispatch, isSearchUpdated])

  const searchShownHandler = () => {
    if (searchCollection.length === 5) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '條件組合已達5個,無法新增',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    if (searchFormStatus === 'edit' || searchFormStatus === 'createNew') {
      dispatch(searchActions.setSearchFormStatus('finish'))
      dispatch(searchActions.clearCurrentSearch())
    } else {
      dispatch(searchActions.clearCurrentSearch())
      dispatch(searchActions.setSearchFormStatus('createNew'))
    }
  }

  return (
    <LayoutWrapper>
      <div className={classes.container}>
        <div className={classes.memoContainer}>
          <div className={classes.title}>給使用者的提醒</div>
          <ul>
            <li className={classes.memo} key='memo1'>
              程式會根據所有條件組合到 591 租屋網上搜尋新上架物件，每 15
              分鐘傳送通知到您的 Line
            </li>
            <li className={classes.memo} key='memo2'>
              若尚未建立 Line 帳號連結或想更改連結 Line 帳號, 請點擊
              <a href={lineAuthUrl}>此處</a>
            </li>

            <li className={classes.memo} key='memo3'>
              * 記號代表該欄位必填
            </li>
          </ul>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        {isSearchLoading === true ? (
          <div className={classes.loadingContainer}>
            <Loop
              className={classes.loading}
              sx={{ cursor: 'wait', fontSize: '54px' }}
              color='success'
            />
          </div>
        ) : (
          <>
            {searchCollection.length === 0 ? (
              <>
                <p className={classes.emptyMessage}>目前沒有任何搜尋條件組合</p>
                <Divider sx={{ margin: '15px 8px' }} />
              </>
            ) : (
              <>
                {searchCollection.map((data, index) => (
                  <SearchItem data={data} index={index} key={data.id} />
                ))}
              </>
            )}
          </>
        )}
        <div style={{ display: 'flex' }}>
          <Button
            variant='outlined'
            sx={{ margin: 1, width: '180px' }}
            onClick={searchShownHandler}
            endIcon={searchFormStatus === 'finish' ? <Add /> : <Close />}
          >
            {searchFormStatus === 'edit' && '取消編輯'}
            {searchFormStatus === 'createNew' && '取消新增'}
            {searchFormStatus === 'finish' && '新增'}
            條件組合
          </Button>
        </div>

        {(searchFormStatus === 'edit' || searchFormStatus === 'createNew') && (
          <>
            <Divider sx={{ margin: '15px 8px' }} />
            <SearchForm />
          </>
        )}
      </div>
    </LayoutWrapper>
  )
}

export default SearchPage
