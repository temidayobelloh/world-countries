import './home.css';
import {useState} from 'react';
import NavBar from '../NavBar/navBar';
import Hero from '../Hero/hero';
import Layout from '../Country Layout/layout';


const Home = () => {
  const [showLayout, setShowLayout] = useState(true);
  return (
    <div>
      <NavBar/>
      <Hero setShowLayout={setShowLayout} />
      {showLayout && <Layout />}
    </div>
  )
}

export default Home;