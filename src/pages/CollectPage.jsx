import classes from './CollectPage.module.scss'
import LayoutWrapper from '../Layout/LayoutWrapper'
import { Tabs, Tab, Box } from '@mui/material'
import RoomItem from '../components/RoomItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UrlInput from '../components/UrlInput'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loop } from '@mui/icons-material'
import { getAllInfo, getMoreInfo } from '../store/room-slice'

const CollectPage = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allRoom = useSelector((state) => state.room.allRoom)
  const isCollectUpdate = useSelector((state) => state.room.isCollectUpdate)
  const hasMoreRoom = useSelector((state) => state.room.hasMoreRoom)
  const [tabValue, setTabValue] = useState(0)
  const [page, setPage] = useState(1)
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])

  useEffect(() => {
    setTabValue(0)
    dispatch(getAllInfo({ page: 1, filter: 'all' }))
    setPage(2)
  }, [dispatch, isCollectUpdate])

  const roomList = allRoom.map((data) => <RoomItem data={data} key={data.id} />)

  const allMetHandler = () => {
    dispatch(getAllInfo({ page: 1, filter: 'allMet' }))
    setPage(2)
    setTabValue(1)
  }
  const notAllMetHandler = () => {
    dispatch(getAllInfo({ page: 1, filter: 'notAllMet' }))
    setPage(2)
    setTabValue(2)
  }
  const allHandler = async () => {
    dispatch(getAllInfo({ page: 1, filter: 'all' }))

    setPage(2)
    setTabValue(0)
  }
  const changePage = async () => {
    dispatch(
      getMoreInfo({
        page: page,
        filter: `${
          tabValue === 1 ? 'allMet' : tabValue === 2 ? 'notAllMet' : ''
        }`,
      })
    )
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
              onClick={notAllMetHandler}
            />
          </Tabs>
        </Box>
        <div className={classes.roomItemContainer} id='room__list'>
          {allRoom.length === 0 ? (
            tabValue === 0 ? (
              <p className={classes.emptyMessage}>目前還沒收藏任何物件</p>
            ) : (
              <p className={classes.emptyMessage}>該分類目前沒有任何物件</p>
            )
          ) : (
            <InfiniteScroll
              className={classes.infiniteScroll}
              dataLength={allRoom.length}
              next={changePage}
              hasMore={hasMoreRoom !== 0}
              loader={
                <div className={classes.loadingContainer}>
                  <Loop
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
