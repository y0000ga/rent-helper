import classes from './CollectPage.module.scss'
import LayoutWrapper from '../Layout/LayoutWrapper'
import { Tabs, Tab, Box } from '@mui/material'
import RoomItem from '../components/RoomItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UrlInput from '../components/UrlInput'
import { housesAllGetApi } from '../api/housesApi'
import { roomActions } from '../store/room-slice'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoopIcon from '@mui/icons-material/Loop'

const CollectPage = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allRoom = useSelector((state) => state.room.allRoom)
  const [tabValue, setTabValue] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])

  useEffect(() => {
    const housesAllGet = async () => {
      const res = await housesAllGetApi({ page: 1 })
      const { houses } = res.data
      dispatch(roomActions.getAllHouses(houses))
      setPage(2)
    }
    housesAllGet()
  }, [dispatch])

  const roomList = allRoom.map((data) => <RoomItem data={data} key={data.id} />)

  const changePage = async () => {
    const res = await housesAllGetApi({ page: page })
    const { houses } = res.data
    setHasMore(houses.length)
    dispatch(roomActions.changeHousesPage(houses))
    setPage((page) => page + 1)
  }

  return (
    <LayoutWrapper>
      <div className={classes.container}>
        <UrlInput />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} className={classes.tabs}>
            <Tab
              value={0}
              label='全部'
              sx={{ width: '33.3%' }}
              onClick={() => {
                setTabValue(0)
              }}
            />
            <Tab
              value={1}
              label='必備全通過'
              sx={{ width: '33.3%' }}
              onClick={() => {
                setTabValue(1)
              }}
            />
            <Tab
              value={2}
              label='避免全通過'
              sx={{ width: '33.3%' }}
              onClick={() => {
                setTabValue(2)
              }}
            />
          </Tabs>
        </Box>
        <div className={classes.roomItemContainer} id='room__list'>
          <InfiniteScroll
            className={classes.infiniteScroll}
            dataLength={allRoom.length}
            next={changePage}
            hasMore={hasMore !== 0}
            loader={
              <div className={classes.loadingContainer}>
                <LoopIcon
                  className={classes.loading}
                  sx={{ cursor: 'wait', fontSize: '54px' }}
                  color='success'
                />
              </div>
            }
            endMessage={null}
            scrollableTarget='room__list'
            height={850}
          >
            {roomList}
          </InfiniteScroll>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default CollectPage
