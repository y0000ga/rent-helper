import classes from './SearchItem.module.scss'
import { ConditionBlock } from '../UI/Button'
import { RemoveCircle, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { searchDeleteApi } from '../api/searchApi'
import { searchActions } from '../store/search-slice'
import { Divider } from '@mui/material'

const SearchItem = (props) => {
  const dispatch = useDispatch()
  const {
    id,
    name,
    sections,
    kind,
    shape,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    notCover,
    keyword,
  } = props.data
  const isSearchShown = useSelector((state) => state.search.isSearchShown)
  const removeSearchHandler = async () => {
    let result = await Swal.fire({
      title: '確定要刪除此條件組合嗎？',
      text: '刪除後將無法恢復！',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '刪除',
    })
    if (result.isConfirmed) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '該條件組合已刪除',
        showConfirmButton: false,
        timer: 1500,
      })
      await searchDeleteApi({ id })
      dispatch(searchActions.setIsSearchUpdated())
    }
  }
  const editSearchHandler = () => {
    dispatch(searchActions.setIsEdit(true))
    dispatch(searchActions.setIsSearchShown(true))
    dispatch(searchActions.setCurrentSearch({ id }))
  }
  return (
    <div className={classes.searchItem}>
      <p className={classes.subtitle}>
        {props.index + 1}. {name}
      </p>
      {isSearchShown === false && (
        <>
          <RemoveCircle
            className={classes.icon__removeCircle}
            onClick={removeSearchHandler}
          />
          <Edit className={classes.icon__edit} onClick={editSearchHandler} />
        </>
      )}
      {sections.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      {keyword.trim().length !== 0 && (
        <ConditionBlock content={keyword} key='keyword' />
      )}
      <ConditionBlock content={kind} key='kind' />
      <ConditionBlock content={shape} key='shape' />
      <ConditionBlock content={`${minPrice} 到 ${maxPrice}元`} key='price' />
      <ConditionBlock content={`${minArea} 到 ${maxArea}坪`} key='area' />
      {notCover === true && (
        <ConditionBlock content='排除頂樓加蓋' key='notCover' />
      )}
      <Divider sx={{ margin: '15px 8px' }} />
    </div>
  )
}

export default SearchItem
