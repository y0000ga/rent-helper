import classes from './SearchItem.module.scss'
import DisplayBlock from '../UI/DisplayBlock'
import { RemoveCircle, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { searchActions, searchDelete } from '../store/search-slice'
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
  const searchFormStatus = useSelector((state) => state.search.searchFormStatus)
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
      dispatch(searchDelete({id}))
    }
  }
  const editSearchHandler = () => {
    dispatch(searchActions.setSearchFormStatus('edit'))
    dispatch(searchActions.setCurrentSearch({ id }))
  }
  return (
    <div className={classes.searchItem}>
      <p className={classes.subtitle}>
        {props.index + 1}. {name}
      </p>
      {searchFormStatus === 'finish' && (
        <>
          <RemoveCircle
            className={classes.icon__removeCircle}
            onClick={removeSearchHandler}
          />
          <Edit className={classes.icon__edit} onClick={editSearchHandler} />
        </>
      )}
      {sections.map((data) => (
        <DisplayBlock content={data} key={data} />
      ))}
      {keyword.trim().length !== 0 && (
        <DisplayBlock content={keyword} key='keyword' />
      )}
      <DisplayBlock content={kind} key='kind' />
      <DisplayBlock content={shape} key='shape' />
      <DisplayBlock content={`${minPrice} 到 ${maxPrice}元`} key='price' />
      <DisplayBlock content={`${minArea} 到 ${maxArea}坪`} key='area' />
      {notCover === true && (
        <DisplayBlock content='排除頂樓加蓋' key='notCover' />
      )}
      <Divider sx={{ margin: '15px 8px' }} />
    </div>
  )
}

export default SearchItem
