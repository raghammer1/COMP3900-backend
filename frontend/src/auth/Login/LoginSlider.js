import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Component for the slider component on the login page (for beauty)
const LoginSlider = () => {
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={4000}
      infiniteLoop={true}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '120px',
          margin: '0',
        }}
      >
        <p
          style={{
            maxWidth: '50%',
            color: 'white',
            fontWeight: 'lighter',
            fontSize: '16px',
            marginTop: '0',
          }}
        >
          Helping every business move with the next major revolution happening
          in the industry. #Industry4.0 #EveryoneGrowsTogether
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            maxWidth: '50%',
            color: 'white',
            fontWeight: 'lighter',
            fontSize: '16px',
          }}
        >
          Embrace change, embrace growth. Experience Industry 4.0 with us.
          #FutureForward
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            maxWidth: '50%',
            color: 'white',
            fontWeight: 'lighter',
            fontSize: '16px',
          }}
        >
          Empowering businesses to thrive in a connected world. #InnovateWithUs
        </p>
      </div>
    </Carousel>
  );
};

export default LoginSlider;
