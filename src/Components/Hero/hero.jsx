import './hero.css';
 import searchIcon from '../Assets/search_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';


const Hero = () => {
  return (
    <div className='hero-body'>
    <div className='searchWrapper'>
    <input type="search"  placeholder="Search for a country.."/>
    <button><img src={searchIcon} alt="searchIcon"/></button>
    </div>
    <div>
    <select>
    <option>Nigeria</option>
    <option>Australia</option>
    <option>United Kingdom</option>
    <option>USA</option>
    <option>France</option>
    </select>
    </div>
    </div>
  )
}

export default Hero;