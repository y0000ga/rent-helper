import {
  Button,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { Close, Add, Edit, Check } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { settingActions } from '../store/setting-slice'

export const ConditionBlock = (props) => {
  const { content, type } = props
  return (
    <Button
      variant='contained'
      disableRipple
      sx={{
        margin: 1,
        cursor: 'default',
        '&:hover': { backgroundColor: '#1876D2' },
      }}
      color={type === 'error' ? 'error' : 'primary'}
    >
      {content}
      {props.children}
    </Button>
  )
}

export const AdjustBlock = (props) => {
  const { content, type, math, width, pathname } = props
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [userInput, setUserInput] = useState('')
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

export const CheckBlock = (props) => {
  const { content, type, checked } = props
  return (
    <Button
      variant={checked ? 'contained' : 'outlined'}
      color={
        type === 'mustNotHave'
          ? 'error'
          : type === 'addiExpen'
          ? 'success'
          : 'primary'
      }
      sx={{ margin: 1, cursor: 'default' }}
    >
      {content}
    </Button>
  )
}

export const TextButton = (props) => {
  const { content, onClick } = props
  return (
    <Button sx={{ margin: 1 }} onClick={onClick}>
      {content}
    </Button>
  )
}

export const ToggleButton = (props) => {
  const { content, checked, type } = props
  const [isEdit, setIsEdit] = useState(false)
  const [isChecked, setIsChecked] = useState(checked)
  return (
    <>
      {isEdit === true ? (
        <Button
          variant={isChecked === true ? 'contained' : 'outlined'}
          sx={{ margin: 1, cursor: 'default' }}
          color={type === 'mustNotHave' ? 'error' : 'primary'}
        >
          {isChecked === true ? '有' : '無'}
          {content}
          <Check
            sx={{ margin: '0 5px', cursor: 'pointer' }}
            onClick={() => {
              setIsChecked(true)
              setIsEdit(false)
            }}
          />
          <Close
            sx={{ margin: '0 5px', cursor: 'pointer' }}
            onClick={() => {
              setIsChecked(false)
              setIsEdit(false)
            }}
          />
        </Button>
      ) : (
        <Button
          variant={isChecked === true ? 'contained' : 'outlined'}
          sx={{ margin: 1, cursor: 'default' }}
          color={type === 'mustNotHave' ? 'error' : 'primary'}
        >
          {isChecked === true ? '有' : '無'}
          {content}
          <Edit
            sx={{ marginLeft: 1, cursor: 'pointer' }}
            onClick={() => {
              setIsEdit(true)
            }}
          />
        </Button>
      )}
    </>
  )
}
