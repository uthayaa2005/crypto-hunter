import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CryptoContext = createContext();

export const useCrypto = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const [conversionRate, setConversionRate] = useState(1); // Initialize conversion rate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, []);

  // Load user from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Fetch conversion rate when currency changes
  useEffect(() => {
    const fetchConversionRate = async () => {
      if (currency === 'INR') {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setConversionRate(response.data.rates.INR);
      } else {
        setConversionRate(1); // Default to 1 for USD
      }
    };

    fetchConversionRate();

    if (currency === 'INR') setSymbol('₹');
    else if (currency === 'USD') setSymbol('$');
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, setCurrency, symbol, user, setUser, cart, setCart, conversionRate }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
