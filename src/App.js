import { useState } from "react";
import React from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import "./App.css";
import axios from "axios";
function App() {
  const searchCity = (e) => {
    setError("");
    setLocation(e.target.value);
  };

  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState("");
  const [forcast, setForcasts] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const handleSubmit = () => {
    const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: `${location}`, format: "json", u: "c" },
      headers: {
        "X-RapidAPI-Key": "52222829f0msh7161368b8ee4dbbp1cdc8cjsn8573b8b1b503",
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response) {
          console.log(response.data);
          // console.log(response.data.current_observation.astronomy.sunrise);
          setSunrise(response.data.current_observation.astronomy.sunrise);
          // console.log(response.data.current_observation.astronomy.sunset);
          setSunset(response.data.current_observation.astronomy.sunset);
          // console.log(response.data.current_observation.atmosphere.humidity);
          setHumidity(response.data.current_observation.atmosphere.humidity);
          // console.log(response.data.current_observation.atmosphere.pressure);
          setPressure(
            response.data.current_observation.atmosphere.pressure / 1000
          );
          // console.log(response.data.current_observation.condition.temperature);
          setTemperature(
            response.data.current_observation.condition.temperature
          );
          console.log(response.data.current_observation.condition.text);
          setText(response.data.current_observation.condition.text);
          console.log(response.data.current_observation.wind.speed);
          setSpeed(response.data.current_observation.wind.speed);
          console.log(response.data.forecasts);
          setForcasts(response.data.forecasts);
          console.log(response.data.location.city);
          setCity(response.data.location.city);
          console.log(response.data.location.country);
          setCountry(response.data.location.country);
          console.log(response.data.location.region);
          setRegion(response.data.location.region);
        }
      })
      .catch(function (error) {
        if (error.response.status === 500) {
          setError("City Not Found!");
        }
      });
  };

  const forcast_high = forcast.map((data) => data.high);
  console.log(forcast_high);
  const forcast_low = forcast.map((data) => data.low);
  console.log(forcast_low);
  const forcast_day = forcast.map((data) => data.day);
  console.log(forcast_day);
  //
  const option_temperature = {
    
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: "#FFAB91",
        },
        progress: {
          show: true,
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: -20,
          color: "#999",
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "60%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 50,
          fontWeight: "bolder",
          formatter: "{value} °C",
          color: "auto",
        },
        data: [
          {
            value: `${temperature}`,
          },
        ],
      },
    ],
  };

  //

  const option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      textStyle: {
        fontWeight: "bold",
      },
    },
    xAxis: {
      type: "category",
      data: forcast_day,
    },
    yAxis: {
      
    },
    series: [
      {
        name: "Highest Tempearture",
        type: "line",
        stack: "Total",
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: forcast_high,
      },
      {
        name: "Lowest Tempearture",
        type: "line",
        stack: "Total",
        smooth: true,
       
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgb(116, 21, 219)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: forcast_low,
      },
    ],
  };
  //

  return (
    <React.Fragment>
      <input type="text" onChange={searchCity} placeholder="Enter the City Name" />
      <button onClick={handleSubmit}>search</button>
      <span style={{ color: "red" }}>{error}</span>
      {sunrise ? (
        <>
          <div className="container">
            <div className="left">
              <div className="container-temperature">
                <div className="temperature">
                  <ReactEcharts option={option_temperature} />
                </div>
              </div>
              <div className="container-city">
                {city},{region}-{country}
              </div>
            </div>
            <div className="container-details-left">
              <div className="details-first">
                <table>
                  <tr>
                    <td>Sunrise</td>
                    <td>{sunrise}</td>
                  </tr>
                  <tr>
                    <td>Sunset</td>
                    <td>{sunset}</td>
                  </tr>
                  <tr>
                    <td>Condition</td>
                    <td>{text}</td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>{humidity}%</td>
                  </tr><tr>
                    <td>Pressure</td>
                    <td>{pressure} ATM</td>
                  </tr>
                  <tr>
                    <td>Wind Speed</td>
                    <td>{speed} Km/hr</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <ReactEcharts option={option} />
        </>
      ) : null}
    </React.Fragment>
  );
}

export default App;
