import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useState } from "react";
import Notes from "./Notes";
import Paswords from "./Passwords";
import Passgen from "./Passgen";

const Dashboard = () => {

  const pages = ['Notes', 'Passwords', 'Password Generator']
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [menuItem, setMenuItem] = useState(1)
  const navigate = useNavigate()

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const logout = () => {
    sessionStorage.removeItem('authtoken')
    navigate("/")
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: 'rgba(48, 63, 159, 0)',
            backdropFilter: 'blur(10px) saturate(100%)',
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  '& .MuiMenu-paper': {
                    backgroundColor: '#263238',
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      setAnchorElNav(null)
                      if (page === 'Notes')
                        setMenuItem(1)
                      else if (page === 'Passwords')
                        setMenuItem(2)
                      if (page === 'Password Generator')
                        setMenuItem(3)
                    }}
                    sx={{ color: 'white' }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textShadow: '1px 1px white' }}
              color="error"
            >
              NOTEPASS
            </Typography>

            <Button
              color="inherit"
              sx={{
                borderRadius: 50,
                '&:hover': {
                  color: '#00c853',
                  scale: '1.1'
                },
              }}
              onClick={logout}
            >
              LOGOUT
            </Button>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar sx={{ bgcolor: 'orange' }}>N</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ m: 10 }}>
        {menuItem === 1 ? <Notes /> : menuItem === 2 ? <Paswords /> : <Passgen />}
      </Box>

    </>
  );
};

export default Dashboard;
