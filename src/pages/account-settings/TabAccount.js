// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import DatePicker from 'react-datepicker'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'
import CircularProgress from '@mui/material/CircularProgress'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Popover from '@mui/material/Popover';
import {getCurrentUser, updateUser} from '../../api/api'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  //const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverMessage, setPopoverMessage] = useState(null);
  const [popoverAlert, setPopoverAlert] = useState('info');
  const [refreshPage, setRefreshPage] = useState(0);

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

  const handleClear = () => {
    setLoading(true)
    setRefreshPage(refreshPage + 1);
    setLoading(false)
}

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      zipCode: '',
      dob: '',
      dateOfJoin: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
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
    }),
    validateOnChange: true,
  initialTouched: {
    userName: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address: true,
    zipCode: true,
    
  },
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true)

      let submitValues = {
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber, 
        address: values.address,
        zipCode: values.zipCode,

        //dob: values.dob,
        //dateOfJoin: values.dateOfJoin,
      };
      updateUser(submitValues)
        .then((response) => {
          console.log(response.data)
          console.log(response.status)
          setPopoverMessage('Successfully Updated')
          setPopoverAlert('success')
          setSubmitting(false)
          setLoading(false)
          setRefreshPage(refreshPage + 1);
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.data)
            setPopoverMessage('Update Failed : '+ error.response.data.message)
            setPopoverAlert('error')
          } else if (error.request) {
            console.error('Update failed with status code ' + error.request.status)
            setPopoverMessage('Update Failed : '+ error.request.status)
            setPopoverAlert('error')
          } else {
            console.error('Error', error.message)
            setPopoverMessage('Update Failed : '+ error.message)
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

  useEffect(() => {
    setLoading(true)
    getCurrentUser()
    .then((response) => {
      formik.setFieldValue("userName", response.userName);
      formik.setFieldValue("firstName", response.firstName);
      formik.setFieldValue("lastName", response.lastName);
      formik.setFieldValue("email", response.email);
      formik.setFieldValue("phoneNumber", response.phoneNumber);
      formik.setFieldValue("address", response.address);
      formik.setFieldValue("zipCode", response.zipCode);

      const dob = response.dob
        ? new Date(response.dob)
        : formik.values.dob;

      const dateOfJoin = response.dateOfJoin
        ? new Date(response.dateOfJoin)
        : formik.values.dateOfJoin;

      formik.setFieldValue("dateOfJoin", dateOfJoin);
      formik.setFieldValue("dob", dob);
      console.log(response)
      setLoading(false)
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response)
        setPopoverMessage('Update Failed : '+ error.response.message)
        setPopoverAlert('error')
      } else {
        console.error('Error', error.message)
        setPopoverMessage('Update Failed : '+ error.message)
        setPopoverAlert('error')
      }
      setLoading(false)
      
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPage]);

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
  
return (
    <CardContent>
     {/*  <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

       

        </Grid>
      </form> */}
      <DatePickerWrapper>
      <Card>
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
                  name="userName"
                  label="Username"
                  placeholder="carterLeonard"
                  value={formik.values.userName}
                  onChange={handleChange("userName")}
                  onBlur={handleChange("userName")}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  disabled= {true}
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="carterleonard@gmail.com"
                  value={formik.values.email}
                  onChange={handleChange("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email} />
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
                  disabled= {true}
                  name="firstName"
                  label="First Name"
                  placeholder="Leonard"
                  value={formik.values.firstName}
                  onChange={handleChange("firstName")}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  disabled= {true}
                  name="lastName"
                  label="Last Name"
                  placeholder="Carter"
                  value={formik.values.lastName}
                  onChange={handleChange("lastName")}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  disabled= {true}
                  name="dob"
                  selected={formik.values.dob}
                  placeholderText="MM-DD-YYYY"
                  customInput={<BirdhDateInput />}
                  id="form-layouts-separator-birthdate"
                  />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  disabled= {true}
                  name="doj"
                  selected={formik.values.dateOfJoin}
                  placeholderText="MM-DD-YYYY"
                  customInput={<DOJInput />}
                  id="form-layouts-separator-dateofjoin" 
                  />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone No."
                  placeholder="(000) 000-000"
                  value={formik.values.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={handleChange("address")}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address} />
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
                  helperText={formik.touched.zipCode && formik.errors.zipCode} />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button
              size="large"
              type="submit"
              sx={{ mr: 2 }}
              
              variant="contained"
              disabled={!(formik.dirty) || loading}
              onClick={handleOpenPopover}
              aria-describedby={id}
            >
              {loading && <CircularProgress color="success" />}
              Save
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
    </CardContent>
    
  )
}

export default TabAccount
