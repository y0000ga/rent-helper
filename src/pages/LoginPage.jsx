import LayoutWrapper from '../Layout/LayoutWrapper'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LoginPage = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      navigate('/search')
    }
  }, [navigate, token])

  return (
    <LayoutWrapper>
      <LoginForm />
    </LayoutWrapper>
  )
}

export default LoginPage
