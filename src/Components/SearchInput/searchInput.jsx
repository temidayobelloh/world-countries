import './searchInput.css';
import {useState} from 'react';
import searchIcon from '../Assets/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';


const SearchInput = () => {
    //creating a variable where i can store the state based on user input and the one which will store data
    
    const [searchInput, setsearchInput ]= useState('');
    const [countryData, setcountryData]= useState(null);

    //create a function that will handle the state of the data based on user input

    const handleSearchInput =(event)=>{
        setsearchInput(event.target.value);
    }

    //create a function to handle the data fetched from the API when the user clicks a button
    const fetchCountryData = async()=> {
        if (searchInput){
            try{
                const response = await fetch('');
                const data = await response.json();
                setcountryData(data[0]);
            }
            catch(error){
                console.error('There has been an error fetching this file:', error);
            }
        }
    };
  return (
    <div className='searchWrapper'>
    <input type='search' placeholder="Search for a country.." value={searchInput} onChange={handleSearchInput}/>
    <button onClick={fetchCountryData}><img src={searchIcon} alt="searchIcon"/></button>
    { countryData && 
        <div>
            <h2>{countryData.name}</h2>
            <p>Population: {countryData.population}</p>
            <p>Region:{countryData.region}</p>
            <p>Capital:{countryData.capital}</p>
        </div>
    }
    </div>
  );
};

export default SearchInput;
