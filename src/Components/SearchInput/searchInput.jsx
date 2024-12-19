import './searchInput.css';
import { useState } from 'react';

import searchIcon from '../Assets/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';

const SearchInput = ({ setShowLayout }) => {
    const [searchInput, setSearchInput] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle user input
    const handleSearchInput = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);

        if (inputValue.trim() === '') {
            setCountryData(null);
            setError(null);
            setShowLayout(true);
        }
    };

    // Function to fetch country data
    const fetchCountryData = async () => {
        if (!searchInput.trim()) {
            alert('Please enter a country name.');
            setShowLayout(true); 
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
            const data = await response.json();
            if (data.length > 0) {
                setCountryData(data[0]);
                setShowLayout(false);
            } else {
                setCountryData(null);
                setError('Country not found');
                setShowLayout(true); 
            }
        } catch (error) {
            setError('An error occurred while fetching data');
            setShowLayout(true);

        } finally {
            setIsLoading(false);
        }
    };
  
    // Function to fetch details of a border country
    const fetchBorderDetails = async (borderCode) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
            const [borderCountryData] = await response.json();
            alert(`Border Country: ${borderCountryData.name.common}`);
        } catch (error) {
            console.error('Error fetching border country details:', error);
        }
    };

    return (
        <div className="searchWrapper">
            <div className="searchInputContainer">
                <input
                    type="search"
                    placeholder="Search for a country..."
                    value={searchInput}
                    onChange={handleSearchInput}
                    onKeyDown={(e) => { if (e.key === 'Enter') fetchCountryData(); }}
                />
                <button onClick={fetchCountryData} >
                    <img src={searchIcon} alt="Search Icon" />
                </button>
            </div>
            <div className="output-wrapper">
                <div className="output">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {countryData && (
                        
                        <div className="country-details">
                            <img src={countryData.flags.svg} alt="country" />
                            <div className="country-info">
                                <div className= "country-info-one">
                                    <h1>{countryData.name.common}</h1>
                                    <p><b>Native name:</b> {countryData.name.nativeName?.eng?.common || 'Not available'}</p>
                                    <p><b>Population: </b> {countryData.population.toLocaleString()}</p>
                                    <p><b>Region: </b>{countryData.region}</p>
                                    <p><b>Sub Region: </b> {countryData.subregion}</p>
                                    <p><b>Capital: </b>{countryData.capital?.[0]}</p>
                                    <button className='back-btn' onClick={() => {setCountryData(null); setShowLayout(true); }}> 
                                        Back to Home </button>
                                </div>
                                <div className='country-info-two'>
                                    <p><b>Currency: </b>{countryData.currencies ? Object.values(countryData.currencies)[0].name : 'Not available'}</p>
                                    <p><b>Languages: </b> {countryData.languages ? Object.values(countryData.languages).join(', ') : 'Not available'}</p>
                                    <div className='border-countries'>
                                        <div>
                                        <b>Border Countries: </b>
                                        {countryData.borders && countryData.borders.length > 0 ? (
                                            countryData.borders.map((border, index) => (
                                                <button 
                                                    key={index} 
                                                    onClick={() => fetchBorderDetails(border)}
                                                >
                                                    {border}
                                                </button>
                                            ))
                                        ) : (
                                            <span> None</span>
                                        )}
                                    </div>
                                    </div>
                                    </div>
                            </div>
                        </div>                      
                    )}
                </div>
                
                
            </div>
            
        </div>
    );
};

export default SearchInput;
