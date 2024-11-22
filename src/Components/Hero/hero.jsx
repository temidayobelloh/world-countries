import './hero.css';

import searchIcon from '../Assets/dark_mode_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';


const Hero = () => {
  return (
    <div className='hero-body'>
    <div className='searchWrapper'>
    <input type="text"  placeholder="Search country.."/>
    <button><img src={searchIcon} alt="searchIcon"/></button>
    </div>
    </div>
  )
}

export default Hero;