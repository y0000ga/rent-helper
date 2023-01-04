import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const HomePage = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      navigate('/collect')
    }
  }, [navigate, token])
}

export default HomePage
