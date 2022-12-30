import classes from './LoginPage.module.scss'
import { TextField, Box, Button } from '@mui/material'
import GridSystem from '../Layout/GridSystem'

const LoginPage = () => {
  return (
    <GridSystem>
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
    </GridSystem>
  )
}

export default LoginPage
