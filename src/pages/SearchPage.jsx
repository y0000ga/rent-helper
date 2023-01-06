import classes from './SearchPage.module.scss'
import LayoutWrapper from '../Layout/LayoutWrapper.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ConditionList from '../components/ConditionList'
import SearchForm from '../components/SearchForm'
import { Button, FormControlLabel, Checkbox, Divider } from '@mui/material'
import { searchActions } from '../store/search-slice'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import { searchDeleteApi, searchGetAllApi } from '../api/searchApi'
import LoopIcon from '@mui/icons-material/Loop'
import CloseIcon from '@mui/icons-material/Close'

const SearchPage = () => {
  const searchCollection = useSelector((state) => state.search.searchCollection)
  const isSearchShown = useSelector((state) => state.search.isSearchShown)
  const isSearchUpdated = useSelector((state) => state.search.isSearchUpdated)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    const searchGetAll = async () => {
      const res = await searchGetAllApi()
      setIsLoading(false)
      dispatch(searchActions.getAllSearchCollection(res.data.searches))
    }
    searchGetAll()
  }, [dispatch, navigate, token, isSearchUpdated])
  return (
    <LayoutWrapper>
      <div className={classes.container}>
        {isLoading === true ? (
          <div className={classes.loadingContainer}>
            <LoopIcon
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
                {searchCollection.map((data) => (
                  <div className={classes.searchItem} key={data.name}>
                    <RemoveCircleIcon
                      className={classes.removeCircleIcon}
                      onClick={async () => {
                        await searchDeleteApi({ id: data.id })
                        dispatch(searchActions.setIsSearchUpdated())
                      }}
                    />
                    <EditIcon className={classes.editIcon} />
                    <FormControlLabel
                      control={<Checkbox />}
                      label={data.name}
                      sx={{ margin: '0px' }}
                      checked={true}
                    />
                    <ConditionList data={data} />
                    <Divider sx={{ margin: '15px 8px' }} />
                  </div>
                ))}
              </>
            )}
          </>
        )}

        <div style={{ display: 'flex' }}>
          <Button
            variant='contained'
            sx={{ margin: 1, width: '180px' }}
            endIcon={<CheckIcon />}
          >
            設定條件組合
          </Button>
          <Button
            variant='outlined'
            sx={{ margin: 1, width: '180px' }}
            onClick={() => {
              dispatch(searchActions.setIsSearchShown())
            }}
            endIcon={isSearchShown === false ? <AddIcon /> : <CloseIcon />}
          >
            {isSearchShown === false ? '新增條件組合' : '取消新增條件組合'}
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
