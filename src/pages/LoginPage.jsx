import classes from './LoginPage.module.scss'
import logo from '../assets/icons/logo.svg'
import { useState } from 'react'
import { TextField, Box, Button } from '@mui/material'

const LoginPage = () => {
  const [isNavShown, setIsNavShown] = useState(false)
  return (
    <>
      <div className={classes.Navigation}>
        <div className={classes.logo__container}>
          <img src={logo} alt='logo' />
          <p>
            Rent <br /> Helper
          </p>
        </div>
        <div
          className={classes.hamburger__icon}
          onClick={() => {
            setIsNavShown(!isNavShown)
          }}
        >
          <div className={classes.line}></div>
          <div className={classes.line}></div>
          <div className={classes.line}></div>
        </div>
        {isNavShown && (
          <ul className={classes.navList}>
            <li>搜尋主頁</li>
            <li>收藏清單</li>
            <li>登入</li>
          </ul>
        )}
      </div>
      <div className='main__container'>
        <Box component='form' className={classes.login__form}>
          <p>登入</p>
          <TextField
            id='outlined-basic'
            label='帳號'
            variant='outlined'
            className={classes.login__input}
          />
          <TextField
            id='outlined-basic'
            label='密碼'
            variant='outlined'
            className={classes.login__input}
          />
          <Button variant='contained' className={classes.button}>
            登入
          </Button>
        </Box>
      </div>
    </>
  )
}

export default LoginPage
