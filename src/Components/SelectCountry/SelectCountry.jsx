import './SelectCountry.css';
import {useState, useEffect} from "react";
//research on whether you can dynamically insert these select option of countries esxiting in the api into the select element



const SelectCountry = () => {

//this will help to handle the state of the countries i fetch from the API
const [countries, setCountries] = useState([]);

useEffect(() => {
  // Replace with your API URL
  fetch('https://restcountries.com/v3.1/all') 
    .then(response => response.json())
    .then(data => {
      // Extract country names from the API response
      const countryNames = data.map(country => country.name.common);
      setCountries(countryNames);
    })
    .catch(error => console.error('Error fetching countries:', error));
}, []);

return (
  <div>
   <select defaultValue="">
  <option value="" disabled>Select a country</option>
  {countries.map((country, index) => (
    <option key={index}>{country}</option>
  ))}
</select>
  </div>
);
}

export default SelectCountry;