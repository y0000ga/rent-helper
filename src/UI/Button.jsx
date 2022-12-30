import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'

export const ConditionBlock = (props) => {
  const { content } = props
  return (
    <Button variant='contained' sx={{ margin: 1, cursor: 'default' }}>
      {content}
      {props.children}
    </Button>
  )
}

export const AdjustBlock = (props) => {
  const { content, type, math, width,onClick } = props
  return (
    <Button
      variant={math === 'add' ? 'outlined' : 'contained'}
      sx={{ margin: 1, width: `${width}` }}
      color={
        type === 'mustNotHave'
          ? 'error'
          : type === 'addiExpen'
          ? 'success'
          : 'primary'
      }
      onClick={onClick}
    >
      {content}
      {math === 'add' ? (
        <AddIcon fontSize='small' />
      ) : (
        <CloseIcon fontSize='small' sx={{ marginLeft: 1 }} />
      )}
    </Button>
  )
}

export const CheckBlock = (props) => {
  const { content, type, checked } = props
  return (
    <Button
      variant={checked ? 'contained' : 'outlined'}
      color={
        type === 'mustNotHave'
          ? 'error'
          : type === 'addiExpen'
          ? 'success'
          : 'primary'
      }
      sx={{ margin: 1, cursor: 'default' }}
    >
      {content}
    </Button>
  )
}

export const TextButton = (props) => {
  const { content } = props
  return <Button sx={{ margin: 1 }}>{content}</Button>
}

export const ToggleButton = (props) => {
  const { content, checked, type } = props
  return (
    <Button
      variant={checked === true ? 'contained' : 'outlined'}
      sx={{ margin: 1 }}
      color={type === 'mustNotHave' ? 'error' : 'primary'}
    >
      {content}
    </Button>
  )
}
