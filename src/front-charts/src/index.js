import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import "./index.css";

const App = props => {
  const [serie, setSerie] = useState([]);
  const [cpu, setCpu] = useState([]);
  const [loss, setLoss] = useState([]);

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
          //OBERDAN ESSES VALORES VAO ESTAR NO FORMULARIO, QUANDOALTERADOSVAOESPELHAR AQUI
          time: "1",
          minNetworkBand: 20,
          maxNetworkLoss: 20,
          maxDeviceCpu: 20
        }
      });
      console.log("response", response.data);

      const band = response.data["network-band"];
      const cpuA = response.data["device-cpu"];
      const lossA = response.data["device-loss"];

      setSerie([...serie, band].filter(el => el));
      setCpu([...cpu, cpuA]);
      setLoss([...loss, lossA]);
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

  const optionsBanda = {
    series: [
      {
        name: "Banda (Mbps)",
        data: serie
      }
    ]
  };

  const options_percentage = {
    series: [
      {
        name: "CPU (%)",
        data: cpu
      },
      {
        name: "Retransmissão (%)",
        data: loss
      }
    ]
  };
  return (
    <div className="wrapper">
      <div>
        Trabalho de Gerência de ..... esse teladsfdjsf ta bugado alguem arrumae{" "}
      </div>
      <div className="formWrapper"> forulario</div>
      <div className="chartsWrapper">
        <div className="chartWrapper">
          <HighchartsReact highcharts={Highcharts} options={optionsBanda} />
        </div>
        <div className="chartWrapper">
          <HighchartsReact
            highcharts={Highcharts}
            options={options_percentage}
          />
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
