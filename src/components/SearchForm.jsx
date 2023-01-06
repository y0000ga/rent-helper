import classes from './SearchForm.module.scss'
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
import { useState } from 'react'
const SearchForm = () => {
  const [region, setRegion] = useState('taipei')
  return (
    <>
      <div className={classes.option__container}>
        <p className={classes.title}>
          搜尋條件組合名稱<span className={classes.highlight}> *</span>
        </p>
        <TextField
          id='searchName'
          size='small'
          className={classes.textField}
          style={{ marginLeft: '10px' }}
        />
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>額外搜尋關鍵字</p>
        <TextField
          id='searchName'
          size='small'
          className={classes.textField}
          style={{ marginLeft: '10px' }}
        />
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>
          位置<span className={classes.highlight}> *</span>
        </p>
        <FormGroup className={classes.options__content}>
          <Button
            variant='text'
            onClick={() => {
              setRegion('taipei')
            }}
          >
            台北市
          </Button>
          <Button
            variant='text'
            onClick={() => {
              setRegion('newpei')
            }}
          >
            新北市
          </Button>
          <div>
            {region === 'taipei'
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
            <FormControlLabel control={<Checkbox />} label={data} key={data} />
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
          <TextField id='rentMin' size='small' className={classes.textField} />
          <p>到</p>
          <TextField id='rentMax' size='small' className={classes.textField} />
          <p>元</p>
        </FormGroup>
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>
          坪數<span className={classes.highlight}> *</span>
        </p>
        <FormGroup className={classes.options__content}>
          <TextField id='spaceMin' size='small' className={classes.textField} />
          <p>到</p>
          <TextField id='spaceMax' size='small' className={classes.textField} />
          <p>坪</p>
        </FormGroup>
      </div>
      <Divider sx={{ margin: '15px 8px' }} />
      <div className={classes.option__container}>
        <p className={classes.title}>限制</p>
        <FormGroup className={classes.options__content}>
          {limitation.map((data) => (
            <FormControlLabel control={<Checkbox />} label={data} key={data} />
          ))}
        </FormGroup>
      </div>
      <Button variant='contained' className={classes.submitBtn}>
        儲存搜尋條件組合
      </Button>
    </>
  )
}

export default SearchForm
