import { Button } from '@mui/material'
import { Close, Check } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { meet, notMeet } from '../store/room-slice'

const ConditionButton = (props) => {
  const { id, name, meetId } = props.data
  const dispatch = useDispatch()
  const currentRoom = useSelector((state) => state.room.currentRoom)

  const controlMetHandler = async () => {
    if (meetId === null) {
      dispatch(
        meet({
          HouseId: currentRoom.house.id,
          ConditionId: id,
        })
      )
    } else {
      dispatch(notMeet({ id: meetId }))
    }
  }

  return (
    <Button
      variant='contained'
      color={meetId !== null ? 'success' : 'error'}
      sx={{ margin: 1, cursor: 'pointer' }}
      onClick={controlMetHandler}
    >
      {meetId !== null ? (
        <Check sx={{ margin: '0px 10px' }} />
      ) : (
        <Close sx={{ margin: '0px 10px' }} />
      )}
      {name}
    </Button>
  )
}

export default ConditionButton
