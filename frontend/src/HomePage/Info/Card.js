import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ bgColour, file, text, para }) => {
  return (
    <motion.div
      style={{
        backgroundColor: `${bgColour}`,
        width: '90vw',
        maxWidth: '400px',
        height: 'fit-content',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '5vw',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <p
          style={{
            color: '#D3D3D3',
            fontSize: '4vw',
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
            color: '#C0C0C0',
            marginRight: '20px',
            marginLeft: '20px',
          }}
        >
          {para}
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <img
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '0 0 9px 9px',
            objectFit: 'cover',
            marginBottom: '-10px',
          }}
          src={`${process.env.PUBLIC_URL}/${file}`}
          alt="logo"
        />
      </div>
    </motion.div>
  );
};

export default Card;
