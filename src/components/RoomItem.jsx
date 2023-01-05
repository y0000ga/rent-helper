import classes from './RoomItem.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { ConditionBlock, TextButton } from '../UI/Button'
import RoomDetailModal from '../components/RoomDetailModal'
import { useState } from 'react'
import { housesDeleteApi, housesOneGetApi } from '../api/housesApi'
import { useDispatch } from 'react-redux'
import { roomActions } from '../store/room-slice'

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
    const res = await housesOneGetApi({ id })
    dispatch(roomActions.getCurrentRoom(res.data))
    setIsModalShown(true)
  }
  const closeModalHandler = () => {
    setIsModalShown(false)
  }

  const deleteRoomHandler = async () => {
    const res = await housesDeleteApi({ id })
    dispatch(roomActions.removeHouse(res.data.house))
  }
  return (
    <>
      <div className={classes.roomItem}>
        <div className={classes.pointer}>
          <CloseIcon onClick={deleteRoomHandler} />
        </div>
        <h3
          className={classes.name}
        >
          {name}
        </h3>
        <img src={cover} alt='cover' />
        <div className={classes.intro}>
          <ConditionBlock content={region} />
          <ConditionBlock content={section} />
          <ConditionBlock content={kind} />
          <ConditionBlock content={`${area}`} />
          <ConditionBlock content={`${price}元`} />
          <ConditionBlock content={shape} />
          <ConditionBlock
            content={`額外支出 ${
              extraExpenses === undefined
                ? '0'
                : extraExpenses === null
                ? '0'
                : extraExpenses
            }  元`}
            type='error'
          />
          <ConditionBlock
            content={isAllMet === 0 ? '條件未全符合' : '條件全符合'}
            type={isAllMet === 0 ? 'error' : 'success'}
          />
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
