import classes from './SearchForm.module.scss'
import { Formik, Form } from 'formik'
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Divider,
} from '@mui/material'
import {
  taipeiDistData,
  newpeiDistData,
  type,
  style,
  limitation,
} from '../configData'
import * as yup from 'yup'
import { useState } from 'react'
const SearchForm = () => {
  const [city, setCity] = useState('taipei')
  return (
    <Formik>
      <Form>
        <TextField
          id='spaceMin'
          size='small'
          placeholder='請輸入額外搜尋條件'
          className={classes.textField}
          sx={{ margin: 1 }}
        />
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            位置<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <Button
              variant='text'
              onClick={() => {
                setCity('taipei')
              }}
            >
              台北市
            </Button>
            <Button
              variant='text'
              onClick={() => {
                setCity('newpei')
              }}
            >
              新北市
            </Button>
            <div>
              {city === 'taipei'
                ? taipeiDistData.map((data) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      label={data}
                      key={data}
                    />
                  ))
                : newpeiDistData.map((data) => (
                    <FormControlLabel
                      control={<Checkbox />}
                      label={data}
                      key={data}
                    />
                  ))}
            </div>
          </FormGroup>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            類型<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            {type.map((data) => (
              <FormControlLabel
                control={<Checkbox />}
                label={data}
                key={data}
              />
            ))}
          </FormGroup>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            型態<span className={classes.highlight}> *</span>
          </p>
          {style.map((data) => (
            <FormControlLabel control={<Checkbox />} label={data} key={data} />
          ))}
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            租金<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <TextField
              id='rentMin'
              size='small'
              className={classes.textField}
            />
            <p>到</p>
            <TextField
              id='rentMax'
              size='small'
              className={classes.textField}
            />
            <p>元</p>
          </FormGroup>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            坪數<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <TextField
              id='spaceMin'
              size='small'
              className={classes.textField}
            />
            <p>到</p>
            <TextField
              id='spaceMax'
              size='small'
              className={classes.textField}
            />
            <p>坪</p>
          </FormGroup>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>限制</p>
          <FormGroup className={classes.options__content}>
            {limitation.map((data) => (
              <FormControlLabel
                control={<Checkbox />}
                label={data}
                key={data}
              />
            ))}
          </FormGroup>
        </div>
        <Button variant='contained' className={classes.submitBtn}>
          儲存搜尋條件組合
        </Button>
      </Form>
    </Formik>
  )
}

export default SearchForm
