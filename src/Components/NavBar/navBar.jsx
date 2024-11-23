import './navBar.css';
import darkMode from '../Assets/dark_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';

const NavBar = () => {
  return (
    <div>
    <nav className='navBar'>
    <h2>Where in the world?</h2>
    <p><button><img src={darkMode} alt={darkMode}/></button>Dark Mode</p>
    </nav>
    </div>
  )
}

export default NavBar;