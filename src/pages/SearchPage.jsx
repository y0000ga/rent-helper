import classes from './SearchPage.module.scss'
import { memos, lineAuthUrl } from '../configData'
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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// store
import { searchActions } from '../store/search-slice'
// api
import { searchGetAllApi } from '../api/searchApi'

const SearchPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const searchCollection = useSelector((state) => state.search.searchCollection)
  const isSearchShown = useSelector((state) => state.search.isSearchShown)
  const isSearchUpdated = useSelector((state) => state.search.isSearchUpdated)
  const isEdit = useSelector((state) => state.search.isEdit)
  const hasLineToken = useSelector((state) => state.user.hasLineToken)
  const [isLoading, setIsLoading] = useState(true)
  const userId = localStorage.getItem('userId')
 
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
  }, [dispatch, hasLineToken, navigate, token])

  useEffect(() => {
    const searchGetAll = async () => {
      const res = await searchGetAllApi()
      setIsLoading(false)
      dispatch(searchActions.getAllSearchCollection(res.data.searches))
    }
    searchGetAll()
  }, [dispatch, isSearchUpdated, hasLineToken])

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
    if (isSearchShown === true) {
      dispatch(searchActions.setIsSearchShown(false))
    } else {
      dispatch(searchActions.clearCurrentSearch())
      dispatch(searchActions.setIsSearchShown(true))
    }
  }

  return (
    <LayoutWrapper>
      <div className={classes.container}>
        <div className={classes.memoContainer}>
          <div className={classes.title}>給使用者的提醒</div>
          <ul>
            <li className={classes.memo} key='若尚未建立line連結, 請先點擊此處'>
              若尚未建立line連結, 請先點擊
              <a href={`${lineAuthUrl}${userId}`}>此處</a>
            </li>
            {memos.map((data) => (
              <li className={classes.memo} key={data}>
                {data}
              </li>
            ))}
          </ul>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        {isLoading === true ? (
          <div className={classes.loadingContainer}>
            <Loop
              className={classes.loading}
              sx={{ cursor: 'wait', fontSize: '54px' }}
              color='success'
            />
            <p>確認 line 已認證後，請重整此畫面</p>
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
            endIcon={isSearchShown === false ? <Add /> : <Close />}
          >
            {isSearchShown === false
              ? '新增'
              : isEdit === true
              ? '取消編輯'
              : '取消新增'}
            條件組合
          </Button>
        </div>

        {isSearchShown === true && (
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
