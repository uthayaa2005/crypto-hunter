import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography, MenuItem, Select, Button, Menu, IconButton } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useCrypto } from '../CryptoContext';
import axios from 'axios';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'; // Import the cart icon
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'; // Import the account icon

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1.5rem',
  },
  button: {
    marginLeft: theme.spacing(2),
    backgroundColor: 'transparent', // Make the background transparent
    '&:hover': {
      backgroundColor: 'white', // Slightly visible on hover for better UX
    },
  },
  icon: {
    color: 'gold', // Change icon color to gold
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    color: 'gold',
    backgroundColor: '#16171a',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: '#16171a', // Dark background for the menu
      color: 'gold', // White text color
    },
  },
  menuItem: {
    fontFamily: 'Arial, sans-serif',
    '&:hover': {
      backgroundColor: '#444', // Darker background on hover
    },
  },
  select: {
    color: 'gold',
    fontFamily: 'Verdana, sans-serif',
  },
  userName: {
    color: 'gold', // Gold color for the user name
    fontSize: '1.1rem', // Smaller font size
    marginLeft: theme.spacing(1), // Space between icon and name
  },
  cartText: {
    color: 'gold', // Gold color for the cart text
    fontSize: '1rem', // Same font size as the user name
    marginLeft: theme.spacing(1), // Space between icon and text
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency, user, setUser } = useCrypto();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const userData = response.data.user;
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    alert('Logged out successfully!');
    navigate('/login');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate('/')} className={classes.title}>
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={classes.select}
            >
              <MenuItem value={'USD'} className={classes.menuItem}>USD</MenuItem>
              <MenuItem value={'INR'} className={classes.menuItem}>INR</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => navigate('/cart')}
            >
              <ShoppingCartOutlinedIcon className={classes.icon} />
              
            </Button>
            {user && (
              <>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  className={classes.button}
                >
                  <AccountCircleOutlinedIcon className={classes.icon} />
                 
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.menu}
                >
                  <MenuItem onClick={handleClose} className={classes.menuItem}>Name: {user.name}</MenuItem>
                  <MenuItem onClick={handleClose} className={classes.menuItem}>Email: {user.email}</MenuItem>
                  <MenuItem onClick={handleLogout} className={classes.menuItem}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
