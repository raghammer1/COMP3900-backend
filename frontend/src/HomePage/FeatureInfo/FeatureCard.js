import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShareIcon from '@mui/icons-material/Share';

// Keyframes for the fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Keyframes for the pulse animation
const pulse = keyframes`
  0% { background-color: rgba(255, 255, 255, 0.1); }
  50% { background-color: rgba(255, 255, 255, 0.3); }
  100% { background-color: rgba(255, 255, 255, 0.1); }
`;

// Styled component for the product card
const ProductCard = styled('div')(({ hoverColor }) => ({
  height: '370px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  margin: '20px',
  border: '2px solid #fff',
  padding: '20px',
  borderRadius: '10px',
  width: '400px',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  transition: 'all 0.5s ease',
  animation: `${fadeIn} 1.5s ease-out`,
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: `0 8px 16px ${hoverColor}`,
    borderColor: hoverColor,
    animation: `${pulse} 3s infinite ease-in-out`,
  },
  '@media (max-width: 750px)': {
    width: '80%',
  },
}));

// Styled component for the product image
const ProductImage = styled('div')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  backgroundColor: '#651FFF',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
});

// Styled component for the product information
const ProductInfo = styled('div')({
  fontSize: '1rem',
});

// This component represents a feature card
const FeatureCard = ({ hoverColor, info, type }) => {
  const nav = useNavigate(); // Hook to navigate programmatically

  // Function to navigate to a specific route based on the card type
  const handleGoTo = () => {
    console.log(type);
    if (type === 'Share') {
      nav('/dashboard/help');
    } else {
      nav(`/dashboard/${type.toLowerCase()}`);
    }
    return;
  };

  // Function to render the appropriate icon based on the card type
  const renderIcon = () => {
    switch (type) {
      case 'Convert':
        return <SyncAltIcon style={{ fontSize: '3rem' }} />;
      case 'Validate':
        return <CheckCircleIcon style={{ fontSize: '3rem' }} />;
      case 'Share':
        return <ShareIcon style={{ fontSize: '3rem' }} />;
      default:
        return <SyncAltIcon style={{ fontSize: '3rem' }} />;
    }
  };

  return (
    <ProductCard onClick={handleGoTo} hoverColor={hoverColor}>
      <ProductImage>{renderIcon()}</ProductImage>
      <ProductInfo>
        <h3>{type}</h3>
        <p>{info}</p>
      </ProductInfo>
    </ProductCard>
  );
};

export default FeatureCard;
