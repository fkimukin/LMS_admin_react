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

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

import CircularProgress from '@mui/material/CircularProgress'
import Select from '@mui/material/Select'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import UserTable from './userTable'
import Popover from '@mui/material/Popover';
import {updateUserAdmin} from '../../api/api'
import UpdatePassword from './updatePassword'
import Alert from '@mui/material/Alert'


const FormLayouts = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
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
    formik.resetForm();
}

  const [loading, setLoading] = useState(false);

  const rolesMapping = {
    Administrator: 'ROLE_ADMIN',
    Dean: 'ROLE_DEAN',
    Chairman: 'ROLE_CHAIRMAN',
  }


const formik = useFormik({
    initialValues: {
      userName: '',
      firstName: '',
      lastName: '',
      roles: [],
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
      roles: Yup.array()
        .min(1, "At least one role should be selected")
        .required("Role is required"),
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
    }),
    validateOnChange: true,
  initialTouched: {
    userName: true,
    firstName: true,
    lastName: true,
    email: true,
    roles: true,
    phoneNumber: true,
    address: true,
    zipCode: true,
    dob: true,
    dateOfJoin: true,
  },
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true)

      let submitValues = {
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        roles: values.roles,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        zipCode: values.zipCode,
        dob: values.dob,
        dateOfJoin: values.dateOfJoin,
      };
      updateUserAdmin(selectedUserId, submitValues)
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

  useEffect(() => {
    if (selectedUser) {
      setSelectedUserId(selectedUser.userId);      
      formik.setFieldValue("userName", selectedUser.userName);
      formik.setFieldValue("firstName", selectedUser.firstName);
      formik.setFieldValue("lastName", selectedUser.lastName);

      const rolesValues = Array.isArray(selectedUser.roles)
        ? selectedUser.roles
        : [selectedUser.roles];

        const mappedRoles = rolesValues.map((roles) => rolesMapping[roles] || roles);

      formik.setFieldValue("roles", mappedRoles);
      formik.setFieldValue("email", selectedUser.email);
      formik.setFieldValue("phoneNumber", selectedUser.phoneNumber);
      formik.setFieldValue("address", selectedUser.address);
      formik.setFieldValue("zipCode", selectedUser.zipCode);

      const dob = selectedUser.dob
        ? new Date(selectedUser.dob)
        : formik.values.dob;

      const dateOfJoin = selectedUser.dateOfJoin
        ? new Date(selectedUser.dateOfJoin)
        : formik.values.dateOfJoin;

      formik.setFieldValue("dateOfJoin", dateOfJoin);
      formik.setFieldValue("dob", dob);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

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
    
    <DatePickerWrapper>
      <Card>
        <CardHeader title='Select User' titleTypographyProps={{ variant: 'h6' }} />
        <UserTable 
        setSelectedUser = {setSelectedUser}
        refreshPage = {refreshPage}
        setRefreshPage = {setRefreshPage}
        />
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
                  name="dob"
                  selected={formik.values.dob}
                  placeholderText="MM-DD-YYYY"
                  customInput={<BirdhDateInput />}
                  id="form-layouts-separator-birthdate"
                  onChange={handleDateChange("dob")} />

              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-multiple-select-label'>Select Role</InputLabel>
                  <Select
                    multiple
                    fullWidth
                    name="role"
                    labelId="form-layouts-separator-multiple-select-label"
                    value={formik.values.roles}
                    onChange={handleRolesChange("roles")}
                    error={formik.touched.role && Boolean(formik.errors.roles)}
                    input={<OutlinedInput label="Role" id="select-multiple-role" />}
                  >
                    <MenuItem value='ROLE_ADMIN'>Administrator</MenuItem>
                    <MenuItem value='ROLE_DEAN'>Dean</MenuItem>
                    <MenuItem value='ROLE_CHAIRMAN'>Chairman</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  name="doj"
                  selected={formik.values.dateOfJoin}
                  placeholderText="MM-DD-YYYY"
                  customInput={<DOJInput />}
                  id="form-layouts-separator-dateofjoin"
                  onChange={handleDateChange("dateOfJoin")} />
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
      <UpdatePassword
      selectedUserId= {selectedUserId}
      />
    </DatePickerWrapper>

      
      
  )
}

export default FormLayouts