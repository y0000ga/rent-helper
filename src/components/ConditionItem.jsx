import classes from './ConditionItem.module.scss'
import CancelIcon from '@mui/icons-material/Cancel'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Swal from 'sweetalert2'
import { conditionRemoveApi } from '../api/ConditionApi'
import { useDispatch } from 'react-redux'
import { settingActions } from '../store/setting-slice'

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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '刪除',
    })
    if (result.isConfirmed) {
      const res = await conditionRemoveApi({ id })
      dispatch(settingActions.removeCondition(res.data.condition))
    }
  }
  return (
    <li className={classes.li}>
      <div className={classes.li__separator}>
        <ArrowRightIcon />
        {name}
      </div>
      <CancelIcon
        color='error'
        onClick={removeConditionHandler}
        sx={{ cursor: 'pointer' }}
      />
    </li>
  )
}

export default ConditionItem
