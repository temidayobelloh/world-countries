import './layout.css';
import React, { useState, useEffect } from 'react';

const Layout = () => {
  // First is to create an array to store the data fetched from the API, the array will be set to empty because it is dependent on what is retrieved from the API.
  const [countries, setCountries] = useState([]);
  // Set states for the loading and errors possibly gotten from the data fetched from the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Set states for pagination
  const [currentPage, setCurrentPage] = useState(1); // Keeps track of the current page
  const itemsPerPage = 8; // Number of countries to display per page

  // Next is to use the useEffect to retrieve the data fetched from the API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Country not found');
        }
        const data = await response.json();
        console.log(data);
        setCountries(data); // Here it updates the fetched countries with the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Determine the countries to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage; // Calculate the starting index
  const endIndex = startIndex + itemsPerPage; // Calculate the ending index
  const currentCountries = countries.slice(startIndex, endIndex); // Slice the array to get the current page's countries

  // Handle Pagination
  const totalPages = Math.ceil(countries.length / itemsPerPage); // Calculate the total number of pages

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Increment the current page
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement the current page
    }
  };

  // Tell the program what to do when there is an error or when it is in a loading state
  if (loading) return <div className="loading-state">Loading...</div>; // This will show the loading state
  if (error) return <div className="loading-error">Error: {error}</div>; // This will show the error state

  return (
    <div>
      <div className="country-layout">
        {currentCountries.map((country, index) => (
          <div key={index} className="card">
            <img
              src={country.flags?.svg}
              alt={`Flag of ${country.name.common}`}
              className="flag"
            />
            <h2>{country.name.common}</h2>
            <p>
              <strong>Population: </strong>
              {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region: </strong>
              {country.region}
            </p>
            <p>
              <strong>Capital: </strong>
              {country.capital ? country.capital[0] : 'N/A'}
            </p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Layout;
