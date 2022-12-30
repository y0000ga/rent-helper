import { TextField } from '@mui/material'
import { useField } from 'formik'

const InputField = ({ ...props }) => {
  const [field, meta] = useField(props) // 透過 useField 去取值
  return (
    <>
      <TextField
        {...props}
        {...field}
        error={meta.error && meta.touched === true && true}
        helperText={meta.touched === true && meta.error}
        sx={{ m: 2, width: '80%' }}
      />
    </>
  )
}

export default InputField
