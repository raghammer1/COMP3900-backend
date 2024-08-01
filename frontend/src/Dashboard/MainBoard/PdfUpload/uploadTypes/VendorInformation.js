import React from 'react';
import { styled } from '@mui/system';

// Styling for the input group container
const InputGroup = styled('div')({
  marginBottom: '15px',
  flex: '1',
  minWidth: 'calc(50% - 10px)',
  boxSizing: 'border-box',
});

// Styling for the label of the input fields
const Label = styled('label')({
  color: '#000',
  marginBottom: '5px',
  display: 'block',
});

// Styling for the input fields
const Input = styled('input')({
  width: '90%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginBottom: '5px',
  '&:focus': {
    borderColor: '#651FFF',
    outline: 'none',
  },
});

// Styling for the error message text
const ErrorMessage = styled('p')({
  color: 'red',
  fontSize: '12px',
  marginTop: '-4px',
});

// Styling for the flex container to layout input groups
const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
});

// Functional component for rendering vendor information input fields
const VendorInformation = ({
  invoice, // Invoice data containing vendor information
  handleVendorChange, // Function to handle changes in the vendor input fields
  errors, // Error messages for the vendor input fields
}) => {
  return (
    <FlexContainer>
      {/* Input group for the vendor name */}
      <InputGroup>
        <Label>
          Name: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          data-testid={'text-name'}
          type="text"
          name="name"
          value={invoice.vendor.name}
          onChange={handleVendorChange}
        />
        {errors['vendor.name'] && (
          <ErrorMessage>{errors['vendor.name']}</ErrorMessage>
        )}
      </InputGroup>

      {/* Input group for the vendor address */}
      <InputGroup>
        <Label>
          Address: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          data-testid={'text-address'}
          type="text"
          name="address"
          value={invoice.vendor.address}
          onChange={handleVendorChange}
        />
        {errors['vendor.address'] && (
          <ErrorMessage>{errors['vendor.address']}</ErrorMessage>
        )}
      </InputGroup>

      {/* Input group for the vendor VAT number */}
      <InputGroup>
        <Label>
          VAT Number: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          data-testid={'text-vat_number'}
          type="text"
          name="vat_number"
          value={invoice.vendor.vat_number}
          onChange={handleVendorChange}
        />
        {errors['vendor.vat_number'] && (
          <ErrorMessage>{errors['vendor.vat_number']}</ErrorMessage>
        )}
      </InputGroup>
    </FlexContainer>
  );
};

export default VendorInformation;
