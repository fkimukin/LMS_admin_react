import { forwardRef, useState } from 'react'
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
import CircularProgress from '@mui/material/CircularProgress'
import Select from '@mui/material/Select'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import {registerTeacherApi} from '../../api/api'
import Alert from '@mui/material/Alert'
import Popover from '@mui/material/Popover'



const TeacherAdd = () => {
  const [passValues, setPassValues] = useState({
    
    showPassword: false,
    showPassword2: false,

  })

  const handleClear = () => {
    formik.resetForm();
}

  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverMessage, setPopoverMessage] = useState(null);
  const [popoverAlert, setPopoverAlert] = useState('info');

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPopoverMessage('')
    setPopoverAlert('info')
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


const formik = useFormik({
    initialValues: {
      teacherNo: '',
      branch: '',
      firstName: '',
      lastName: '',
      roles: ['ROLE_TEACHER'],
      password: '',
      password2: '',
      email: '',
      phoneNumber: '',
      address: '',
      zipCode: '',
      dob: '',
      dateOfJoin: '',
      dateOfLeave: '',
      status: 'Active',
    },
    validationSchema: Yup.object({
      teacherNo: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters')
        .required('Please enter first name'),
      branch: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters')
        .required('Please enter first name'),
      firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters')
        .required('Please enter first name'),
      lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be at most 50 characters')
        .required('Please enter last name'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter email address'),
        roles: Yup.array()
        .min(1, "At least one role should be selected"),

        // .required("Role is required"),
        
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must be at most 50 characters')
        .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
        .matches(/\d+/, 'Password must contain at least one number')
        .matches(/[@$!%*#?&.]+/, 'Password must contain at least one special character')
        .required('Please enter your password'),
      password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords fields doesn\'t match')
        .required('Please confirm your password'),
      phoneNumber:Yup.string()
        .matches(/^[\d\s()/-]+$/, 'There are invalid characters in your phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .max(14, 'Phone number must be at most 10 digits')
        .required('Please enter your phone number'),
      address: Yup.string()
        .min(5, 'Address must be at least 5 characters')
        .max(100, 'Address must be at most 50 characters'),
      zipCode: Yup.string()
        .min(4, 'Zip code must be at least 4 digits')
        .max(6, 'Zip code must be at most 6 digits'),
      dob: Yup.date()
        .required('Please select date of birth')
        .min(new Date(1900, 0, 1), 'Date of birth must be on or after 1st January 1900')
        .max(new Date(),'Date of birth must be in the past'),
      dateOfJoin: Yup.date()
        .required('Please select date of join'),
      dateOfLeave: Yup.date(),

        //.required('Please select date of leave'),
      status: Yup.string()

        //.required('Please select status')
    }),
    validateOnChange: true,
  
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true)

      let submitValues = {
        teacherNo: values.teacherNo,
        branch: values.branch,
        firstName: values.firstName,
        lastName: values.lastName,
        roles: values.roles,
        password: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        zipCode: values.zipCode,
        dob: values.dob,
        dateOfJoin: values.dateOfJoin,
        dateOfLeave: values.dateOfLeave,
        status: values.status
      };
      registerTeacherApi(submitValues)
        .then((response) => {
          console.log(response.data)
          console.log(response.status)
          setPopoverMessage('Successfully Register')
          setPopoverAlert('success')
          setSubmitting(false)
          setLoading(false)
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data)
            setPopoverMessage('Register Failed : '+ error.response.data.message)
            setPopoverAlert('error')
          } else if (error.request) {
            console.error('Request failed with status code ' + error.request.status)
            setPopoverMessage('Register Failed : '+ error.request.status)
            setPopoverAlert('error')
          } else {
            console.error('Error', error.message)
            setPopoverMessage('Register Failed : '+ error.message)
            setPopoverAlert('error')
          }
          setSubmitting(false)
          setLoading(false)
        })
    },})

  const handleChange = (prop) => (event) => {
      formik.setFieldValue(prop, event.target.value);
      formik.setTouched({ ...formik.touched, [prop]: true });
    };

    const handleRolesChange = (prop) => (event) => {
      if (Array.isArray(event.target.value)) {
        formik.setFieldValue(prop, event.target.value);
      } else {
        formik.setFieldValue(prop, [event.target.value]);
      }
      formik.setTouched({ ...formik.touched, [prop]: true });
    };

  const handleDateChange = (prop) => (date) => {
    formik.setFieldValue(prop, date);
    formik.setTouched({ ...formik.touched, prop: true })
  }

  const handleClickShowPassword = () => {
    setPassValues({ ...passValues, showPassword: !passValues.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = ()=> {
    setPassValues({ ...passValues, showPassword2: !passValues.showPassword2 })
  }

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault()
  }

  const BirdhDateInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} 
    inputRef={ref} 
    error={formik.touched.dob && Boolean(formik.errors.dob)}
    helperText={formik.touched.dob && formik.errors.dob} 
    label='Birth Date' autoComplete='off' />
  })
  
  const DOJInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} 
    inputRef={ref} 
    error={formik.touched.dateOfJoin && Boolean(formik.errors.dateOfJoin)}
    helperText={formik.touched.dateOfJoin && formik.errors.dateOfJoin}
    label='Date Of Join' autoComplete='off' />
  })

  // const DOLInput = forwardRef((props, ref) => {
  //   return <TextField fullWidth {...props} 
  //   inputRef={ref} 
  //   error={formik.touched.dateOfLeave && Boolean(formik.errors.dateOfLeave)}
  //   helperText={formik.touched.dateOfLeave && formik.errors.dateOfLeave}
  //   label='Date Of Leave' autoComplete='off' />
  // })

  return (
    <DatePickerWrapper>
    <Card>
      <CardHeader title='Register New Teacher' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={formik.handleSubmit} autoComplete='false'>
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
                name="teacher No"
                label="teacherNo"
                placeholder="1001"
                value={formik.values.teacherNo}
                onChange={handleChange("teacherNo")}
                onBlur={handleChange("teacherNo")}
                error={formik.touched.teacherNo && Boolean(formik.errors.teacherNo)}
                helperText={formik.touched.teacherNo && formik.errors.teacherNo} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Select Branch</InputLabel>
                <Select
                  
                  fullWidth
                  name="branch"
                  labelId="form-layouts-separator-multiple-select-branch"
                  value={formik.values.branch}
                  onChange={handleChange("branch")}
                  error={formik.touched.branch && Boolean(formik.errors.branch)}
                  input={<OutlinedInput label="branch" id="select-multiple-branch" />}
                  >
                  <MenuItem value='Math'>Math</MenuItem>
                  <MenuItem value='Science'>Science</MenuItem>
                  <MenuItem value='Social Science'>Social Science</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                <OutlinedInput
                name="password"
                label="Password"
                id="password"
                value={formik.values.password}
                onChange={handleChange("password")}
                type={passValues.showPassword ? "text" : "password"}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {passValues.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email Address"
                placeholder="carterleonard@gmail.com"
                value={formik.values.email}
                onChange={handleChange("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password-2'>Confirm Password</InputLabel>
                <OutlinedInput
                  name="password2"
                  label="Confirm Password"
                  id="confirm-password"
                  value={formik.values.password2}
                  onChange={handleChange("password2")}
                  type={passValues.showPassword2 ? "text" : "password"}
                  error={formik.touched.password2 && Boolean(formik.errors.password2)}
                  helperText={formik.touched.password2 && formik.errors.password2}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        aria-label='toggle password visibility'
                      >
                        {passValues.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
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
                name="firstName"
                label="First Name"
                placeholder="Leonard"
                value={formik.values.firstName}
                onChange={handleChange("firstName")}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                placeholder="Carter"
                value={formik.values.lastName}
                onChange={handleChange("lastName")}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                fullWidth
                name="dob"
                selected={formik.values.dob}
                placeholderText="MM-DD-YYYY"
                customInput={<BirdhDateInput />}
                id="form-layouts-separator-birthdate"
                onChange={handleDateChange("dob")}
                
              />              
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <DatePicker
                fullWidth
                name="doj"
                selected={formik.values.dateOfJoin}
                placeholderText="MM-DD-YYYY"
                customInput={<DOJInput />}
                id="form-layouts-separator-dateofjoin"
                onChange={handleDateChange("dateOfJoin")}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone No."
                placeholder="+1-123-456-8790"
                value={formik.values.phoneNumber}
                onChange={handleChange("phoneNumber")}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={handleChange("address")}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="zipCode"
                label="Zip Code"
                placeholder="22100"
                value={formik.values.zipCode}
                onChange={handleChange("zipCode")}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </Grid>  

            {/* <Grid item xs={12} sm={6}>
              <DatePicker
                fullWidth
                name="dol"
                selected={formik.values.dateOfLeave}
                placeholderText="MM-DD-YYYY"
                customInput={<DOLInput />}
                id="form-layouts-separator-dateofleave"
                onChange={handleDateChange("dateOfLeave")}                
              />
            </Grid> */}


          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
        <Button
        size="large"
        type="submit"
        sx={{ mr: 2 }}
        variant="contained"
        disabled={!(formik.dirty ) || loading}
        onClick={handleOpenPopover}
        aria-describedby={id}
      >
        {loading && <CircularProgress color="success" />}
        Submit
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <Alert severity={popoverAlert}>{popoverMessage}</Alert>
      </Popover>
          <Button size='large' color='secondary' variant='outlined' onClick={handleClear}>
            Clear
          </Button>
        </CardActions>
      </form>
    </Card>
    </DatePickerWrapper>
  )
}

export default TeacherAdd