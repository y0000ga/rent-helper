import { Formik, Form } from 'formik'
import * as yup from 'yup' // 用於撰寫表單驗證規則
import { Button } from '@mui/material'
import classes from './LoginForm.module.scss'
import { useNavigate } from 'react-router-dom'
import InputField from '../UI/InputField'
import { userLoginApi } from '../api/userApi'
import Swal from 'sweetalert2'

const LoginForm = () => {
  const navigate = useNavigate()

  const validate = yup.object({
    account: yup
      .string()
      .trim()
      .min(8, '帳號長度不得小於 8')
      .max(30, '帳號長度不得超過 30')
      .required('帳號欄位不得為空'),
    password: yup
      .string()
      .trim()
      .min(8, '密碼長度不得小於 8')
      .max(30, '密碼長度不得超過 30')
      .required('密碼欄位不得為空')
      .matches(/[0-9]/, '密碼須包含一個數字')
      .matches(/[a-z]/, '密碼須包含一個小寫字母')
      .matches(/[A-Z]/, '密碼須包含一個大寫字母')
      .matches(/[^\w]/, '密碼須包含一個符號'),
  })

  const loginHandler = async (values) => {
    const res = await userLoginApi(values)
    if (res.status === 200) {
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('userId', user.id)
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '登入成功',
        showConfirmButton: false,
        timer: 1500,
      })
      navigate('/collect')
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${res.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <Formik
      initialValues={{ account: '', password: '' }}
      validationSchema={validate}
      onSubmit={loginHandler}
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
          type='password'
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
