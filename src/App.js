import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function App() {

  const [weather, setWeather] = useState({});
  const [Cescius, setCelcius] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(true);


  useEffect(() => {

    //Geolocalizacion
    function success(pos) {
      let crd = pos.coords;

      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=7ce6f05e8f9e52dac8156b2d0cfbdbcf`)
        .then(res => {
          setWeather(res.data)
          const celsius = res.data.main.temp - 273.15
          setCelcius(celsius)
        })

    };

    function error(err) {
      console.log('El usuario no permitió la localización');
    };

    navigator.geolocation.getCurrentPosition(success, error);
    //Fin geolocalizacion
  }, [])

  const convertCescius = () => {

    if (isFahrenheit) {
      setCelcius((Cescius * 9 / 5) + 32);
      setIsFahrenheit(false);

    } else {
      setCelcius((Cescius - 32) * 5 / 9);
      setIsFahrenheit(true);
    }


  }
  return (
    <div className="App">

      <div className="article">
        <h1>{weather.name}</h1>
        {weather.main ? <p className="grados">{Cescius}{setCelcius ? "C" : "F"}°</p> : null}
        <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} atl="" />

        <button onClick={convertCescius}>Convert to Celcius</button>
      </div>

      <div className="section">
        <div className="caja">
          <i class='bx bx-wind'></i>
          <h2>Wind:</h2>
          {weather.wind ? <h3>{weather.wind.speed} MPH</h3> : null}
        </div>

        <div className="caja">
          <i class='bx bx-cloud'></i>
          <h2>Clouds:</h2>
          {weather.weather ? <h3>{weather.weather[0].main}</h3> : null}
        </div>

        <div className="caja">
          <i class='bx bxs-thermometer' ></i>
          <h2>Preesure:</h2>
          {weather.main ? <h3>{weather.main.pressure}</h3> : null}
        </div>

        <div className="caja">
          <i class='bx bx-water'></i>
          <h2>Humidity:</h2>
          {weather.main ? <h3>{weather.main.humidity}%</h3> : null}
        </div>

      </div>

    </div>

  );

}

export default App;
