import React from 'react';
import { styled } from '@mui/system';

// Styled container for the main invoice display
const InvoiceContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '80%',
  height: '80vh',
  margin: '20px auto',
  fontFamily: 'Arial, sans-serif',
  overflow: 'auto',
});

// Styled title for the invoice
const InvoiceTitle = styled('h1')({
  color: '#651FFF',
  textAlign: 'center',
  marginBottom: '20px',
});

// Styled title for each section within the invoice
const SectionTitle = styled('h2')({
  color: '#651FFF',
  borderBottom: '2px solid #651FFF',
  paddingBottom: '5px',
  marginBottom: '10px',
});

// Styled group for info labels and values
const InfoGroup = styled('div')({
  marginBottom: '15px',
});

// Styled label for information fields
const Label = styled('div')({
  color: '#000',
  fontWeight: 'bold',
});

// Styled value for information fields
const Value = styled('div')({
  color: '#333',
  marginBottom: '10px',
});

// Styled container for flex layout
const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
});

// Styled container for each line item
const LineItemContainer = styled('div')({
  marginBottom: '10px',
});

// Styled title for each line item
const LineItemTitle = styled('h3')({
  color: '#651FFF',
  marginBottom: '10px',
});

// Component to display invoice information in a structured format
const GuiFormDisplay = ({ invoice }) => {
  return (
    <InvoiceContainer>
      <InvoiceTitle>Invoice</InvoiceTitle>

      <SectionTitle>Invoice Details</SectionTitle>
      <FlexContainer>
        <InfoGroup>
          <Label>Invoice Number:</Label>
          <Value>{invoice.invoice_number}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Date:</Label>
          <Value>{invoice.date}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Due Date:</Label>
          <Value>{invoice.due_date}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Purchase Order Number:</Label>
          <Value>{invoice.purchase_order_number}</Value>
        </InfoGroup>
      </FlexContainer>

      <SectionTitle>Financial Details</SectionTitle>
      <FlexContainer>
        <InfoGroup>
          <Label>Subtotal:</Label>
          <Value>{invoice.subtotal}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Tax:</Label>
          <Value>{invoice.tax}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Total:</Label>
          <Value>{invoice.total}</Value>
        </InfoGroup>
      </FlexContainer>

      <SectionTitle>Vendor Information</SectionTitle>
      <FlexContainer>
        <InfoGroup>
          <Label>Name:</Label>
          <Value>{invoice.vendor.name}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Address:</Label>
          <Value>{invoice.vendor.address}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>VAT Number:</Label>
          <Value>{invoice.vendor.vat_number}</Value>
        </InfoGroup>
      </FlexContainer>

      <SectionTitle>Customer Information</SectionTitle>
      <FlexContainer>
        <InfoGroup>
          <Label>Name:</Label>
          <Value>{invoice.customer.name}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>Address:</Label>
          <Value>{invoice.customer.address}</Value>
        </InfoGroup>
        <InfoGroup>
          <Label>VAT Number:</Label>
          <Value>{invoice.customer.vat_number}</Value>
        </InfoGroup>
      </FlexContainer>

      <SectionTitle>Line Items</SectionTitle>
      {invoice.line_items.map((item, index) => (
        <LineItemContainer key={index}>
          <LineItemTitle>Item {index + 1}</LineItemTitle>
          <FlexContainer>
            <InfoGroup>
              <Label>ID:</Label>
              <Value>{item.id}</Value>
            </InfoGroup>
            <InfoGroup>
              <Label>Quantity:</Label>
              <Value>{item.quantity}</Value>
            </InfoGroup>
            <InfoGroup>
              <Label>Total:</Label>
              <Value>{item.total}</Value>
            </InfoGroup>
            <InfoGroup>
              <Label>Description:</Label>
              <Value>{item.description}</Value>
            </InfoGroup>
            <InfoGroup>
              <Label>Price:</Label>
              <Value>{item.price}</Value>
            </InfoGroup>
          </FlexContainer>
        </LineItemContainer>
      ))}
    </InvoiceContainer>
  );
};

export default GuiFormDisplay;
