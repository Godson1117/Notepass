import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useFormik } from "formik";
import * as Yup from 'yup';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formStyle = {
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        borderColor: "#757575",
      },
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "success.light",
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        borderColor: "primary.main",
      },
    },
    "& input": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "primary.main",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "white",
    },
    width: "26ch",
  };

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5,'Too short!').max(15,'Too big!').required('Username required'),
    email: Yup.string().email('Invalid Email').required('Email required'),
    phone: Yup.string().length(10,'Invalid phone number').matches(/^[0-9]+$/,'Invalid phone number').required('Phone number required'),
    password: Yup.string().min(8, 'Minimum there must be 8 characters').max(16, 'Password length must be within 16').required('Password required')
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => console.log(values)
  })


  return (
    <Box
      sx={{
        height: "28rem",
        width: "22rem",
        background: "rgba(38, 50, 56, 0.2)",
        backdropFilter: "blur(10px) saturate(120%)",
        margin: "auto",
        marginTop: "10rem",
        borderRadius: "25px",
      }}
    >

      <IconButton size="small" component={Link} to="/" disableRipple={true}>
        <HomeIcon sx={{ mt: 2, ml: 2, color: "white" }}></HomeIcon>
      </IconButton>

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        rowSpacing={1}
        component="form"
       onSubmit={formik.handleSubmit}
      >

        <Grid item>
          <Typography
            variant="h4"
            sx={{
              background:
                "linear-gradient(210deg, rgba(255,0,0,1) 40%, rgba(0,255,223,1) 75%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              m: 2,
            }}
          >
            SIGN UP
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            size="small"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && formik.errors.username ? true : false}
            helperText={formik.touched.username && formik.errors.username}
            sx={formStyle}
          />
        </Grid>

        <Grid item>
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email}
            sx={formStyle}
          />
        </Grid>

        <Grid item>
          <TextField
            name="phone"
            label="Phone Number"
            variant="outlined"
            size="small"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && formik.errors.phone ? true : false}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={formStyle}
          />
        </Grid>

        <Grid item>
          <FormControl variant="outlined" size="small" sx={formStyle}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="primary"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={formik.values.cpass}
              onChange={formik.handleChange}
              error={formik.touched.cpass && formik.errors.password ? true : false}
            />
          </FormControl>
          <Typography variant="body2" sx={{
            ml: 2,
            mt: 1,
            color: 'error.main',
            fontSize: '12px'
          }}>{formik.touched.password && formik.errors.password}
          </Typography>
          
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              borderRadius: "8px",
              "&:hover": {
                background: "#009688",
              },
              m: 2,
              width: "180px",
              height: "40px",
            }}
          >
            Join Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
