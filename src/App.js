import './App.css';
import React, {useState} from 'react';
import axios from 'axios';


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7ce6f05e8f9e52dac8156b2d0cfbdbcf`

  const getWeather = async (location) =>{

  }

  const miIp = (location) =>{
    const {latitude, longitude} = location.coords
  }
 
  const searchLocation = (event)=>{
    if(event.key === "Enter"){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="App">
      <div className='search'>
        <input value={location} onChange={event => setLocation (event.target.value)}
          onKeyPress={searchLocation}
          placeholder=" Enter Location" type="text">
        </input>
        <i class='bx bxs-location-plus'></i>
      </div>
      <div className="article">
        <h1>{data.name}</h1>
        {data.main ?<p className="grados">{data.main.temp.toFixed()}°F</p>:null}
        <i class='bx bxs-chevron-right'></i>
        {data.weather ?<p className="clima">{data.weather[0].main}</p>:null}
      </div>

    {data.name != undefined &&
      <div className="section">
        <div className="caja">
        <i class='bx bx-wind'></i>
          <h2>Wind:</h2>
          {data.wind ?<h3>{data.wind.speed} MPH</h3>:null}
        </div>

        <div className="caja">
        <i class='bx bx-cloud'></i>
          <h2>Clouds:</h2>
          <h3>40%</h3>
        </div>

        <div className="caja">
        <i class='bx bxs-thermometer' ></i>
          <h2>Preesure:</h2>
          {data.main ?<h3>{data.main.pressure}</h3>:null}
        </div>

        <div className="caja">
        <i class='bx bx-water'></i>
          <h2>Humidity:</h2>
          {data.main ?<h3>{data.main.humidity}%</h3>:null}
        </div>
      </div>
    }
    </div>
  );
}

export default App;
