import classes from './RoomItem.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { ConditionBlock, CheckBlock, TextButton } from '../UI/Button'
const RoomItem = () => {
  return (
    <div className={classes.roomItem}>
      <div className={classes.pointer}>
        <CloseIcon />
      </div>
      <p>編號: 5961 </p>
      <div className={classes.intro}>
        <ConditionBlock content='信義區' />
        <ConditionBlock content='整層住宅' />
        <ConditionBlock content='28坪' />
        <ConditionBlock content='20000 元' />
        <ConditionBlock content='公寓' />
        <CheckBlock content='必備全通過' checked={false} type='mustHave' />
        <CheckBlock content='避免全通過' checked={false} type='mustNotHave' />
        <CheckBlock
          content='額外支出 2000 元'
          checked={true}
          type='addiExpen'
        />
      </div>
      <TextButton content='查看與編輯物件資訊' />
    </div>
  )
}

export default RoomItem
