import React, { useContext, useEffect, useState } from "react";

//slider
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

//mui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

//api
import axios from "../../config/axios";
import { PopularCoins } from "../../config/apiConfig";

import sortPrice from "../../utils/sortPrice";

//context
import { CryptoContext } from "../../context/Context";

//router
import { Link } from "react-router-dom";

const Banner = () => {
  const { currency, symbol } = useContext(CryptoContext);

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchData(currency);
  }, [currency]);

  const fetchData = async (currency) => {
    try {
      const { data } = await axios.get(PopularCoins(currency));

      setCoins(data);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    fontSize: "2.8rem",
    fontFamily: "Montserrat",
    fontWight: "bold",
    textAlign: "center",
    padding: "50px 0px 20px",
  };

  return (
    <div className="banner">
      <div className="banner__info">
        <Typography variant="body" component="h1" sx={styles}>
          Crypto Tracker
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            textAlign: "center",
            fontFamily: "Montserrat",
            color: "#b3b3b3",
          }}
        >
          Get all the details regarding your favourite crypto currency
        </Typography>
      </div>
      <Container>
        <Splide
          options={{
            type: "loop",
            autoWidth: true,
            arrows: false,
            pagination: false,
            autoplay: true,
            interval: 1500,
          }}
        >
          {coins.map((coin) => (
            <SplideSlide key={coin.id}>
              <div className="banner__coinBox">
                <Link to={`/coin/${coin.id}`}>
                  <img src={coin.image} alt="" className="sliderImg" />
                </Link>
                <Box sx={{ display: "flex", textAlign: "center" }} mt={1.5}>
                  <Typography variant="body1" component="div">
                    {coin.symbol.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      marginLeft: "10px",
                      color:
                        coin.price_change_percentage_24h < 0 ? "red" : "green",
                    }}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="h5" component="h5">
                  {symbol} {sortPrice(coin.current_price)}
                </Typography>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </Container>
    </div>
  );
};

export default Banner;
