import classes from './CollectPage.module.scss'
import GridSystem from '../Layout/GridSystem'
import { TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Backdrop from '@mui/material/Backdrop'
import room from '../assets/figure/room.jpg'
import CloseIcon from '@mui/icons-material/Close'
import Pagination from '@mui/material/Pagination'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { AdjustBlock, ToggleButton } from '../UI/Button'
import RoomItem from '../components/RoomItem'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

const CollectPage = () => {
  return (
    <GridSystem>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <div className={classes.modal}>
          <div className={classes.top}>
            <p>這是很棒的房子 (20000 元/月)</p>
            <CloseIcon />
          </div>
          <div className={classes.bottom}>
            <div className={classes.imgList}>
              <img src={room} alt='fig' />
              <Pagination count={10} className={classes.pagination} />
            </div>
            <p className={classes.title}>額外支出</p>
            <div className={classes.conditionList}>
              <AdjustBlock content='無冰箱 (+500)' type='addiExpen' />
              <AdjustBlock content='無冰箱 (+500)' type='addiExpen' />
              <AdjustBlock content='無冰箱 (+500)' type='addiExpen' />
              <AdjustBlock content='無冰箱 (+500)' type='addiExpen' />
              <AdjustBlock content='新增' type='addiExpen' math='add' />
            </div>
            <p className={classes.title}>符合必備條件</p>
            <div className={classes.conditionList}>
              <ToggleButton content='冰箱' type='mustHave' checked={true} />
              <ToggleButton content='陽台' type='mustHave' checked={false} />
            </div>
            <p className={classes.title}>符合避免條件</p>
            <div className={classes.conditionList}>
              <ToggleButton
                content='地下室'
                type='mustNotHave'
                checked={true}
              />
              <ToggleButton
                content='房東住附近'
                type='mustNotHave'
                checked={false}
              />
              <ToggleButton content='壁癌' type='mustNotHave' checked={true} />
            </div>
            <TextField
              id='note'
              multiline
              rows={4}
              placeholder='請輸入註記'
              sx={{ margin: 1 }}
              className={classes.textField}
            />
            <ButtonGroup
              variant='contained'
              sx={{ margin: 1 }}
              className={classes.navList}
            >
              <Button>詳細位置</Button>
              <Button>591 資訊</Button>
              <Button>儲存</Button>
            </ButtonGroup>
          </div>
        </div>
      </Backdrop> */}
      <div className={classes.container}>
        <div className={classes.urlInput}>
          <TextField
            id='outlined-basic'
            label='請輸入物件網址'
            variant='outlined'
            style={{ width: '95%' }}
          />
          <AddIcon className={classes.addIcon} />
        </div>
      </div>
      <div className={classes.mustHave}>
        <div className={classes.title}>必備 (5/10)</div>
        <AdjustBlock content='陽台' type='mustHave' />
        <AdjustBlock content='冰箱' type='mustHave' />
        <AdjustBlock content='垃圾車' type='mustHave' />
        <AdjustBlock content='洗衣機' type='mustHave' />
        <AdjustBlock content='床' type='mustHave' />
        <AdjustBlock content='必備條件' math='add' type='mustHave' />
      </div>
      <div className={classes.mustNotHave}>
        <div className={classes.title}>避免 (2/10) </div>
        <AdjustBlock content='壁癌' type='mustNotHave' />
        <AdjustBlock content='地下室' type='mustNotHave' />
        <AdjustBlock content='必備條件' math='add' type='mustNotHave' />
      </div>
      <div className={classes.container}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={1} aria-label='basic tabs example'>
            <Tab value={0} label='全部' />
            <Tab value={1} label='必備全通過' />
            <Tab value={2} label='避免全通過' />
          </Tabs>
        </Box>
        <RoomItem />
        <RoomItem />
        <RoomItem />
      </div>
    </GridSystem>
  )
}

export default CollectPage
