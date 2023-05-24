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
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Login = () => {
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
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email required'),
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
        height: "31rem",
        width: "22rem",
        background: "rgba(38, 50, 56, 0.2)",
        backdropFilter: "blur(10px) saturate(120%)",
        margin: "auto",
        mt: "10rem",
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
                "linear-gradient(39deg, rgba(255,0,0,1) 32%, rgba(0,255,236,1) 78%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              m: 2,
            }}
          >
            LOGIN
          </Typography>
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
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password ? true : false}
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

        <Grid container>
          <Grid
            item
            component={Link}
            sx={{
              textDecoration: "none",
              color: "primary.main",
              ml: 8,
              mt: 2,
              "&:hover": {
                color: "success.light",
              },
            }}
          >
            Forgot Password?
          </Grid>
        </Grid>

        <Box component="p">OR</Box>

        <Box component={Link} sx={{
          textDecoration: 'none',
          color: 'primary.main',
          '&:hover':{
            color: 'success.light'
          }
        }} to="/otp">Login via OTP</Box>

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
              width: "120px",
              height: "40px",
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
