import classes from './SettingPage.module.scss'
import LayoutWrapper from '../Layout/LayoutWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { createCondition, getAll } from '../store/setting-slice'
import ConditionItem from '../components/ConditionItem'

const SettingPage = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [conditionInput, setConditionInput] = useState('')
  const dispatch = useDispatch()
  const conditions = useSelector((state) => state.setting.conditions)
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    dispatch(getAll())
  }, [dispatch, navigate, token])

  const addConditionHandler = async () => {
    if (conditionInput.trim().length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '自定義條件欄位不可為空',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    if (conditionInput.trim().length > 20) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '自定義條件字數不可超過 20',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    dispatch(createCondition({ name: conditionInput }))
    setConditionInput('')
  }

  return (
    <LayoutWrapper>
      <div className={classes.container}>
        <div style={{ display: 'flex' }}>
          <TextField
            type='text'
            label={`自定義條件(${conditionInput.length}/20)`}
            placeholder='請輸入自定義條件'
            variant='outlined'
            color='primary'
            sx={{ width: '95%' }}
            value={conditionInput}
            onChange={(event) => {
              setConditionInput(event.target.value)
            }}
          />
          <AddBox
            sx={{ cursor: 'pointer', fontSize: '54px' }}
            color='primary'
            onClick={addConditionHandler}
          />
        </div>
        <div className={classes.list__container}>
          {conditions.length === 0 && (
            <p className={classes.emptyMessage}>目前沒有任何搜尋條件組合</p>
          )}
          {conditions.map((data) => (
            <ConditionItem data={data} key={data.id} />
          ))}
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default SettingPage
