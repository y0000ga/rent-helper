import { Cancel, ArrowRight } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { deleteCondition } from '../store/setting-slice'
import styled from 'styled-components'

const ListItem = styled.li`
  margin: 10px 0px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ListSeparator = styled.div`
  display: flex;
  align-items: center;
`

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
    <ListItem>
      <ListSeparator>
        <ArrowRight />
        {name}
      </ListSeparator>
      <Cancel
        color='error'
        onClick={removeConditionHandler}
        sx={{ cursor: 'pointer' }}
      />
    </ListItem>
  )
}

export default ConditionItem
