import React from 'react';
import Card from './Card';
import PurpleCard from './PurpleCard';

const InfoCards = () => {
  return (
    <div>
      <h1
        style={{
          marginLeft: '8%',
          fontSize: '56px',
          fontFamily: 'Adamina, serif',
          fontWeight: 'initial',
          marginTop: '250px',
        }}
      >
        Lightweight design, ready to
        <br />
        use for <span style={{ color: '#FFE0E5' }}>business productivity</span>.
      </h1>
      <div
        style={{
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1%',
        }}
      >
        <Card
          bgColour="#FFF7ED"
          file="file-sharing.png"
          text="File Sharing"
          para="Securely share files within or outside your organization."
        />
        <Card
          bgColour="#E0F7FA"
          file="file-request.png"
          text="Collect Files"
          para="You can collect and receive files in a secure environment."
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: '528px',
            width: '81%',
            backgroundColor: '#ECECFE',
            marginTop: '32px',
            borderRadius: '24px',
          }}
        >
          <PurpleCard />
        </div>
      </div>
    </div>
  );
};
export default InfoCards;
