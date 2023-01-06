import classes from './ConditionList.module.scss'
import { ConditionBlock } from '../UI/Button'

const ConditionList = (props) => {
  const {
    sections,
    kind,
    shape,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    notCover,
    keyword,
  } = props.data

  return (
    <div className={classes.condition__list}>
      {sections.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      <ConditionBlock content={keyword} key={keyword} />
      <ConditionBlock content={kind} key={kind} />
      <ConditionBlock content={shape} key={shape} />
      <ConditionBlock content={`${minPrice} 到 ${maxPrice}元`} />
      <ConditionBlock content={`${minArea} 到 ${maxArea}坪`} />
      {notCover === true && <ConditionBlock content='排除頂樓加蓋' />}
    </div>
  )
}

export default ConditionList
