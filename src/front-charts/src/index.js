import React, {useEffect, useState} from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import "./index.css";
import {Input, TextField, Button} from "@material-ui/core";


const App = props => {
  const [serie, setSerie] = useState([]);
  const [cpu, setCpu] = useState([]);
  const [loss, setLoss] = useState([]);

   const [minNetworkBand, setMinNetworkBand] = useState(20)
   const [maxNetworkLoss, setMaxNetworkLoss] = useState(5)
   const [maxDeviceCpu, setMaxDeviceCpu] = useState(85)
   const [maxNetworkLossError, setMaxNetworkLossError] = useState(false) 
   const [minNetworkBandError, setMinNetworkBandError] = useState(false) 
   const [maxDeviceCPUError, setMaxDeviceCPUError] = useState(false)        

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
          time: "1",
          minNetworkBand: minNetworkBand,
          maxNetworkLoss: maxNetworkLoss,
          maxDeviceCpu: maxDeviceCpu
        }
      });
      console.log("response", response.data);

      let band = response.data["network-band"];
      band = band / 1024;
      const cpuA = response.data["device-cpu"];
      const lossA = response.data["network-loss"];
      const alertBand = response.data["alert-band"];
      const alertCpuA = response.data["alert-cpu"];
      const alertLossA = response.data["alert-loss"];

      setCpu([...cpu, cpuA]);
      setMaxNetworkLossError(alertLossA);
      setMinNetworkBandError(alertBand);
      setMaxDeviceCPUError(alertCpuA);
      setSerie([...serie, band].filter(el => el));
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

          <TextField
            label="MINIMAL NETWORK BAND"
            type="number"
            placeholder="20"
            error = {minNetworkBandError}
            value={minNetworkBand}
            onChange={e => {
                    
            setSerie([])
            setCpu([])
            setLoss([])
            setMinNetworkBand( e.target.value)
            }}
            variant="outlined"
          />
          <TextField
            label="MAXIMAL NETWORK LOSS"
            type="number"
            placeholder="20"
            error = {maxNetworkLossError}
            value={maxNetworkLoss}
            onChange={e => {
              
                    
            setSerie([])
            setCpu([])
            setLoss([])
              setMaxNetworkLoss(e.target.value)
            }}
            variant="outlined"
          />
          <TextField
            label="MAXIMAL DEVICE CPU"
            type="number"
            placeholder="20"
            error = {maxDeviceCPUError}
            value={maxDeviceCpu}
            onChange={e => {
                
            setSerie([])
            setCpu([])
            setLoss([])

                setMaxDeviceCpu(e.target.value)
            }}
            variant="outlined"
          />

          
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
