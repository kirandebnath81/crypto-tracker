import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//components
import axios from "../../config/axios";
import { CoinList } from "../../config/apiConfig";
import { CryptoContext } from "../../context/Context";

//router
import { useNavigate } from "react-router-dom";

//dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const columnsHead = ["Coin", "Price", "24h Change", "Market Cap"];

function CoinTable() {
  const navigate = useNavigate();
  const { currency, symbol } = useContext(CryptoContext);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [coinsPerPage, setCoinsPerPage] = useState([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(currency);
  }, [currency]);

  const fetchData = async (currency) => {
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // add commas and decimal to price
  const getPrice = (num) => {
    const number = num.toFixed(2);
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //coins per page
  useEffect(() => {
    getCoins(searchInput, coins, page);
  }, [searchInput, coins, page]);

  const getCoins = (searchInput, coins, page) => {
    if (searchInput) {
      const allCoins = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
      );

      const perPage = allCoins.slice(page * 10, page * 10 + 10);
      setTotalCoins(allCoins.length);
      setCoinsPerPage(perPage);
    } else {
      setTotalCoins(coins.length);
      setCoinsPerPage(coins.slice(page * 10, page * 10 + 10));
    }
  };

  //pagination
  const handleChangePage = (event, value) => {
    if (searchInput) {
      setPage(value - 1);
      return;
    }

    window.scroll(0, 500);
    setPage(value - 1);
  };

  //taking to coin route
  const clickHandler = (id) => {
    navigate(`coin/${id}`);
    window.scroll(0, 0);
  };

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <ThemeProvider theme={darkTheme}>
          <div className="coinTable__title">Crypto Currency by Market Cap</div>

          <Container sx={{ marginY: "20px" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Search coins.."
              variant="outlined"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Container>
          <Container>
            {coins ? (
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "gold" }}>
                    <TableRow>
                      {columnsHead.map((heading, index) => (
                        <TableCell
                          key={index}
                          sx={{
                            fontSize: "1.1rem",
                            color: "black",
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            textAlign: heading !== "Coin" && "right",
                          }}
                        >
                          {heading}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: "black" }}>
                    {coinsPerPage.map((coin) => (
                      <TableRow
                        key={coin.id}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => clickHandler(coin.id)}
                      >
                        <TableCell
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <img src={coin.image} alt="" className="coinImg" />
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                            ml={2}
                          >
                            <Typography variant="h6" component="div">
                              {coin.symbol.toUpperCase()}
                            </Typography>
                            <Typography
                              variant="body"
                              component="div"
                              sx={{ color: "#b3b3b3" }}
                            >
                              {coin.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "right", fontSize: "1.1rem" }}
                        >
                          {symbol} {getPrice(coin.current_price)}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              coin.price_change_percentage_24h < 0
                                ? "#ff1a1a"
                                : "#40ff00",
                            textAlign: "right",
                            fontSize: "1rem",
                          }}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "right", fontSize: "1.1rem" }}
                        >
                          {symbol}
                          {getPrice(
                            Math.abs(Number(coin.market_cap)) / 1.0e9
                          )}{" "}
                          B
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <LinearProgress color="secondary" />
            )}

            {totalCoins > 10 && (
              <Box
                sx={{
                  margin: "30px auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={Math.ceil(totalCoins / 10)}
                  onChange={handleChangePage}
                />
              </Box>
            )}
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

export default CoinTable;
