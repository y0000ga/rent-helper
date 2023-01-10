import classes from './RoomDetailModal.module.scss'
import {
  Backdrop,
  Pagination,
  Button,
  ButtonGroup,
  TextField,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpenseButton from '../UI/ExpenseButton'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DisplayBlock from '../UI/DisplayBlock'
import { housesEditCommentApi } from '../api/housesApi'
import { roomActions } from '../store/room-slice'
import ConditionButton from '../UI/ConditionButton'

const RoomDetailModal = (props) => {
  const dispatch = useDispatch()
  const { isModalShown, closeModal } = props
  const { house, conditions } = useSelector((state) => state.room.currentRoom)
  const {
    id,
    name,
    price,
    Photos,
    Expenses,
    area,
    comment,
    region,
    section,
    kind,
    shape,
    ServicedFacilities,
    externalId,
  } = house
  const [commentInput, setCommentInput] = useState(comment)
  const [imgShownIndex, setImgShownIndex] = useState(1)
  const isCommentInputValid = commentInput.trim().length <= 200
  const changeImgHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setImgShownIndex(value)
  }
  const saveDataHandler = async () => {
    if (!isCommentInputValid) {
      return
    }
    const res = await housesEditCommentApi({ id, comment: commentInput })
    dispatch(roomActions.editComment(res.data.house))
    closeModal()
  }

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      open={isModalShown}
    >
      <div className={classes.modal}>
        <div className={classes.top}>
          <p>
            {name} ({price} 元/月)
          </p>
          <CloseIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
        </div>
        <div className={classes.bottom}>
          <div className={classes.imgList}>
            {Photos.map((data, index) => (
              <img
                src={data.url}
                alt='fig'
                style={{
                  display: imgShownIndex === index + 1 ? undefined : 'none',
                }}
                key={data.id}
              />
            ))}
            <Pagination
              count={Photos.length}
              className={classes.pagination}
              page={imgShownIndex}
              onChange={changeImgHandler}
            />
          </div>
          <div className={classes.conditionList}>
            <DisplayBlock content={area} key='area' />
            <DisplayBlock content={region} key='region' />
            <DisplayBlock content={section} key='section' />
            <DisplayBlock content={kind} key='kind' />
            <DisplayBlock content={shape} key='shape' />
            {ServicedFacilities.map((data) => (
              <DisplayBlock content={data.name} key={data.id} />
            ))}
          </div>
          <Divider
            sx={{
              margin: 2,
              backgroundColor: 'rgba(0,0,0,0.05)',
              width: '100%',
            }}
            variant='middle'
          />
          <p className={classes.title}>額外支出</p>
          <div className={classes.controlList}>
            {Expenses.map((data) => (
              <ExpenseButton data={data} type='addiExpen' key={data.id} />
            ))}
          </div>
          {Expenses.length < 10 && (
            <ExpenseButton
              content='新增'
              type='addiExpen'
              math='add'
              key='add'
            />
          )}
          <p className={classes.title}>自定義條件</p>
          <div className={classes.controlList}>
            {conditions.map((data) => (
              <ConditionButton data={data} key={data.id} />
            ))}
          </div>

          <TextField
            id='note'
            multiline
            rows={4}
            placeholder='請輸入評論'
            sx={{ margin: 1 }}
            className={classes.textField}
            value={commentInput}
            onChange={(event) => {
              setCommentInput(event.target.value)
            }}
          />
          {!isCommentInputValid && (
            <p className={classes.errorMessage}>評論字數不得超過 200 字</p>
          )}
          <ButtonGroup
            variant='contained'
            sx={{ margin: 1 }}
            className={classes.navList}
          >
            <Button
              onClick={() => {
                window.open(`https://rent.591.com.tw/home/${externalId}`)
              }}
            >
              591 資訊
            </Button>
            <Button onClick={saveDataHandler}>儲存</Button>
          </ButtonGroup>
        </div>
      </div>
    </Backdrop>
  )
}

export default RoomDetailModal
