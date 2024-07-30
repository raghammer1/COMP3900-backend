import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import useMediaQuery from '@mui/material/useMediaQuery';

const rotateAnimation = {
  opacity: [1, 0.7, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'easeInOut',
  },
};

const InfoCards = () => {
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ padding: '0 5%', marginBottom: isSmallScreen ? '90px' : '' }}
    >
      <motion.h1
        style={{
          fontSize: isSmallScreen ? '40px' : '4vw',
          fontFamily: 'Adamina, serif',
          fontWeight: 'initial',
          marginTop: '5vw',
          textAlign: 'center',
        }}
      >
        <motion.span
          style={{ display: 'inline-block' }}
          animate={rotateAnimation}
          transition={{ duration: 2, ease: 'easeInOut', loop: Infinity }}
        >
          Lightweight design, ready to use for
          <br />
          <span style={{ color: '#651FFF' }}>business productivity</span>.
        </motion.span>
      </motion.h1>
      <motion.div
        style={{
          marginTop: '5vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2vw',
          flexWrap: 'wrap',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          bgColour="#000"
          file="file-sharing.png"
          text="File Sharing"
          para="Securely share files within or outside your organization."
        />
        <Card
          bgColour="#000"
          file="file-manage.png"
          text="Collect Files"
          para="All your files saved for you at a secure place, one that you can believe in."
        />
        <Card
          bgColour="#000"
          file="file-types.webp"
          text="Multi Types"
          para="Accepts and generates reports in multiple formats for your ease."
        />
      </motion.div>
    </motion.div>
  );
};

export default InfoCards;
