import "./App.css";
import SearchField from "react-search-field";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [city, setcity] = useState("");
  const [temp, settemp] = useState(0);
  const [Humidity, sethumidity] = useState(0);
  const [search, setsearch] = useState("delhi");
  const [pressure, setpressure] = useState(0);
  const [wind, setwind] = useState(0);

  useEffect(() => {
    console.log("I am inside useEffect");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8f200bcb1d4486158a9c317c216a9008`
      )
      .then((res) => {
        console.log("res", res);
        settemp(res.data.main.temp);
        setpressure(res.data.main.pressure);
        sethumidity(res.data.main.humidity);
        setwind(res.data.wind.speed);
        setcity(res.data.name);
      });
  }, [search]);

  return (
    <div className="weather-box">
      <div className="weather-header">
        <h1>Weather App</h1>
      </div>
      <div className="weather-search">
        <SearchField
          placeholder="Search..."
          onSearchClick={(value) => {
            setsearch(value);
          }}
          searchText={search}
          classNames="weather-input"
        />
      </div>
      <div className="weather-cloud">
        <FeatherIcon icon="cloud-rain" color="white" size="60" />
      </div>

      <div className="weather-city">
        <h1> {city} </h1>
      </div>
      <div class="weather-row">
        <div class="weather-column">
          <FeatherIcon icon="sun" color="white" />
          <p>Temp: {(temp - 273.15).toFixed(2)} "C</p>
        </div>
        <div class="weather-column">
          <FeatherIcon icon="command" color="white" />
          <p>Pressure: {pressure}</p>
        </div>
      </div>
      <div class="weather-row">
        <div class="weather-column">
          <FeatherIcon icon="cloud" color="white" />
          <p>Humidity: {Humidity}</p>
        </div>
        <div class="weather-column">
          <FeatherIcon icon="wind" color="white" />
          <p>Wind: {wind}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
