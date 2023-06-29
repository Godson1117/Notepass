import React, { useState } from "react";
import { Alert, Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";

const formStyle = {
  '& .MuiOutlinedInput-root': {
    '& > fieldset': {
      borderColor: '#757575',
    },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: 'success.light',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: 'primary.main',
    },
  },
  '& input': {
    color: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'primary.main',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: "white",
  },
  width: '26ch'
}


const Otplog = () => {

  let result

  const initialValues = {
    otp: ''
  }

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("OTP required").length(6, "Enter 6 Digit OTP")
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      setLoading({ btn: 'sub' })
      result = await axios.post('http://localhost:8000/passwordreset/otpverify', { phone, otp: formik.values.otp })
      setLoading({ btn: '' })
      setResponse(result.data)
      setTimeout(() => {
        setShow(true)
      }, 3000)
      setTimeout(() => {
        setShow(false)
        if (result.data.resettoken) {
          sessionStorage.setItem('resettoken', result.data.resettoken)
          navigate('/passreset')
        }
      }, 5000);
    }
  })

  const [phone, setPhone] = useState('')
  const [err, setErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [show, setShow] = useState(false)
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState({ btn: '' })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setPhone(e.target.value)
  };

  const genOtp = async () => {
    if (phone.length !== 10) {
      setErrorMessage('Invalid phone number')
      setErr(true)
    }
    else {
      setLoading({ btn: 'gen' })
      setErrorMessage('')
      setErr(false)

      result = await axios.post('http://localhost:8000/passwordreset/otpverify', { phone, otp: formik.values.otp })
      setLoading({ btn: '' })
      setResponse(result.data)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000)
    }
  }

  return (
    <>

      <Box sx={{
        height: '10px'
      }}>
        {show && <Alert severity={response.success ? 'success' : 'error'}>{response.message}</Alert>}
      </Box>

      <Box
        sx={{
          height: "25rem",
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
              name="phone"
              label="Phone Number for OTP"
              variant="outlined"
              size="small"
              value={phone}
              onChange={handleChange}
              error={err ? true : false}
              helperText={errorMessage}
              sx={formStyle}
            />
          </Grid>

          <Grid item>
            <LoadingButton
              variant="contained"
              size="large"
              type="button"
              loading={loading.btn === 'gen' ? true : false}
              loadingPosition="end"
              onClick={genOtp}
              sx={{
                borderRadius: "8px",
                "&:hover": {
                  background: "#009688",
                },
                '&:disabled': {
                  color: '#616161'
                },
                m: 2,
                width: "190px",
                height: "40px",
                color: 'white'
              }}
            >
              Generate OTP
            </LoadingButton>
          </Grid>

          <Grid item>
            <TextField
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={formik.touched.otp && formik.errors.otp ? true : false}
              helperText={formik.touched.otp && formik.errors.otp}
              variant="outlined"
              size="small"
              sx={formStyle}
            />
          </Grid>

          <Grid item>
            <LoadingButton
              variant="contained"
              size="large"
              type="submit"
              loadingPosition="end"
              loading={loading.btn === 'sub' ? true : false}
              sx={{
                borderRadius: "8px",
                "&:hover": {
                  background: "#009688",
                },
                '&:disabled': {
                  color: '#616161'
                },
                m: 2,
                width: "130px",
                height: "40px",
              }}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Otplog;
