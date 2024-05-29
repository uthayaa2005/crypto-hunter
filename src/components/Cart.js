import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useCrypto } from '../CryptoContext';
import { numberWithCommas } from './CoinsTable';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  tableHeader: {
    backgroundColor: "#EEBC1D",
  },
  cartButton: {
    color: "white",
    backgroundColor: "#EEBC1D",
    "&:hover": {
      backgroundColor: "#FFBF00",
    },
  },
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { cart, setCart, currency, symbol, conversionRate } = useCrypto();

  const handleRemoveFromCart = (coin) => {
    setCart(cart.filter((item) => item.id !== coin.id));
    alert(`${coin.name} removed from cart!`);
  };

  const handleProceedToCheckout = () => {
    alert('Proceeding to checkout!');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" className={classes.title}>
        Your Cart
      </Typography>
      {cart && cart.length === 0 ? (
        <Typography variant="h6" component="p">
          Your cart is empty. Add some cryptocurrencies to your cart.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="cart table">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap", "Action"].map((head) => (
                  <TableCell
                    style={{
                      color: "white",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((coin) => {
                const profit = coin.price_change_percentage_24h > 0;
                const convertedPrice = coin.current_price * conversionRate;
                const convertedMarketCap = (coin.market_cap * conversionRate).toString().slice(0, -6);
                return (
                  <TableRow
                    key={coin.name}
                    className={classes.row}
                    onClick={() => navigate(`/coins/${coin.id}`)}
                  >
                    <TableCell component="th" scope="row" style={{ display: "flex", gap: 15 }}>
                      <img src={coin?.image} alt={coin.name} height="50" style={{ marginBottom: 10 }} />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ textTransform: "uppercase", fontSize: 22 }}>{coin.symbol}</span>
                        <span style={{ color: "darkgrey" }}>{coin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(convertedPrice.toFixed(2))}
                    </TableCell>
                    <TableCell align="right" style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
                      {profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(convertedMarketCap)}M
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        className={classes.cartButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromCart(coin);
                        }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
         
        </TableContainer>
      )}
    </Container>
  );
};

export default Cart;
