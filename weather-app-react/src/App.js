import React, {useState} from "react";
import axios from "axios";

function App() {
  const [data, setData]=useState({})
  const [location,setLocation]=useState("")
  const [lat,setLat]=useState("")
  const [lon,setLon]=useState("")

const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9e86129afe1cd5f10ff6886c0e151cdb`
const longlag=`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=9e86129afe1cd5f10ff6886c0e151cdb`

const getCoord=(e)=>{
  if(e.key==='Enter'){
    axios.get(longlag).then((response)=>{
    console.log(response.data[0])
    setLat(response.data[0].lat)
    setLon(response.data[0].lon)
    console.log(response.data[0].lon)
    console.log(response.data[0].lat)
    })
    searchLocation()
  }
}  
const searchLocation=()=>{
  setTimeout(()=>{
    if(lat && lon){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  },500)
}
return (
    <div className="app">
      <div className="search">
        <input
        value={location} 
        onKeyPress={getCoord}
        onChange={e=> setLocation(e.target.value) }
        placeholder= 'Enter Location'
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name }</p>
          </div>
          <div className="temp">
           {data.main ? <h1>{data.main.temp.toFixed()}°F</h1>: null}
          </div>
          <div className="description">
            {data.weather? <h1>{data.weather[0].main}</h1>: null}
          </div>
        </div>

        {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main? <p className="bold">{data.main.feels_like.toFixed()}°F</p>:null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main? <p className="bold">{data.main.humidity}%</p>:null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind? <p className="bold">{data.wind.speed} MPH</p>:null}
            <p>Wind Speed</p>
          </div>
        </div>
        }
        


      </div>
    </div>
  );
}

export default App;
