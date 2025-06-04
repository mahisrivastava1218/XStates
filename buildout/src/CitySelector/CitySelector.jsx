import { useEffect, useState } from "react";
import styles from "./CItySelector.module.css";
import axios from "axios"
const States=()=>{
    const[countries,setCountries] = useState([]);
    const[selectedCountry,setSelectedCountry] = useState("");
    const[states,setStates] = useState([]);
    const[selectedStates,setSelectedStates] = useState("");
    const[cities,setCities] = useState([]);
    const[selectedCities,setSelectedCities] = useState("");
    useEffect(()=>{
        fetch("https://crio-location-selector.onrender.com/countries")
        .then((res)=>{
            if(!res.ok){
               throw new Error("Network not good");
            }
            return res.json()
        })
        .then((data)=>setCountries(data))
        .catch((error)=>console.error("Error fetching countries : ",error));
    },[])
     useEffect(()=>{
        if(selectedCountry){
        axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res)=>{
          setStates(res.data);
          setSelectedStates("");
          setCities([]);
          setSelectedCities("");
        })
        .catch((error)=>console.error("Error fetching States : ",error));
      }
    },[selectedCountry])
     useEffect(()=>{
        if(selectedCountry && selectedStates){
        axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedStates}/cities`)
        .then((res)=>{
            setCities(res.data);
            setSelectedCities("");
        })
        .catch((error)=>console.error("Error fetching Cities : ",error));
        }
    },[selectedCountry,selectedStates])
    console.log(countries,"counties",states,"setStates",cities,"setCities");
 return(
    <div className={styles.CitySelector}>
        <h1>Select Location</h1>
        <div className={styles.selectors}>
            <select value={selectedCountry} onChange={(event)=>setSelectedCountry(event.target.value)} className={styles.dropDown}>
            <option value="" disabled>
             Select Country
            </option>
            {countries.map((country)=>(
                <option value={country} key={country}>{country}</option>
            ))}
            </select>
            <select className={styles.dropDown} disabled={!selectedCountry} onChange={(event)=>setSelectedStates(event.target.value)}>
             <option value="">
             Select State
            </option>
            {states.map((state)=>(
                <option value={state} key={state}>{state}</option>
            ))}
            </select>
            <select value={selectedCities} className={styles.dropDown} onChange={(event)=>setSelectedCities(event.target.value)}
            disabled={!selectedStates}>
             <option value="">
             Select City
            </option>
            {cities.map((city)=>(
                <option value={city} key={city}>{city}</option>
            ))}
            </select>
        </div>
        <div>
        {selectedCities && (
          <h2 className={styles.result}>You selected <span className={styles.highlight}>{selectedCities}</span>,<span className={styles.fade}>
           {" "}
           {selectedStates},{selectedCountry}</span></h2>
        )}
        </div>
    </div>
 )
}
export default States;