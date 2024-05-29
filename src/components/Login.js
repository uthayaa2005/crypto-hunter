// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useCrypto } from '../CryptoContext';
// import { makeStyles } from '@material-ui/core/styles';

// const Login = () => {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const { setUser } = useCrypto();

//   const useStyles = makeStyles((theme) => ({
//     root: {
//       backgroundImage: "url('./bg.jpg')",
//       backgroundSize: 'cover',
//       minHeight: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       textAlign: 'center',
//       padding: theme.spacing(3),
//     },
//     content: {
//       backgroundColor: 'rgba(255, 255, 255, 0.7)',
//       padding: theme.spacing(4),
//       borderRadius: theme.spacing(2),
//       boxShadow: theme.shadows[3],
//     },
//     title: {
//       fontFamily: 'Montserrat',
//       fontWeight: 'bold',
//       marginBottom: theme.spacing(2),
//     },
//     buttons: {
//       marginTop: theme.spacing(3),
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//   }));
//   const classes = useStyles();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', { name, password });
//       localStorage.setItem('token', response.data.token);
//       setUser(response.data.user);
//       alert('Login successful!');
//       navigate('/homepage'); // Redirect to the home page
//     } catch (error) {
//       alert('Login failed!');
//       console.error(error);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Container maxWidth="xs">
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//           minHeight="100vh"
//           bgcolor="transparent"
//           padding={3}
//           borderRadius={2}
//           borderColor="#1d1f22"
//           className={classes.content}
//         >
//           <Typography variant="h4" component="h1" gutterBottom color="gold" className={classes.title}>
//             LOGIN
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Name"
//               type="text"
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               InputProps={{
//                 style: { color: 'white' },
//               }}
//               InputLabelProps={{
//                 style: { color: 'white' },
//               }}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 style: { color: 'white' },
//               }}
//               InputLabelProps={{
//                 style: { color: 'white' },
//               }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               style={{ marginTop: '16px' }}
//             >
//               Login
//             </Button>
//             <p style={{ color: 'white', marginTop: '16px' }}>
//               Don't have an account? <a href="/signup" style={{ color: '#61dafb' }}>Signup</a>
//             </p>
//           </form>
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCrypto } from '../CryptoContext';
import { makeStyles } from '@material-ui/core/styles';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useCrypto();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      alert('Login successful!');
      navigate('/homepage'); // Redirect to the home page
    } catch (error) {
      alert('Login failed!');
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          bgcolor="transparent"
          padding={3}
          borderRadius={2}
          borderColor="#1d1f22"
          className={classes.content}
        >
          <Typography variant="h4" component="h1" gutterBottom color="gold" className={classes.title}>
            LOGIN
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Login
            </Button>
            <p style={{ color: 'white', marginTop: '16px' }}>
              Don't have an account? <a href="/signup" style={{ color: '#61dafb' }}>Signup</a>
            </p>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
