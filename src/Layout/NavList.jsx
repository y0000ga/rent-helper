import { useNavigate } from 'react-router-dom'
import { navItemData } from '../configData'
import { useLocation } from 'react-router-dom'
import { lineAuthGetApi } from '../api/lineAuthApi'

const NavList = () => {
  const navigate = useNavigate()
  const currentPathname = useLocation().pathname
  const navItems = navItemData.map((data) => (
    <li
      key={data.title}
      style={{
        color: data.pathname === currentPathname ? '#1876D2' : undefined,
      }}
      onClick={async () => {
        if (data.title === '登出') {
          localStorage.clear()
          navigate(data.pathname)
          return
        }
        if (data.title === '搜尋') {
          const res = await lineAuthGetApi()
          const { link, message } = res.data
          if (message === undefined) {
            window.open(link)
            return
          }
        }

        navigate(data.pathname)
      }}
    >
      {data.title}
    </li>
  ))
  return <>{navItems}</>
}

export default NavList
