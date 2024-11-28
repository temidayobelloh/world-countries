import './hero.css';
 import SearchInput from '../SearchInput/searchInput';
 import SelectCountry from '../SelectCountry/SelectCountry';

const Hero = () => {
  return (
    <div className='hero-body'>
    <div className='searchWrapper'>
    <SearchInput/>
    </div>
    <div className='selectCountryWrapper'>
   <SelectCountry/>
    </div>
    </div>
  )
}

export default Hero;