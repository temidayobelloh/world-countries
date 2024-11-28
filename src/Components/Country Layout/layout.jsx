import './layout.css';

import React, { useState,  useEffect} from 'react';



const Layout = () => {

//First is to create an array to store the data fetched from the API, the array will be set to empty because it is dependent on what is retrieved from the API.
const [countries, setCountries] = useState([]);
//set states for the loading and errors possibly gotten from the data fetched from the API
const [loading, setLoading]= useState(true);
const [error, setError] = useState(null);

//Next is to use the useEffect to retieve the data fetched from the from the API
useEffect(()=>{
    const fetchCards = async ()=>{
        try{
            const response = await fetch ('https://restcountries.com/v3.1/all');
            if (!response.ok){
                throw new Error('Country not found');
            };
            const data = await response.json();
            console.log(data);
            setCountries(data); //here it updates the fetched country with the fetched data
        }
        catch(error){
            setError(error.message);
        }
        finally{
            setLoading(false);
        }

    };
    fetchCards();
}, []);

//tell the program what to do when there is an error or when it is in loading state
if (loading) return <div>Loading...</div>; // Show loading state
if (error) return <div>Error: {error}</div>; // Show error state



  return (
    <div className='country-layout'>
        {countries.map((country, index) => (
            <div key={index} className='card'>
                <img src={country.flags?.svg}
                 alt={`Flag of ${country.name.common}`}
                className='flag'/>
                <h2>{country.name.common}</h2>
                <p><strong>Population: </strong>{country.population.toLocaleString()}</p>
                <p><strong>Region: </strong>{country.region}</p>
                <p><strong>Capital: </strong>{country.capital ? country.capital[0] : 'N/A'}</p>


            </div>
        ))};
    </div>
  );
};

export default Layout;