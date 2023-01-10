import { useNavigate, useLocation } from 'react-router-dom'
import { navItemData } from '../configData'
import { useDispatch } from 'react-redux'
import { roomActions } from '../store/room-slice'
import { settingActions } from '../store/setting-slice'
import { searchActions } from '../store/search-slice'

const NavList = () => {
  const dispatch = useDispatch()
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
          dispatch(roomActions.clearRoomInfo())
          dispatch(settingActions.clearSettingInfo())
          dispatch(searchActions.clearSearchInfo())
          localStorage.clear()
          navigate(data.pathname)
          return
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
