import Button from '@mui/material/Button'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector, useDispatch } from 'react-redux'
import { meetApi, notMeetApi } from '../api/MeetApi'
import { roomActions } from '../store/room-slice'

const ConditionButton = (props) => {
  const { id, name, meetId } = props.data
  const dispatch = useDispatch()
  const currentRoom = useSelector((state) => state.room.currentRoom)
  const [isEdit, setIsEdit] = useState(false)

  const isMetHandler = async () => {
    if (meetId !== null) {
      setIsEdit(false)
      return
    }
    const res = await meetApi({
      HouseId: currentRoom.house.id,
      ConditionId: id,
    })
    dispatch(roomActions.meetCondition(res.data.meet))
    setIsEdit(false)
  }
  const isNotMetHandler = async () => {
    if (meetId === null) {
      setIsEdit(false)
      return
    }
    const res = await notMeetApi({ id: meetId })
    dispatch(roomActions.notMeetCondition(res.data.meet))
    setIsEdit(false)
  }
  return (
    <>
      {isEdit ? (
        <Button
          variant='outlined'
          color={meetId !== null ? 'success' : 'error'}
          sx={{ margin: 1, cursor: 'default' }}
        >
          {name}
          <Button color='success' onClick={isMetHandler}>
            符合
          </Button>
          <Button color='error' onClick={isNotMetHandler}>
            不符合
          </Button>
          <CloseIcon
            onClick={() => {
              setIsEdit(false)
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Button>
      ) : (
        <Button
          variant='contained'
          color={meetId !== null ? 'success' : 'error'}
          sx={{ margin: 1, cursor: 'default' }}
        >
          {meetId !== null ? (
            <CheckIcon sx={{ margin: '0px 10px' }} />
          ) : (
            <CloseIcon
              sx={{ margin: '0px 10px' }}
              onClick={() => {
                dispatch(roomActions.test())
              }}
            />
          )}
          {name}
          <EditIcon
            sx={{ margin: '0px 10px', cursor: 'pointer' }}
            onClick={() => {
              setIsEdit(true)
            }}
          />
        </Button>
      )}
    </>
  )
}

export default ConditionButton
