import React from 'react';
const Card = ({ bgColour, file, text, para }) => {
  return (
    <div
      style={{
        backgroundColor: `${bgColour}`,
        width: '40%',
        height: '688px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '50px',
      }}
    >
      <div>
        <p
          style={{
            color: '#651FFF',
            fontSize: '42px',
            fontFamily: 'Adamina, serif',
            fontWeight: '400',
            letterSpacing: '0px',
            textAlign: 'center',
          }}
        >
          {text}
        </p>
        <p
          style={{
            textAlign: 'center',
            color: '#838696',
          }}
        >
          {para}
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <img
          style={{ width: '80%' }}
          src={`${process.env.PUBLIC_URL}/${file}`}
          alt="logo"
        />
      </div>
    </div>
  );
};
export default Card;
