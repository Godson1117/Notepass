import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from 'yup';

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


  // const initialValues = {
  //   phone: '',
  //   otp: ''
  // }

  // const validationSchema = Yup.object().shape({
  //   phone: Yup.string().length(10,'Invalid phone number').matches(/^[0-9]+$/,'Invalid phone number').required('Phone number required')
  // })

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: values => console.log(values)
  // })
  let error;
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleClick = () => {
    if (phone.length !== 10) {
      setErrorMessage("Invalid phone number");
      setErr(true);
    } else {
      setErrorMessage("");
      setErr(false);
    }
    console.log(errorMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
        onSubmit={handleSubmit}
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
          <Button
            variant="contained"
            size="large"
            type="button"
            onClick={handleClick}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                background: "#009688",
              },
              m: 2,
              width: "170px",
              height: "40px",
            }}
          >
            Generate OTP
          </Button>
        </Grid>

        <Grid item>
          <TextField
            name="phone"
            label="OTP"
            variant="outlined"
            size="small"
            sx={formStyle}
          />
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

export default Otplog;
