import { Formik, Form } from 'formik'
import * as yup from 'yup' // 用於撰寫表單驗證規則
import { Button } from '@mui/material'
import classes from './LoginForm.module.scss'
import { useNavigate } from 'react-router-dom'
import InputField from '../UI/InputField'

const LoginForm = () => {
  const navigate = useNavigate()

  const validate = yup.object({
    account: yup
      .string()
      .min(4, '帳號長度不得小於 4')
      .max(30, '帳號長度不得超過 30')
      .required('帳號欄位不得為空'),
    password: yup
      .string()
      .min(4, '密碼長度不得小於 4')
      .max(30, '密碼長度不得超過 30')
      .required('密碼欄位不得為空'),
  })

  return (
    <Formik
      initialValues={{ account: '', password: '' }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form className={classes.form}>
        <div className={classes.title}>登入</div>
        <InputField
          type='text'
          placeholder='請輸入帳號'
          name='account'
          label='帳號'
        />
        <InputField
          type='text'
          placeholder='請輸入密碼'
          name='password'
          label='密碼'
        />
        <Button
          type='submit'
          variant='contained'
          className={classes.button}
          sx={{ m: 2, width: '80%' }}
        >
          登入
        </Button>
        <div
          className={classes.navigate}
          onClick={() => {
            navigate('/signup')
          }}
        >
          還沒有帳號嗎? 註冊
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm
