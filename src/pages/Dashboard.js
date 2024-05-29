import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url('./bg.jpg')",
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(3),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.content}>
        <Typography variant="h4" className={classes.title}>
          Welcome to Crypto Hunter Dashboard
        </Typography>
        <Typography variant="subtitle1">
          Your go-to platform for tracking cryptocurrency prices, market trends, and portfolio performance. Stay updated with the latest news, set custom alerts, and access a wide range of analytical tools to make informed decisions.
        </Typography>
        <div className={classes.buttons}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/signup')}
          >
            Signup
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
