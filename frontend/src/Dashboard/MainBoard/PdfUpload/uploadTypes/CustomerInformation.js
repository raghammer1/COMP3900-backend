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

// Styling for the flex container that wraps input groups
const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
});

// Component to handle customer information input fields in the form
const CustomerInformation = ({ invoice, handleCustomerChange, errors }) => {
  return (
    <FlexContainer>
      {/* Input group for customer's name */}
      <InputGroup>
        <Label>
          Name: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          data-testid={'text-name-customer'}
          type="text"
          name="name"
          value={invoice.customer.name}
          onChange={handleCustomerChange}
        />
        {errors['customer.name'] && (
          <ErrorMessage>{errors['customer.name']}</ErrorMessage>
        )}
      </InputGroup>

      {/* Input group for customer's address */}
      <InputGroup>
        <Label>
          Address: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          data-testid={'text-address-cus'}
          type="text"
          name="address"
          value={invoice.customer.address}
          onChange={handleCustomerChange}
        />
        {errors['customer.address'] && (
          <ErrorMessage>{errors['customer.address']}</ErrorMessage>
        )}
      </InputGroup>

      {/* Input group for customer's VAT number */}
      <InputGroup>
        <Label>
          VAT Number: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          data-testid={'text-vat_number-cus'}
          type="text"
          name="vat_number"
          value={invoice.customer.vat_number}
          onChange={handleCustomerChange}
        />
        {errors['customer.vat_number'] && (
          <ErrorMessage>{errors['customer.vat_number']}</ErrorMessage>
        )}
      </InputGroup>
    </FlexContainer>
  );
};

export default CustomerInformation;
