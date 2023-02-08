import { TextField } from '@mui/material'
import { AddHome, Loop } from '@mui/icons-material'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import classes from './UrlInput.module.scss'
import { createOne } from '../store/room-slice'

const UrlInput = () => {
  const dispatch = useDispatch()
  const [houseUrl, setHouseUrl] = useState('')
  const createRoomStatus = useSelector((state) => state.room.createRoomStatus)
  const isMobileHouseUrlValid = houseUrl.includes(
    'https://m.591.com.tw/v2/rent/'
  )
  const isWebSiteHouseUrlValid = houseUrl.includes(
    'https://rent.591.com.tw/home/'
  )
  const searchHandler = () => {
    if (!isMobileHouseUrlValid && !isWebSiteHouseUrlValid) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '物件網址格式錯誤',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    let externalId
    if (houseUrl.includes('https://m.591.com.tw/v2/rent/')) {
      externalId = houseUrl.replace('https://m.591.com.tw/v2/rent/', '')
    } else {
      externalId = houseUrl.replace('https://rent.591.com.tw/home/', '')
    }
    dispatch(createOne({ externalId: Number(externalId) }))
    setHouseUrl('')
  }

  return (
    <div style={{ display: 'flex' }}>
      <TextField
        type='text'
        label='物件網址'
        placeholder='請輸入物件網址'
        variant='outlined'
        color='primary'
        sx={{ width: '95%' }}
        value={houseUrl}
        onChange={(event) => {
          setHouseUrl(event.target.value)
        }}
      />
      {createRoomStatus.status === 'finish' ? (
        <AddHome
          sx={{ cursor: 'pointer', fontSize: '54px' }}
          color='primary'
          onClick={searchHandler}
        />
      ) : (
          <Loop
            className={classes.loading}
            sx={{ cursor: 'wait', fontSize: '54px' }}
            color='success'
          />
      )}
    </div>
  )
}

export default UrlInput
