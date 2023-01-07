import { Button } from '@mui/material'

const DisplayBlock = (props) => {
  const { content, margin } = props
  return (
    <Button
      sx={{
        '&:hover': { backgroundColor: 'transparent' },
        margin: `${margin}`,
      }}
    >
      {content}
    </Button>
  )
}

export default DisplayBlock
