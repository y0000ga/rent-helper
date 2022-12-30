import { useState, useEffect } from 'react'

const useRWD = () => {
  const [device, setDevice] = useState('mobile')

  const rwdHandler = () => {
    if (window.innerWidth > 768) {
      setDevice('PC')
    } else if (window.innerWidth > 576) {
      setDevice('tablet')
    } else setDevice('mobile')
  }
  useEffect(() => {
    window.addEventListener('resize', rwdHandler)
    rwdHandler()
    return () => {
      window.removeEventListener('resize', rwdHandler)
    }
  }, [])

  return device
}

export default useRWD
