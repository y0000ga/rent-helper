import { Button } from '@mui/material'
import { Close, Check } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { meetApi, notMeetApi } from '../api/MeetApi'
import { roomActions } from '../store/room-slice'

const ConditionButton = (props) => {
  const { id, name, meetId } = props.data
  const dispatch = useDispatch()
  const currentRoom = useSelector((state) => state.room.currentRoom)

  const controlMetHandler = async () => {
    if (meetId === null) {
      const res = await meetApi({
        HouseId: currentRoom.house.id,
        ConditionId: id,
      })
      dispatch(roomActions.meetCondition(res.data.meet))
    } else {
      const res = await notMeetApi({ id: meetId })
      dispatch(roomActions.notMeetCondition(res.data.meet))
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
