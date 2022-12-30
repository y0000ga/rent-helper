import { useNavigate } from 'react-router-dom'
import { navItemData } from '../configData'

const NavList = () => {
  const navigate = useNavigate()
  const navItems = navItemData.map((data) => (
    <li
      key={data.title}
      onClick={() => {
        navigate(data.pathname)
      }}
    >
      {data.title}
    </li>
  ))
  return <>{navItems}</>
}

export default NavList
