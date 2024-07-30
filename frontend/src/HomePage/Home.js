import React from 'react';
import { styled } from '@mui/system';
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import FeatureInfo from './FeatureInfo/FeatureInfo';
import InfoCards from './Info/InfoCards';
import Process from './Process/Process';
import Footer from './Footer/Footer';

// Styled container for the home page
const Container = styled('div')({
  color: '#000',
  height: '100%',
  '@media (max-width: 750px)': {
    margin: '0',
  },
});

// Main Home component that combines all sections
const Home = () => {
  return (
    <div>
      <Container>
        <Navbar /> {/* Navigation bar */}
        <Hero /> {/* Hero section */}
        <div
          style={{
            backgroundColor: '#000',
            paddingTop: '40px',
            paddingBottom: '70px',
          }}
        >
          <FeatureInfo /> {/* Feature information section */}
        </div>
        <div
          style={{
            backgroundColor: '#fff',
            paddingTop: '40px',
            paddingBottom: '70px',
          }}
        >
          <InfoCards /> {/* Information cards section */}
        </div>
        <div
          style={{
            backgroundColor: '#000',
            paddingTop: '40px',
            paddingBottom: '70px',
            height: '75vh',
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Process /> {/* Process section */}
        </div>
        <Footer /> {/* Footer section */}
      </Container>
    </div>
  );
};

export default Home;
