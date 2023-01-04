import { useNavigate } from 'react-router-dom'
import { navItemData } from '../configData'
import { useLocation } from 'react-router-dom'

const NavList = () => {
  const navigate = useNavigate()
  const currentPathname = useLocation().pathname
  const navItems = navItemData.map((data) => (
    <li
      key={data.title}
      style={{
        color: data.pathname === currentPathname ? '#1876D2' : undefined,
      }}
      onClick={() => {
        navigate(data.pathname)
        if (data.title === '登出') {
          localStorage.clear()
        }
      }}
    >
      {data.title}
    </li>
  ))
  return <>{navItems}</>
}

export default NavList
