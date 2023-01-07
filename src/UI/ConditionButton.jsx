import { Button } from '@mui/material'
import { useState } from 'react'
import { Close, Check, Edit } from '@mui/icons-material'
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
          <Close
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
            <Check sx={{ margin: '0px 10px' }} />
          ) : (
            <Close
              sx={{ margin: '0px 10px' }}
              onClick={() => {
                dispatch(roomActions.test())
              }}
            />
          )}
          {name}
          <Edit
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
