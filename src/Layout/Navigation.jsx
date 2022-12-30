import classes from './Navigation.module.scss'
import logo from '../assets/icons/logo.svg'
import useRWD from '../hooks/useRWD'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const [isNavShown, setIsNavShown] = useState(false)
  const device = useRWD()
  const navigate = useNavigate()
  const navItem = (
    <>
      <li
        onClick={() => {
          navigate('/search')
        }}
      >
        搜尋主頁
      </li>
      <li
        onClick={() => {
          navigate('/collect')
        }}
      >
        收藏清單
      </li>
      <li
        onClick={() => {
          navigate('/login')
        }}
      >
        登入
      </li>
    </>
  )
  useEffect(() => {
    if (device !== 'mobile') {
      setIsNavShown(false)
    }
  }, [device])
  return (
    <div className={classes.Navigation}>
      <div className={classes.logo__container}>
        <img src={logo} alt='logo' />
        <p>
          Rent <br /> Helper
        </p>
      </div>

      {device === 'mobile' ? (
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
      ) : (
        <ul className={classes.navList}>{navItem}</ul>
      )}
      {isNavShown && <ul className={classes.navList__mobile}>{navItem}</ul>}
    </div>
  )
}

export default Navigation
