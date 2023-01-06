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
  const isModalShown = useSelector((state) => state.room.isModalShown)
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
    if (isModalShown === false) {
      setTabValue(0)
      housesAllGet()
    }
  }, [dispatch, isModalShown])

  const roomList = allRoom.map((data) => <RoomItem data={data} key={data.id} />)
  const allMetHandler = async () => {
    const res = await housesAllGetApi({ page: 1, filter: 'allMet' })
    const { houses } = res.data
    dispatch(roomActions.getAllHouses(houses))
    setPage(2)
    setTabValue(1)
  }
  const notAllMetHanldler = async () => {
    const res = await housesAllGetApi({ page: 1, filter: 'notAllMet' })
    const { houses } = res.data
    dispatch(roomActions.getAllHouses(houses))
    setPage(2)
    setTabValue(2)
  }
  const allHandler = async () => {
    const res = await housesAllGetApi({ page: 1 })
    const { houses } = res.data
    dispatch(roomActions.getAllHouses(houses))
    setPage(2)
    setTabValue(0)
  }
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
              onClick={allHandler}
            />
            <Tab
              value={1}
              label='條件全符合'
              sx={{ width: '33.3%' }}
              onClick={allMetHandler}
            />
            <Tab
              value={2}
              label='條件未全符合'
              sx={{ width: '33.3%' }}
              onClick={notAllMetHanldler}
            />
          </Tabs>
        </Box>
        <div className={classes.roomItemContainer} id='room__list'>
          {allRoom.length === 0 ? (
            <p className={classes.emptyMessage}>目前還沒收藏任何物件喔!</p>
          ) : (
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
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default CollectPage
