import classes from './ConditionList.module.scss'
import { ConditionBlock } from '../UI/Button'
const ConditionList = (props) => {
  const { section, kind, shape, price, area, addition } = props.data
  return (
    <div className={classes.condition__list}>
      {section.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      {kind.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      {shape.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      <ConditionBlock content={`${price[0]} 到 ${price[1]}元`} />
      <ConditionBlock content={`${area[0]} 到 ${area[1]}坪`} />
      <ConditionBlock content={addition} />
    </div>
  )
}

export default ConditionList
