import { TextField } from '@mui/material'
import { AddHome, Loop } from '@mui/icons-material'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { housesCreateApi } from '../api/housesApi'
import { useDispatch } from 'react-redux'
import { roomActions } from '../store/room-slice'
import classes from './UrlInput.module.scss'

const UrlInput = () => {
  const dispatch = useDispatch()
  const [houseUrl, setHouseUrl] = useState('')
  const [externalId, setExternalId] = useState('')
  const [status, setStatus] = useState('finish')
  const isMobileHouseUrlValid = houseUrl.includes(
    'https://m.591.com.tw/v2/rent/'
  )
  const isWebSiteHouseUrlValid = houseUrl.includes(
    'https://rent.591.com.tw/home/'
  )
  const searchHandler = async () => {
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
    if (houseUrl.includes('https://m.591.com.tw/v2/rent/')) {
      setExternalId(houseUrl.replace('https://m.591.com.tw/v2/rent/', ''))
    } else {
      setExternalId(houseUrl.replace('https://rent.591.com.tw/home/', ''))
    }
    if (externalId.length !== 8) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '物件網址格式錯誤',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    setStatus('loading')
    const res = await housesCreateApi({ externalId: Number(externalId) })
    if (res.status === 200) {
      const { house } = res.data
      dispatch(roomActions.addHouse(house))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '新增物件成功',
        showConfirmButton: false,
        timer: 1500,
      })
      setHouseUrl('')
      setStatus('finish')
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: `${res.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      })
      setHouseUrl('')
      setStatus('finish')
    }
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
      {status === 'finish' ? (
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
