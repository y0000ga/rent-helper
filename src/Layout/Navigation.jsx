import classes from './Navigation.module.scss'
import logo from '../assets/icons/logo.svg'
import useRWD from '../hooks/useRWD'
import { useEffect, useState } from 'react'
import NavList from './NavList'
import MenuIcon from '@mui/icons-material/Menu'

const Navigation = () => {
  const [isNavShown, setIsNavShown] = useState(false)
  const device = useRWD()

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
          <MenuIcon fontSize='large' />
        </div>
      ) : (
        <ul className={classes.navList}>
          <NavList />
        </ul>
      )}
      {isNavShown && (
        <ul className={classes.navList__mobile}>
          <NavList />
        </ul>
      )}
    </div>
  )
}

export default Navigation
