import SignupForm from '../components/SignupForm'
import LayoutWrapper from '../Layout/LayoutWrapper'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      navigate('/collect')
    }
  }, [navigate, token])
  return (
    <LayoutWrapper>
      <SignupForm />
    </LayoutWrapper>
  )
}

export default SignupPage
