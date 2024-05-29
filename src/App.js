import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinsPage from './pages/CoinsPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Dashboard from './pages/Dashboard';
import { CryptoProvider } from './CryptoContext';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <CryptoProvider>
      <Router>
        <div className={classes.App}>
          <ConditionalHeader />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homepage" element={<Homepage />} /> {/* If needed */}
            <Route path="/coins/:id" element={<CoinsPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CryptoProvider>
  );
};

const ConditionalHeader = () => {
  const location = useLocation();
  const noHeaderPaths = ['/', '/dashboard', '/login', '/signup'];
  const shouldRenderHeader = !noHeaderPaths.includes(location.pathname);

  return shouldRenderHeader && <Header />;
};

export default App;
