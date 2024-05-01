import { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Popover from '@mui/material/Popover'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import {updateUserPassword} from '../../api/api'





const TabSecurity = () => {

    const [loading, setLoading] = useState(false);
    
    const [passValues, setPassValues] = useState({
        showOldPassword: false,
        showPassword: false,
        showPassword2: false,
    
      })
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

  const handleClear = () => {
    formik.resetForm();
    }

const formik = useFormik({
    initialValues: {
        oldPassword: '',
        password: '',
        password2: '',
    },
    validationSchema: Yup.object({
        oldPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must be at most 50 characters')
        .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
        .matches(/\d+/, 'Password must contain at least one number')
        .matches(/[@$!%*#?&.]+/, 'Password must contain at least one special character')
        .required('Please enter your password'),
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
    }),
    validateOnChange: true,
    initialTouched: {
    oldPassword: true,
    password: true,
    password2: true,
    },
    onSubmit: (values, { setSubmitting }) => {
        setLoading(true)

        let submitValues = {
        oldPassword: values.oldPassword,
        newPassword: values.password,
        };
        
        updateUserPassword(submitValues)
        .then((response) => {
        console.log(response.data)
        console.log(response.status)
        setPopoverMessage('Successfully Password Updated')
        setPopoverAlert('success')
        setSubmitting(false)
        setLoading(false)
        })
        .catch((error) => {
            if (error.response) {
            console.error(error.response.data)
            setPopoverMessage('Update Password Failed : '+error.response.data.message)
            setPopoverAlert('error')
            } else if (error.request) {
            console.error('Update Password failed with status code ' + error.request.status)
            setPopoverMessage('Update Password Failed : ' + error.request.status)
            setPopoverAlert('error')
            } else {
            console.error('Error', error.message)
            setPopoverMessage('Update Password Failed : '+ error.request.status)
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

    const handleClickShowPassword = () => {
    setPassValues({ ...passValues, showPassword: !passValues.showPassword })
    }

    const handleClickShowOldPassword = () => {
    setPassValues({ ...passValues, showOldPassword: !passValues.showOldPassword })
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

return (
    
    <Card>
        <CardHeader title='Update Password' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />
        <form onSubmit={formik.handleSubmit} autoComplete='false'>
        <CardContent>
        <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-oldpassword'>Current Password</InputLabel>
                <OutlinedInput
                name="oldPassword"
                label="Old Password"
                id="oldPassword"
                value={formik.values.oldPassword}
                onChange={handleChange("oldPassword")}
                type={passValues.showOldPassword ? "text" : "password"}
                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                        edge='end'
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                        >
                        {passValues.showOldPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
            </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-newpassword'>New Password</InputLabel>
                <OutlinedInput
                name="newpassword"
                label="New Password"
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
            </Grid>
        </CardContent>

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
              Change Password
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
      
    )
}

export default TabSecurity;