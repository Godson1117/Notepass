import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Chip, CircularProgress, Fab, Grid, IconButton, Link, Paper, Snackbar, TextField, Tooltip } from '@mui/material';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Passform from './Passform';
import { useFormik } from 'formik';
import * as Yup from "yup";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#212121',
  borderRadius: 3,
  boxShadow: '4px 2px red',
  p: 4
}

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


const Password = () => {

  const initialValues = {
    sitename: '',
    sitelink: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    sitename: Yup.string().required("Sitename required"),
    sitelink: Yup.string().required("Sitelink required"),
    password: Yup.string().required("Password required")
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      updatepsswd(values, id)
    }
  })

  const [open, setOpen] = useState(false)
  const [addFormOpen, setAddFormOpen] = useState(false)
  const [updateFormOpen, setUpdateFormOpen] = useState(false)
  const [psswds, setPsswds] = useState([])
  const [psswd, setPsswd] = useState({})
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const handleOpen = (item) => {
    setOpen(true)
    setPsswd(item)
  }
  const handleClose = () => setOpen(false)

  const handleAddFormOpen = () => setAddFormOpen(true)
  const handleAddFormClose = () => setAddFormOpen(false)

  const handleUpdateFormOpen = () => setUpdateFormOpen(true)
  const handleUpdateFormClose = () => setUpdateFormOpen(false)

  const handleSuccess = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccess(false)
  }

  const getpsswds = () => {
    axios.get('http://localhost:8000/passwords/fetchpasswords', {
      headers: {
        'authtoken': sessionStorage.getItem('authtoken')
      }
    }).then(res => {
      setPsswds(res.data)
      setLoading(false)
    })
  }

  const updatepsswd = async (values, id) => {
    setProcessing(true)
    await axios.put(`http://localhost:8000/passwords/updatepassword/${id}`, values, {
      headers: {
        'authtoken': sessionStorage.getItem('authtoken')
      }
    })
    psswds.map((item) => {
      if (item.id === id)
        return values
      else
        return item
    })
    setPsswd({ ...values, date: new Date().toDateString() })
    setProcessing(false)
    handleUpdateFormClose()
    handleClose()
    setMessage('Password successfully updated...')
    setSuccess(true)
    setLoading(true)
    setTimeout(() => getpsswds(), 2000)
  }

  const deletepsswd = async (id) => {
    await axios.delete(`http://localhost:8000/passwords/deletepassword/${id}`, {
      headers: {
        'authtoken': sessionStorage.getItem('authtoken')
      }
    })
    setPsswds(psswds.filter((item) => item.id !== id))
    handleClose()
    setMessage('Password successfully deleted...')
    setSuccess(true)
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  useEffect(getpsswds, [])


  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2
      }}
      >
        {psswds.map((data) => (
          <Box key={data.id}>
            <Paper component={Button} onClick={() => { handleOpen(data) }} sx={{
              width: '20rem',
              height: '3rem',
              backgroundColor: 'rgba(241, 243, 255, 0.1)',
              backdropFilter: 'blur(4px) saturate(90%)',
              borderRadius: 3,
              color: 'white'
            }}
            >
              {data.sitename}
            </Paper>
          </Box>
        ))}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>

              <Chip label={psswd.date} variant="outlined" size="small" sx={{ color: '#1de9b6', didsplay: 'block', ml: 30 }} />
              <Typography component={Link} variant="body2" underline="none" href={psswd.sitelink} sx={{ display: 'block' }} >{psswd.sitename}</Typography>
              <Typography align="left" variant="body2" mt={2}>{psswd.password}</Typography>

              <Box sx={{ textAlign: 'right' }}>
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={() => {
                    handleUpdateFormOpen()
                    formik.values.sitename = psswd.sitename
                    formik.values.sitelink = psswd.sitelink
                    formik.values.password = psswd.password
                    setId(psswd.id)
                  }}>
                    <EditIcon color="primary" sx={{
                      color: 'white',
                      '&:hover': {
                        color: '#1976d2'
                      }
                    }}>
                    </EditIcon>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton size="small" onClick={() => {
                    deletepsswd(psswd.id)
                  }}>
                    <DeleteIcon sx={{
                      color: 'white',
                      ml: 1,
                      '&:hover': {
                        color: 'red'
                      }
                    }}>
                    </DeleteIcon>
                  </IconButton>
                </Tooltip>
              </Box>

            </Box>
          </Fade>
        </Modal>

        {/* Add Form Model */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={addFormOpen}
          onClose={handleAddFormClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={addFormOpen}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: '#212121',
              p: 4,
              background: 'rgba(33, 33, 33, 0.5)',
              backdropFilter: 'blur(25px) saturate(200%)',
              borderRadius: '25px'
            }}>
              <Passform setPsswds={(value) => setPsswds([...psswds, value])} setSuccess={(value) => setSuccess(value)} handleAddFormClose={handleAddFormClose} setMessage={(mssg) => setMessage(mssg)} setLoading={(value) => setLoading(value)} />
            </Box>
          </Fade>
        </Modal>

        {/* Update Form Model */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={updateFormOpen}
          onClose={handleUpdateFormClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={updateFormOpen}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: '#212121',
              p: 4,
              background: 'rgba(33, 33, 33, 0.5)',
              backdropFilter: 'blur(25px) saturate(200%)',
              borderRadius: '25px'
            }}>
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
                  <TextField
                    name="sitename"
                    label="Sitename"
                    variant="outlined"
                    size="small"
                    value={formik.values.sitename}
                    onChange={formik.handleChange}
                    error={formik.touched.sitename && formik.errors.sitename ? true : false}
                    helperText={formik.touched.sitename && formik.errors.sitename}
                    sx={formStyle}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    name="sitelink"
                    label="Sitelink"
                    variant="outlined"
                    size="small"
                    value={formik.values.sitelink}
                    onChange={formik.handleChange}
                    error={formik.touched.sitelink && formik.errors.sitelink ? true : false}
                    helperText={formik.touched.sitelink && formik.errors.sitelink}
                    sx={formStyle}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && formik.errors.password ? true : false}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={formStyle}
                  />
                </Grid>

                <Grid item>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    type="submit"
                    loading={processing}
                    loadingPosition="end"
                    sx={{
                      borderRadius: '8px',
                      '&:hover': {
                        background: '#009688',
                      },
                      '&:disabled': {
                        color: '#616161'
                      },
                      mt: 2,
                      width: '100px',
                      height: '40px',
                      color: 'white',
                    }}
                  >
                    UPDATE
                  </LoadingButton>
                </Grid>

              </Grid>
            </Box>
          </Fade>
        </Modal>


        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      <Tooltip title="Add Password">
        <Fab color="primary" aria-label="add" sx={{
          m: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed'
        }}
          onClick={handleAddFormOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Password
