import './hero.css';
 import SearchInput from '../SearchInput/searchInput';
 import SelectCountry from '../SelectCountry/SelectCountry';

const Hero = ({ setShowLayout }) => {
  return (
    <div className='hero-body'>
    <div className='searchWrapper'>
    <SearchInput setShowLayout={setShowLayout} />
    </div>
    <div className='selectCountryWrapper'>
   <SelectCountry/>
    </div>
    </div>
  )
}

export default Hero;