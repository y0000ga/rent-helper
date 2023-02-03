import classes from './ConditionItem.module.scss'
import { Cancel, ArrowRight } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { deleteCondition } from '../store/setting-slice'

const ConditionItem = (props) => {
  const { name, id } = props.data
  const dispatch = useDispatch()
  const removeConditionHandler = async () => {
    let result = await Swal.fire({
      title: '確定要刪除此自定義條件嗎？',
      text: '刪除後將無法恢復！',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonColor: '#1876D2',
      cancelButtonColor: '#D3302F',
      confirmButtonText: '刪除',
    })
    if (result.isConfirmed) {
      dispatch(deleteCondition({ id }))
    }
  }
  return (
    <li className={classes.li}>
      <div className={classes.li__separator}>
        <ArrowRight />
        {name}
      </div>
      <Cancel
        color='error'
        onClick={removeConditionHandler}
        sx={{ cursor: 'pointer' }}
      />
    </li>
  )
}

export default ConditionItem
