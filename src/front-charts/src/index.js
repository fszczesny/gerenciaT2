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

  const getData = async (serie, cpu, loss) => {
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
      const lossA = response.data["network-loss"];

      setSerie([...serie, band].filter(el => el));
      setCpu([...cpu, cpuA]);
      setLoss([...loss, lossA]);
    } catch (err) {
      console.warn("ERROR:", err);
    }
  };

  useEffect(() => {
    getData([], [], []);
  }, []);

  useEffect(() => {
    console.log("mudou", serie);
    setTimeout(() => {
      getData(serie, cpu, loss);
    }, 5000);
  }, [loss]);

  console.log("serie", serie);

  const optionsBanda = {
    title: {
      text: "Banda (Mbps)"
    },
    series: [
      {
        name: "Banda (Mbps)",
        data: serie
      }
    ]
  };

  const options_a = {
    title: {
      text: "CPU (%)"
    },
    series: [
      {
        name: "CPU (%)",
        data: cpu
      }
    ]
  };
  const options_b = {
    title: {
      text: "Retransmissão (%)"
    },
    series: [
      {
        name: "Retransmissão (%)",
        data: loss
      }
    ]
  };
  return (
    <div className="wrapper">
      <div>
        <div className="INF">
          INF01015 - Gerência E Aplicações Em Redes (2019/2)
        </div>
        <div className="emails">
          fsalmeida@inf.ufrgs.br, ebchandelier@inf.ufrgs.br,
          ocsantos@inf.ufrgs.br
        </div>
      </div>
      <div className="outerGrid">
        <div className="formGrid">
          <div>input 1</div>
          <div>input 2</div>
          <div>input 3</div>
          <div>input 4</div>
        </div>
        <div>
          <HighchartsReact highcharts={Highcharts} options={optionsBanda} />
        </div>
        <div>
          <HighchartsReact highcharts={Highcharts} options={options_a} />
        </div>
        <div>
          <HighchartsReact highcharts={Highcharts} options={options_b} />
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
