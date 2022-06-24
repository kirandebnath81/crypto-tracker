import React, { useContext, useEffect, useState } from "react";

import numeral from "numeral";

//mui
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

//axios and api
import axios from "../../config/axios";
import { HistoricalChart } from "../../config/apiConfig";

//charts
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

//context
import { CryptoContext } from "../../context/Context";

//Buttons
export const buttons = [
  { title: "24 Hours", days: 1, id: 1, active: true },
  { title: "30 Days", days: 30, id: 2, active: false },
  { title: "90 Days", days: 90, id: 3, active: false },
  { title: "1 Year", days: 365, id: 4, active: false },
];

//line chart style
const LineChart = styled("div")(({ theme }) => ({
  margin: "110px 10px 30px",
  width: "800px",
  [theme.breakpoints.down("lg")]: {
    width: "auto",
  },
}));

const options = {
  elements: { point: { radius: 0 } },
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    y: {
      ticks: {
        callback: function (val, index) {
          return numeral(val).format("0.0a");
        },
      },
    },
  },
};

const CoinChart = ({ id }) => {
  const { currency } = useContext(CryptoContext);
  const [coinData, setCoinData] = useState([]);

  const [chartBtns, setChartBtns] = useState(buttons);
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(id, currency, days);
  }, [id, currency, days]);

  const fetchData = async (id, currency, days) => {
    try {
      const { data } = await axios.get(HistoricalChart(id, currency, days));

      setCoinData(data.prices);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //line chart data
  const data = {
    labels: coinData.map((data) => {
      const date = new Date(data[0]);
      const hrs = date.getHours();
      const min = date.getMinutes();
      const time = hrs > 12 ? `${hrs - 12}:${min}PM` : `${hrs}:${min}AM`;
      return days > 1 ? date.toLocaleDateString() : time;
    }),

    datasets: [
      {
        label: `Price ( Past ${days} days ) in ${currency}`,
        data: coinData.map((data) => data[1]),
        borderColor: "gold",
        borderRadius: 1,
      },
    ],
  };

  //change days
  const clickHandler = (days, id) => {
    setDays(days);
    setChartBtns((prev) =>
      prev.map((btn) =>
        btn.id === id ? { ...btn, active: true } : { ...btn, active: false }
      )
    );
  };

  //chart config
  Chart.register(...registerables);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "800px",
            margin: "110px 30px 30px 30px",
          }}
        >
          <CircularProgress
            sx={{ color: "gold" }}
            size={300}
            variant="indeterminate"
            thickness={1}
          />
        </Box>
      ) : (
        <LineChart>
          <Line data={data} options={options} />
          <Box sx={{ display: "flex", justifyContent: "space-around" }} mt={3}>
            {chartBtns.map((btn) => (
              <button
                className={`coinChart__btn ${
                  btn.active && "coinChart-activeBtn"
                }`}
                key={btn.id}
                onClick={() => clickHandler(btn.days, btn.id)}
                variant="outlined"
              >
                {btn.title}
              </button>
            ))}
          </Box>
        </LineChart>
      )}
    </>
  );
};

export default CoinChart;
