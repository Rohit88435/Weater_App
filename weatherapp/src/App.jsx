import React, { useEffect, useState } from "react";
import "./App.css";
import weatherImg from "./assets/weather.png";
function App() {
  let currentDate = new Date();

  const [city, setCity] = useState("Faridabad");
  const [weather, setWeather] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const Api_key = "55d80ea6c4724ae7091753a44701e418";

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}`
      );
      const data = await res.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center p-[25px]">
      <div className="w-[300px] h-[450px] bg-linear-to-r from-cyan-500 to-blue-500 flex justify-center items-center flex-col p-20px  rounded-lg ">
        {weather && (
          <>
            <div className="text-white/55 font-semibold text-[18px]">
              {month} {date} {year}
            </div>
            <div className="text-white text-[20px] font-bold">
              {weather.name}
            </div>
            <div className="w-[70%] h-[40%] ">
              <img src={weatherImg} alt="img" />
            </div>
            <div className="text-white text-[40px] relative">
              {weather.main.temp}
              <div className="absolute top-[0px] right-[0px] left-[100%] text-[16px]">
                o
              </div>
            </div>
            <div className="text-white">{weather.weather[0].main}</div>
            <form
              className="flex flex-row gap-[5px] justify-center items-centerp-px
"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="outline-none rounded-lg p-[5px]  text-white font-bold from-neutral-50 bg-cyan-800 mt-[5px]"
                placeholder="enter city name"
                onChange={handleInputChange}
              />
              <span>
                <button
                  type="submit"
                  className="text-white bg-blue-950 w-[40px] h-[30px] rounded-r-2xl rounded-l-2xl"
                >
                  Get
                </button>
              </span>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
