import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formStyle={
    '& .MuiOutlinedInput-root': {
      '& > fieldset': {
        borderColor: '#757575'
      }
    },
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': {
        borderColor: 'success.light'
      }
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: 'primary.main'
      }
    },
    "& input": {
      color: 'white',
    },
    "& .MuiFormLabel-root": {
      color: 'primary.main'
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: 'white'
    },
    width: '26ch'
  }

  return (
    <Box sx={{
      height: '26rem',
      width: '22rem',
      background: 'rgba(38, 50, 56, 0.2)',
      backdropFilter: 'blur(10px) saturate(120%)',
      margin: 'auto',
      marginTop: '10rem',
      borderRadius: '25px'
    }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        rowSpacing={1}
        component="form"
      >
        <Grid item>
          <Typography variant='h4' sx={{
              background: 'linear-gradient(210deg, rgba(255,0,0,1) 40%, rgba(0,255,223,1) 75%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              m: 2
            }}>SIGN UP</Typography>
        </Grid>

        <Grid item>
          <TextField name="username" label="Username" variant="outlined" size="small" reuired sx={formStyle} />
        </Grid>

        <Grid item>
          <TextField name="email" label="E-mail" variant="outlined" size="small" reuired sx={formStyle}/>
        </Grid>

        <Grid item>
          <TextField name="phone" label="Phone Number" variant="outlined" size="small" reuired sx={formStyle}/>
        </Grid>

        <Grid item>
          <FormControl variant="outlined" size="small" sx={formStyle}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color='primary'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl variant="outlined" size="small" sx={formStyle}>
            <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color='primary'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <Button variant="contained" size='large' sx={{
            borderRadius: '8px',
            '&:hover': {
              background: '#009688',
            },
            m: 2,
            width: '180px',
            height: '40px'
          }}>Join Now</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Signup
