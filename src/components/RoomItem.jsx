import classes from './RoomItem.module.scss'
import { Close } from '@mui/icons-material'
import DisplayBlock from '../UI/DisplayBlock'
import RoomDetailModal from '../components/RoomDetailModal'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Button } from '@mui/material'
import { useState } from 'react'
import { getOneInfo, deleteOne } from '../store/room-slice'

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
  const [isModalShown, setIsModalShown] = useState(false)
  const showModalHandler = async () => {
    await dispatch(getOneInfo({ id }))
    setIsModalShown(true)
  }
  const closeModalHandler = () => {
    setIsModalShown(false)
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
      dispatch(deleteOne({id}))
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
          <DisplayBlock content={region} />
          <DisplayBlock content={section} />
          <DisplayBlock content={kind} />
          <DisplayBlock content={`${area}`} />
          <DisplayBlock content={`${price}元`} />
          <DisplayBlock content={shape} />
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
              '&:hover': {
                backgroundColor: `${
                  isAllMet === 0
                    ? '#D3302F'
                    : isAllMet === false
                    ? '#D3302F'
                    : '#2F7D32'
                }`,
              },
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
        <Button onClick={showModalHandler}>查看與編輯物件資訊</Button>
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
