import classes from './ConditionList.module.scss'
import { ConditionBlock } from '../UI/Button'
const ConditionList = (props) => {
  const { location, type, building, money, space, addition } = props.data
  return (
    <div className={classes.condition__list}>
      {location.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      {type.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      {building.map((data) => (
        <ConditionBlock content={data} key={data} />
      ))}
      <ConditionBlock content={`${money[0]} 到 ${money[1]}元`} />
      <ConditionBlock content={`${space[0]} 到 ${space[1]}坪`} />
      <ConditionBlock content={addition} />
    </div>
  )
}

export default ConditionList
