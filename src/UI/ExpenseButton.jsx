import { Close, Add, Clear } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { roomActions } from '../store/room-slice'
import {
  Button,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@mui/material'
import { expenseCreateApi, expenseDeleteApi } from '../api/ExpenseApi'

const ExpenseButton = (props) => {
  const { math, width, data } = props
  const { house } = useSelector((state) => state.room.currentRoom)
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [userInputExpen, setUserInputExpen] = useState('')
  const removeHandler = async () => {
    const res = await expenseDeleteApi({ expenseId: data.id })
    dispatch(roomActions.removeExpense(res.data.expense))
  }
  const userInputValid =
    userInput.trim().length > 0 && userInput.trim().length < 21
  const userInputExpenValid =
    Number(userInputExpen) > 0 && Number(userInputExpen) < 9999
  const addHandler = async () => {
    const res = await expenseCreateApi({
      HouseId: house.id,
      name: userInput,
      price: userInputExpen,
    })
    dispatch(
      roomActions.addExpenses({ expense: res.data.expense, id: house.id })
    )
    setIsEdit(false)
    setUserInput('')
    setUserInputExpen('')
  }

  return (
    <>
      {isEdit === true ? (
        <div style={{ display: 'flex', width: '100%' }}>
          <FormControl
            sx={{ margin: 1, width: '100%' }}
            variant='outlined'
            color='warning'
            size='small'
          >
            <InputLabel htmlFor='add'>額外支出</InputLabel>
            <OutlinedInput
              id='add'
              value={userInput}
              onChange={(event) => {
                setUserInput(event.target.value)
              }}
              label='額外支出'
            />
            {userInput.length > 20 && (
              <p
                style={{
                  color: '#D3302F',
                  fontSize: '12px',
                  marginLeft: '5px',
                }}
              >
                字數不得超過 20 字
              </p>
            )}
          </FormControl>
          <FormControl
            sx={{ m: 1 }}
            variant='outlined'
            color='warning'
            size='small'
          >
            <InputLabel htmlFor='add'>金額</InputLabel>
            <OutlinedInput
              type='number'
              id='add'
              value={userInputExpen}
              onChange={(event) => {
                setUserInputExpen(event.target.value)
              }}
              endAdornment={
                <InputAdornment position='end'>
                  {userInputExpenValid && userInputValid && (
                    <Add
                      color='success'
                      onClick={addHandler}
                      edge='end'
                      sx={{ cursor: 'pointer' }}
                    />
                  )}
                  <Clear
                    color='error'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setUserInputExpen('')
                      setUserInput('')
                      setIsEdit(false)
                    }}
                  />
                </InputAdornment>
              }
              label='額外支出'
            />
            {Number(userInputExpen) > 9999 && (
              <p
                style={{
                  color: '#D3302F',
                  fontSize: '12px',
                  marginLeft: '5px',
                }}
              >
                金額不得超過 9999
              </p>
            )}
            {Number(userInputExpen) < 0 && (
              <p
                style={{
                  color: '#D3302F',
                  fontSize: '12px',
                  marginLeft: '5px',
                }}
              >
                金額不得為負數
              </p>
            )}
          </FormControl>
        </div>
      ) : (
        <Button
          variant={math === 'add' ? 'outlined' : 'contained'}
          sx={{ margin: 1, width: `${width}` }}
          color='warning'
          onClick={() => {
            if (isEdit === false) {
              setIsEdit(true)
            }
          }}
        >
          {math === 'add' ? '新增' : `${data.name} (${data.price} 元)`}
          {math === 'add' ? (
            <Add fontSize='small' />
          ) : (
            <Close
              fontSize='small'
              sx={{ marginLeft: 1 }}
              onClick={removeHandler}
            />
          )}
        </Button>
      )}
    </>
  )
}

export default ExpenseButton
