import './searchInput.css';
import { useState } from 'react';
import searchIcon from '../Assets/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';

const SearchInput = () => {
    const [searchInput, setSearchInput] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const fetchCountryData = async () => {
        if (!searchInput.trim()) {
            alert('Please enter a country name.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
            const data = await response.json();
            if (data.length > 0) {
                setCountryData(data[0]);
            } else {
                setCountryData(null);
                setError('Country not found');
            }
        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='searchWrapper'>
            <input
                type='search'
                placeholder='Search for a country...'
                value={searchInput}
                onChange={handleSearchInput}
            />
            <button onClick={fetchCountryData}>
                <img src={searchIcon} alt='searchIcon' />
            </button>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {countryData && (
                <div>
                    <h2>{countryData.name.common}</h2>
                    <p>Population: {countryData.population.toLocaleString()}</p>
                    <p>Region: {countryData.region}</p>
                    <p>Capital: {countryData.capital?.[0]}</p>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
