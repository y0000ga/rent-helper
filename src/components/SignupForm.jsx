import { Formik, Form } from 'formik'
import * as yup from 'yup' // 用於撰寫表單驗證規則
import { Button } from '@mui/material'
import classes from './LoginForm.module.scss'
import { useNavigate } from 'react-router-dom'
import InputField from '../UI/InputField'
import { userSignupApi } from '../api/userApi'
import Swal from 'sweetalert2'

const SignupForm = () => {
  const navigate = useNavigate()

  const validate = yup.object({
    name: yup
      .string()
      .trim()
      .max(20, '使用者名稱長度不得大於 20')
      .required('使用者名稱欄位不得為空'),
    account: yup
      .string()
      .trim()
      .min(8, '帳號長度不得小於 8')
      .max(30, '帳號長度不得超過 30')
      .required('帳號欄位不得為空'),
    password: yup
      .string()
      .trim()
      .required('密碼欄位不得為空')
      .matches(/[0-9]/, '密碼須包含一個數字')
      .matches(/[a-z]/, '密碼須包含一個小寫字母')
      .matches(/[A-Z]/, '密碼須包含一個大寫字母')
      .matches(/[^\w]/, '密碼須包含一個符號')
      .min(8, '密碼長度不得小於 8')
      .max(30, '密碼長度不得超過 30'),
    checkPassword: yup
      .string()
      .oneOf([yup.ref('password')], '與密碼不同')
      .required('密碼確認欄位不得為空'),
  })

  const signupHandler = async (values) => {
    const res = await userSignupApi(values)
    if (res.status === 200) {
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('userId', user.id)
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '註冊成功',
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
      onSubmit={signupHandler}
    >
      <Form className={classes.form}>
        <div className={classes.title}>註冊</div>
        <InputField
          type='text'
          placeholder='請輸入使用者名稱'
          name='name'
          label='使用者名稱'
        />
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
        <InputField
          type='password'
          placeholder='請再次輸入密碼'
          name='checkPassword'
          label='密碼確認'
        />
        <Button
          type='submit'
          variant='contained'
          className={classes.button}
          sx={{ m: 2, width: '80%' }}
        >
          註冊
        </Button>
        <div
          className={classes.navigate}
          onClick={() => {
            navigate('/login')
          }}
        >
          已經有帳號嗎? 登入
        </div>
      </Form>
    </Formik>
  )
}

export default SignupForm
