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
import { taipeiDistData, newpeiDistData } from '../configData'
import * as yup from 'yup'
const SearchForm = () => {
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
            <Button variant='text'>台北市</Button>
            <Button variant='text'>新北市</Button>
            <div>
              {taipeiDistData.map((data) => (
                <FormControlLabel control={<Checkbox />} label={data} />
              ))}
              {/* {newpeiDistData.map((data) => (
              <FormControlLabel control={<Checkbox />} label={data} />
            ))} */}
            </div>
          </FormGroup>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            類型<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <FormControlLabel control={<Checkbox />} label='不限' />
            <FormControlLabel control={<Checkbox />} label='整層住家' />
            <FormControlLabel control={<Checkbox />} label='獨立套房' />
            <FormControlLabel control={<Checkbox />} label='分租套房' />
            <FormControlLabel control={<Checkbox />} label='雅房' />
          </FormGroup>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            型態<span className={classes.highlight}> *</span>
          </p>
          <FormGroup className={classes.options__content}>
            <FormControlLabel control={<Checkbox />} label='不限' />
            <FormControlLabel control={<Checkbox />} label='公寓' />
            <FormControlLabel control={<Checkbox />} label='電梯大樓' />
          </FormGroup>
        </div>
        <Divider sx={{ margin: '15px 8px' }} />
        <div className={classes.option__container}>
          <p className={classes.title}>
            租金<span className={classes.highlight}> *</span>
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
            <FormControlLabel control={<Checkbox />} label='排除頂樓加蓋' />
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
