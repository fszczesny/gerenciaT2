import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const App = props => {
  const [serie, setSerie] = useState([]);

  const getData = async serie => {
    console.log("=============", serie);
    try {
      const response = await axios.post("http://127.0.0.1:5005/data", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "127.0.0.1",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type"
        },

        data: {
          time: "1",
          minNetworkBand: 20,
          maxNetworkLoss: 20,
          maxDeviceCpu: 20
        }
      });
      console.log("response", response.data);

      const band = response.data["network-band"];

      console.log("DAFUQ", serie);
      const serieCopy = [...serie];
      console.log("serieCopy", serieCopy, band);
      setSerie([...serieCopy, band].filter(el => el));
    } catch (err) {
      console.warn("ERROR:", err);
    }
  };

  useEffect(() => {
    getData([]);
    // setInterval(() => {
    //   console.log("serie---", serie);
    // }, 5000);
  }, []);

  useEffect(() => {
    console.log("mudou", serie);
    setTimeout(() => {
      getData(serie);
    }, 5000);
  }, [serie]);

  console.log("serie", serie);
  const options = {
    title: {
      text: "Conexão"
    },
    series: [
      {
        data: serie
      }
    ]
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

render(<App />, document.getElementById("root"));
