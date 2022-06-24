import React, { useEffect, useState, useContext } from "react";

//icon
import { AiFillDelete } from "react-icons/ai";

//api
import { SingleCoin } from "../../config/apiConfig";
import axios from "../../config/axios";

//util
import sortPrice from "../../utils/sortPrice";

//context
import { CryptoContext } from "../../context/Context";

//router
import { useNavigate } from "react-router-dom";

const CoinsWatchList = ({ coinId, handleDelete }) => {
  const navigate = useNavigate();
  const { symbol, currency } = useContext(CryptoContext);
  const [coin, setCoin] = useState({});

  useEffect(() => {
    fetchData(coinId);
  }, [coinId]);

  const fetchData = async (coinId) => {
    try {
      const { data } = await axios.get(SingleCoin(coinId));
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = () => {
    navigate(`coin/${coinId}`);
    window.scroll(0, 0);
  };

  return (
    <div className="coinWatchlist__container">
      <div onClick={clickHandler} className="coinWatchlist__coin">
        {coin.name}
      </div>
      <div className="coinWatchlist__containerFluid">
        <div>
          {symbol}{" "}
          {sortPrice(coin.market_data?.current_price[currency?.toLowerCase()])}
        </div>
        <div onClick={() => handleDelete(coinId)}>
          <AiFillDelete className="coinWatchlist__deleteIcon" />
        </div>
      </div>
    </div>
  );
};

export default CoinsWatchList;
