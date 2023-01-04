import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { roomActions } from '../store/room-slice'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import { expenseCreateApi, expenseDeleteApi } from '../api/ExpenseApi'
import Swal from 'sweetalert2'
import { FormHelperText } from '@mui/material'

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
  const addHandler = async () => {
    if (userInput.trim().length === 0 || userInput.trim().length > 20) {
      return
    }

    // const res = await expenseCreateApi({
    //   HouseId: house.id,
    //   name: userInput,
    //   price: userInputExpen,
    // })
    // dispatch(
    //   roomActions.addExpenses({ expense: res.data.expense, id: house.id })
    // )
    // setIsEdit(false)
  }
  return (
    <>
    
      {isEdit === true ? (
        <div style={{ display: 'flex' }}>
          <FormControl
            sx={{ margin: 1, width: '50%' }}
            variant='outlined'
            color='error'
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
          </FormControl>
          <FormControl
            sx={{ m: 1, width: '50%' }}
            variant='outlined'
            color='error'
            size='small'
          >
            <InputLabel htmlFor='add'>金額</InputLabel>
            <OutlinedInput
              type='number'
              InputProps={{ inputProps: { min: 1, max: 9999 } }}
              id='add'
              value={userInputExpen}
              onChange={(event) => {
                setUserInputExpen(event.target.value)
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <AddIcon
                    onClick={addHandler}
                    edge='end'
                    sx={{ cursor: 'pointer' }}
                  />
                </InputAdornment>
              }
              label='額外支出'
            />
          </FormControl>
        </div>
      ) : (
        <Button
          variant={math === 'add' ? 'outlined' : 'contained'}
          sx={{ margin: 1, width: `${width}` }}
          color='error'
        >
          {math === 'add' ? '新增' : `${data.name} (${data.price} 元)`}
          {math === 'add' ? (
            <AddIcon
              fontSize='small'
              onClick={() => {
                setIsEdit(true)
              }}
            />
          ) : (
            <CloseIcon
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
