import { forwardRef, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import {registerUserApi} from '../../api/api'

const BirdhDateInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const DOJInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Date Of Join' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,
    userName: '',
    firstName: '',
    role: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    zipCode: '',
    dob: null,
    dateOfJoin: null,
    
  })

  const handleClear = () => {
    setValues({
      password: '',
      password2: '',
      showPassword: false,
      showPassword2: false,
      userName: '',
      firstName: '',
      role: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      zipCode: '',
      dob: null,
      dateOfJoin: null,
    })
    setSubmitStatus('')
  }

const handleSubmit = (e) => {
    e.preventDefault();
    registerUserApi(values)
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        if (response.status===201) {toast.success('Successfully Register')}
        
      })

      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          toast.error('Register Failed');
          
        } else if (error.request) {
          console.error('Request failed with status code ' + error.request.status);
        } else {
          console.error('Error', error.message);
        }
      })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleConfirmChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSelectRoleChange = (event) => {
    setValues({ ...values, role: event.target.value })
  }

  const handleFirstNameChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleLastNameChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleEmailChange = (prop) => (event) => {
    setValues({ ...values, email: event.target.value })
  }

  const handlePhoneNumberChange = () => (event) => {
    setValues({ ...values, phoneNumber: event.target.value })
  }

  const handleZipCodeChange = (prop) => (event) => {
    setValues({ ...values, zipCode: event.target.value })
  }

  const handleDobChange = (date) => {
    setValues({ ...values, dob: date })
  }

  const handleDateOfJoinChange = (date) => {
    setValues({ ...values, dateOfJoin: date })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = ()=> {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault()
  }

  return (
    <DatePickerWrapper>
    <Card>
      <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={(e) => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Account Details 
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Username'
                placeholder='carterLeonard'
                value={values.userName}
                onChange={handleChange('userName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                value={values.email}
                onChange={handleEmailChange('email')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='form-layouts-separator-password'
                  onChange={handlePasswordChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password-2'>Confirm Password</InputLabel>
                <OutlinedInput
                  value={values.password2}
                  label='Confirm Password'
                  id='form-layouts-separator-password-2'
                  onChange={handleConfirmChange('password2')}
                  type={values.showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {values.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Personal Info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='First Name'
                placeholder='Leonard'
                value={values.firstName}
                onChange={handleFirstNameChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                placeholder='Carter'value={values.lastName}
                onChange={handleLastNameChange('lastName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            
              <DatePicker
                selected={values.dob}
                placeholderText='MM-DD-YYYY'
                customInput={<BirdhDateInput />}
                id='form-layouts-separator-birthdate'
                onChange={handleDobChange}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Role</InputLabel>
                <Select
                  value={values.role}
                  onChange={handleSelectRoleChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Role' id='select-multiple-role' />}
                >
                  <MenuItem value='ROLE_ADMIN'>Admin</MenuItem>
                  <MenuItem value='ROLE_DEAN'>Dean</MenuItem>
                  <MenuItem value='ROLE_CHAIRMAN'>Chairman</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={values.dateOfJoin}
                placeholderText='MM-DD-YYYY'
                customInput={<DOJInput />}
                id='form-layouts-separator-dateofjoin'
                onChange={handleDateOfJoinChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Phone No.'
                placeholder='+1-123-456-8790'
                value={values.phoneNumber}
                onChange={handlePhoneNumberChange('phoneNumber')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label='Address'
                
                value={values.address}
                onChange={handleChange('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Zip Code'
                placeholder='22100'
                value={values.zipCode}
                onChange={handleZipCodeChange('zipCode')}
              />
            </Grid>
            
            </Grid>
         
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={handleClear}>
            Clear
          </Button>
        </CardActions>
      </form>
    </Card>
    </DatePickerWrapper>
  )
}

export default FormLayoutsSeparator