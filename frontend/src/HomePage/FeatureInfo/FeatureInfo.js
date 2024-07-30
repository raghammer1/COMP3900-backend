import React from 'react';
import { styled, keyframes } from '@mui/system';
import FeatureCard from './FeatureCard';

// Keyframes for the glow animation
const glow = keyframes`
  from { text-shadow: 0 0 10px #fff, 0 0 20px #651FFF, 0 0 30px #651FFF, 0 0 40px #651FFF, 0 0 50px #651FFF, 0 0 60px #651FFF, 0 0 70px #651FFF; }
  to { text-shadow: 0 0 20px #fff, 0 0 30px #651FFF, 0 0 40px #651FFF, 0 0 50px #651FFF, 0 0 60px #651FFF, 0 0 70px #651FFF, 0 0 80px #651FFF; }
`;

// Styled component for the product showcase section
const ProductShowcaseSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px 0',
  backgroundColor: '#000',
  color: '#fff',
  '@media (max-width: 750px)': {
    padding: '20px 0',
  },
});

// Styled component for the product heading container
const ProductHeadingContainer = styled('div')({
  marginBottom: '20px',
  textAlign: 'center',
});

// Styled component for the product heading with glow animation
const ProductHeading = styled('h1')({
  fontSize: '2.5rem',
  color: '#fff',
  animation: `${glow} 2.5s ease-in-out infinite alternate`,
});

// Styled component for the product cards container
const ProductCardsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  width: '100%',
  flexWrap: 'wrap',
  '@media (max-width: 750px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

// This component represents the feature information section with product cards
const FeatureInfo = () => {
  return (
    <ProductShowcaseSection>
      <ProductHeadingContainer>
        <ProductHeading>Our Product Features...</ProductHeading>
      </ProductHeadingContainer>
      <ProductCardsContainer>
        <FeatureCard
          hoverColor="#ff6f61"
          info="Create electronic invoices by converting data from various sources
              (CSV, SQL, PDF, or manual input) into UBL 2.1 XML format using our
              API."
          type="Convert"
        />
        <FeatureCard
          hoverColor="#4caf50"
          info="Validate UBL 2.1 XML invoices using our API, providing detailed
              reports in JSON, PDF, or HTML on rule compliance and indicating
              any validation errors."
          type="Validate"
        />
        <FeatureCard
          hoverColor="#2196f3"
          info="Send UBL invoices via email using our API, with detailed
              communication reports in JSON, HTML, or PDF formats indicating
              delivery success or failure."
          type="Share"
        />
      </ProductCardsContainer>
    </ProductShowcaseSection>
  );
};

export default FeatureInfo;
