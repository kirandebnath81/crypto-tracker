import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

//for getting valid price
import sortPrice from "../utils/sortPrice";

import CoinChart from "../components/coinPage/CoinChart";

//custom styling
import { theme } from "./style/Coin.styles";
import { Main } from "./style/Coin.styles";
import { Sidebar } from "./style/Coin.styles";
import { StyledBox } from "./style/Coin.styles";

//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// api and axios
import axios from "../config/axios";
import { SingleCoin } from "../config/apiConfig";

//firebase
import { db } from "../config/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

//router
import { useParams } from "react-router-dom";

//context
import { CryptoContext } from "../context/Context";

const CoinPage = () => {
  const { id } = useParams();
  const { currency, symbol, user, watchlist } = useContext(CryptoContext);
  const [coin, setCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const { data } = await axios.get(SingleCoin(id));

      setCoin(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (watchlist) {
      if (watchlist.join().includes(coin.id)) {
        setToggle((prev) => !prev);
      } else {
        setToggle(false);
      }
    }
  }, [watchlist, coin]);

  const clickHandler = async () => {
    let newWatchList = [];

    if (watchlist) {
      if (watchlist.join().includes(coin.id)) {
        newWatchList = watchlist.filter((data) => data !== coin.id);
        toast.success(`Removed Successfully!`, {
          theme: "colored",
        });
      } else {
        newWatchList = [...watchlist, coin.id];
        toast.success("Added Successfully !", { theme: "colored" });
      }
    } else {
      newWatchList = [coin.id];
    }

    const coinRef = doc(db, "watchlist", user?.uid);

    try {
      await setDoc(coinRef, {
        coins: newWatchList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Main>
          <ThemeProvider theme={theme}>
            <Sidebar>
              {coin ? (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img src={coin.image?.large} alt="" className="coin" />

                    <Typography variant="h3" component="h3">
                      {coin.symbol?.toUpperCase()}
                    </Typography>
                  </Box>

                  <Typography
                    variant="p"
                    component="div"
                    mb={3}
                    dangerouslySetInnerHTML={{
                      __html: coin.description?.en.split(". ")[0],
                    }}
                  ></Typography>

                  <StyledBox>
                    <Typography variant="h5" component="h5">
                      Rank :
                    </Typography>
                    <Typography variant="body" component="div">
                      {coin.market_cap_rank}
                    </Typography>
                  </StyledBox>
                  <StyledBox>
                    <Typography variant="h5" component="h5">
                      Current Price :
                    </Typography>
                    <Typography variant="body" component="div">
                      {symbol}{" "}
                      {sortPrice(
                        coin.market_data?.current_price[currency?.toLowerCase()]
                      )}
                    </Typography>
                  </StyledBox>

                  <StyledBox>
                    <Typography variant="h5" component="h5">
                      Market Cap :
                    </Typography>

                    <Typography variant="body" component="div">
                      {symbol}{" "}
                      {sortPrice(
                        Math.abs(
                          Number(
                            coin.market_data?.market_cap[
                              currency?.toLowerCase()
                            ]
                          )
                        ) / 1.0e9
                      )}{" "}
                      B
                    </Typography>
                  </StyledBox>
                  {user && (
                    <button
                      style={{
                        backgroundColor: toggle ? "red" : "gold",
                      }}
                      onClick={() => clickHandler(coin)}
                    >
                      {toggle
                        ? "REMOVE FROM THE WATCHLIST"
                        : "ADD TO THE WATCHLIST"}
                    </button>
                  )}
                </Box>
              ) : (
                <LinearProgress color="secondary" />
              )}
            </Sidebar>
          </ThemeProvider>

          <CoinChart id={id} />
        </Main>
      )}
    </>
  );
};

export default CoinPage;
