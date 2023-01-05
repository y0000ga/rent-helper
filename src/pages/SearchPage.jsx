import classes from './SearchPage.module.scss'
import LayoutWrapper from '../Layout/LayoutWrapper.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ConditionList from '../components/ConditionList'
import SearchForm from '../components/SearchForm'
import { AdjustBlock } from '../UI/Button'
import { Button, FormControlLabel, Checkbox, Divider } from '@mui/material'
import { searchActions } from '../store/search-slice'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
          <div className={classes.searchItem} key={data.title}>
            <RemoveCircleIcon
              className={classes.removeCircleIcon}
              onClick={() => {
                dispatch(searchActions.removeSearchCondition(data.title))
              }}
            />
            <EditIcon className={classes.editIcon} />
            <FormControlLabel
              control={<Checkbox />}
              label={data.title}
              sx={{ margin: '0px' }}
              checked={true}
            />
            <ConditionList data={data} />
            <Divider sx={{ margin: '15px 8px' }} />
          </div>
        ))}
        <AdjustBlock
          content='新增組合條件'
          math='add'
          width='140px'
          onClick={() => {
            dispatch(searchActions.setIsSearchShown())
          }}
        />
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
