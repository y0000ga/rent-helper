import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'

const ToggleButton = (props) => {
  const { content, checked, type } = props
  const [isEdit, setIsEdit] = useState(false)
  const [isChecked, setIsChecked] = useState(checked)
  const mustHaveVariantRule = isChecked === true ? 'contained' : 'outlined'
  const mustNotHaveVariantRule = isChecked === true ? 'outlined' : 'contained'
  const EditButton = () => {
    return (
      <Button
        variant={isChecked === true ? 'contained' : 'outlined'}
        sx={{ margin: 1, cursor: 'default' }}
        color={type === 'mustNotHave' ? 'error' : 'primary'}
      >
        {isChecked === true ? '有' : '無'}
        {content}
        <CheckIcon
          sx={{ margin: '0 5px', cursor: 'pointer' }}
          onClick={() => {
            setIsChecked(true)
            setIsEdit(false)
          }}
        />
        <CloseIcon
          sx={{ margin: '0 5px', cursor: 'pointer' }}
          onClick={() => {
            setIsChecked(false)
            setIsEdit(false)
          }}
        />
      </Button>
    )
  }
  const NormalButton = () => {
    return (
      <Button
        variant={type === 'mustHave' ? mustHaveVariantRule : mustNotHaveVariantRule}
        sx={{ margin: 1, cursor: 'default' }}
        color={type === 'mustNotHave' ? 'error' : 'primary'}
      >
        {isChecked === true ? '有' : '無'}
        {content}
        <EditIcon
          sx={{ marginLeft: 1, cursor: 'pointer' }}
          onClick={() => {
            setIsEdit(true)
          }}
        />
      </Button>
    )
  }
  return (
    <>
      {isEdit === true ? (
        <EditButton />
      ) : (
        <NormalButton />
      )}
    </>
  )
}

export default ToggleButton
