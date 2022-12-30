import classes from './SearchPage.module.scss'
import LayoutWrapper from '../Layout/LayoutWrapper.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ConditionList from '../components/ConditionList'
import SearchForm from '../components/SearchForm'
import { Divider } from '@mui/material'
import { AdjustBlock } from '../UI/Button'
import { Button, FormControlLabel, Checkbox } from '@mui/material'
import { searchActions } from '../store/search-slice'

const SearchPage = () => {
  const searchCollection = useSelector((state) => state.search.searchCollection)
  const isSearchShown = useSelector((state) => state.search.isSearchShown)
  const dispatch = useDispatch()
  return (
    <LayoutWrapper>
      <div className={classes.container}>
        {searchCollection.map((data, index) => (
          <>
            <FormControlLabel
              control={<Checkbox />}
              label={`搜尋條件組合${' '}${index + 1}`}
              sx={{ margin: '0px' }}
              checked={true}
            />
            <ConditionList data={data} />
            <Divider sx={{ margin: '15px 8px' }} />
          </>
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
