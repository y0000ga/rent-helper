import { Button } from '@mui/material'
import { Close, Add } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { settingActions } from '../store/setting-slice'
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@mui/material'

const SettingBlock = (props) => {
  const { content, type, math, width, pathname } = props
  const dispatch = useDispatch()
  // --- useState
  const [isEdit, setIsEdit] = useState(false)
  const [userInput, setUserInput] = useState('')
  // --- event handler
  const removeHandler = () => {
    if (pathname === '/setting') {
      if (type === 'mustHave') {
        dispatch(settingActions.removeMustHave(content))
      } else {
        dispatch(settingActions.removeMustNotHave(content))
      }
    }
  }

  const addHandler = () => {
    if (pathname === '/setting') {
      if (type === 'mustHave') {
        dispatch(settingActions.addMustHave(userInput))
      } else {
        dispatch(settingActions.addMustNotHave(userInput))
      }
    }
    setIsEdit(false)
    setUserInput('')
  }
  return (
    <>
      {isEdit === false ? (
        <Button
          variant={math === 'add' ? 'outlined' : 'contained'}
          sx={{ margin: 1, width: `${width}` }}
          color={
            type === 'mustNotHave'
              ? 'error'
              : type === 'addiExpen'
              ? 'success'
              : 'primary'
          }
        >
          {content}
          {math === 'add' ? (
            <Add
              fontSize='small'
              onClick={() => {
                setIsEdit(true)
              }}
            />
          ) : (
            <Close
              fontSize='small'
              sx={{ marginLeft: 1 }}
              onClick={removeHandler}
            />
          )}
        </Button>
      ) : (
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant='outlined'
          color={type === 'mustHave' ? 'primary' : 'error'}
          size='small'
        >
          <InputLabel htmlFor='add'>條件</InputLabel>
          <OutlinedInput
            id='add'
            placeholder='請輸入新增條件'
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value)
            }}
            endAdornment={
              <InputAdornment position='end'>
                <Add onClick={addHandler} edge='end' />
              </InputAdornment>
            }
            label='增加條件'
          />
        </FormControl>
      )}
    </>
  )
}

export default SettingBlock
