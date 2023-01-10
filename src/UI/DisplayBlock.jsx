import { Button } from '@mui/material'

const DisplayBlock = (props) => {
  const { content, type } = props
  return (
    <Button
      variant='contained'
      disableRipple
      sx={{
        margin: 1,
        cursor: 'default',
        '&:hover': { backgroundColor: '#1876D2' },
      }}
      color={type === 'error' ? 'error' : 'primary'}
    >
      {content}
      {props.children}
    </Button>
  )
}

export default DisplayBlock
