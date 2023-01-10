import { useNavigate, useLocation } from 'react-router-dom'
import { navItemData } from '../configData'
import { useDispatch } from 'react-redux'
import { lineAuthGetApi } from '../api/lineAuthApi'
import { roomActions } from '../store/room-slice'
import { settingActions } from '../store/setting-slice'
import { searchActions } from '../store/search-slice'
import { userActions } from '../store/user-slice'
import Swal from 'sweetalert2'

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
          dispatch(userActions.clearUserInfo())
          localStorage.clear()
          navigate(data.pathname)
          return
        }
        if (data.title === '搜尋') {
          const res = await lineAuthGetApi()
          const { link, message } = res.data
          if (message === undefined) {
            Swal.fire({
              title: '<strong>尚未與 Line Notify 連動</strong>',
              icon: 'warning',
              html:`點擊<a href="${link}">此連結</a>以前往設定頁面`,
              showCloseButton: true,
              showConfirmButton: false,
            })
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
