import classes from './RoomItem.module.scss'
import { Close } from '@mui/icons-material'
import { ConditionBlock, TextButton } from '../UI/Button'
import RoomDetailModal from '../components/RoomDetailModal'
import { housesDeleteApi, housesOneGetApi } from '../api/housesApi'
import { useDispatch, useSelector } from 'react-redux'
import { roomActions } from '../store/room-slice'
import Swal from 'sweetalert2'
import { Button } from '@mui/material'

const RoomItem = (props) => {
  const dispatch = useDispatch()
  const {
    id,
    area,
    cover,
    kind,
    name,
    price,
    region,
    section,
    shape,
    comment,
    extraExpenses,
    isAllMet,
  } = props.data
  const isModalShown = useSelector((state) => state.room.isModalShown)
  const showModalHandler = async () => {
    const res = await housesOneGetApi({ id })
    dispatch(roomActions.getCurrentRoom(res.data))
    dispatch(roomActions.setIsModalShown())
  }
  const closeModalHandler = () => {
    dispatch(roomActions.setIsModalShown())
  }

  const deleteRoomHandler = async () => {
    let result = await Swal.fire({
      title: '確定要刪除此物件嗎？',
      text: '刪除後將無法恢復！',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '刪除',
    })
    if (result.isConfirmed) {
      const res = await housesDeleteApi({ id })
      dispatch(roomActions.removeHouse(res.data.house))
    }
  }
  return (
    <>
      <div className={classes.roomItem}>
        <div className={classes.pointer}>
          <Close onClick={deleteRoomHandler} />
        </div>
        <h3 className={classes.name}>{name}</h3>
        <img src={cover} alt='cover' />
        <div className={classes.intro}>
          <ConditionBlock content={region} />
          <ConditionBlock content={section} />
          <ConditionBlock content={kind} />
          <ConditionBlock content={`${area}`} />
          <ConditionBlock content={`${price}元`} />
          <ConditionBlock content={shape} />
          <Button
            disableRipple
            variant='contained'
            sx={{
              margin: 1,
              cursor: 'default',
              '&:hover': { backgroundColor: '#ED6D03' },
            }}
            color='warning'
          >{`額外支出 ${
            extraExpenses === undefined
              ? '0'
              : extraExpenses === null
              ? '0'
              : extraExpenses
          }  元`}</Button>
          <Button
            disableRipple
            variant='contained'
            sx={{
              margin: 1,
              cursor: 'default',
              '&:hover': { backgroundColor: `${isAllMet === 0 ? '#D3302F' : '#2F7D32'}` },
            }}
            color={
              isAllMet === 0
                ? 'error'
                : isAllMet === false
                ? 'error'
                : 'success'
            }
          >
            {isAllMet === 0
              ? '條件未全符合'
              : isAllMet === false
              ? '條件未全符合'
              : '條件全符合'}
          </Button>
        </div>
        <p>{comment === '' ? '目前沒有任何備註' : comment}</p>
        <TextButton content='查看與編輯物件資訊' onClick={showModalHandler} />
      </div>
      {isModalShown === true && (
        <RoomDetailModal
          isModalShown={isModalShown}
          closeModal={closeModalHandler}
        />
      )}
    </>
  )
}

export default RoomItem
