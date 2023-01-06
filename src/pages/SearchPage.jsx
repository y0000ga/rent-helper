import classes from './SearchPage.module.scss'
import LayoutWrapper from '../Layout/LayoutWrapper.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ConditionList from '../components/ConditionList'
import SearchForm from '../components/SearchForm'
import { Button, FormControlLabel, Checkbox, Divider } from '@mui/material'
import { searchActions } from '../store/search-slice'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'

const SearchPage = () => {
  const searchCollection = useSelector((state) => state.search.searchCollection)
  const isSearchShown = useSelector((state) => state.search.isSearchShown)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])
  return (
    <LayoutWrapper>
      <div className={classes.container}>
        {searchCollection.map((data) => (
          <div className={classes.searchItem} key={data.name}>
            <RemoveCircleIcon
              className={classes.removeCircleIcon}
              onClick={() => {
                dispatch(searchActions.removeSearchCondition(data.title))
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
        <div style={{ display: 'flex' }}>
          <Button
            variant='contained'
            sx={{ margin: 1, width: '150px' }}
            endIcon={<CheckIcon />}
          >
            設定組合條件
          </Button>
          <Button
            variant='outlined'
            sx={{ margin: 1, width: '150px' }}
            onClick={() => {
              dispatch(searchActions.setIsSearchShown())
            }}
            endIcon={<AddIcon />}
          >
            新增組合條件
          </Button>
        </div>

        {isSearchShown === true ? (
          <>
            <Divider sx={{ margin: '15px 8px' }} />
            <SearchForm />
          </>
        ) : (
          <Button variant='contained' className={classes.submitBtn}>
            確認搜尋條件組合
          </Button>
        )}
      </div>
    </LayoutWrapper>
  )
}

export default SearchPage
