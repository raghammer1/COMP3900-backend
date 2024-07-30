import { styled } from '@mui/system';

// Styling for the delete button
const DeleteButton = styled('button')({
  backgroundColor: '#ff1744',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: '#d50000',
  },
});

// Styling for the flex container to layout input groups
const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
});

// Styling for section titles within the form
const SectionTitle = styled('h2')({
  color: '#651FFF',
  borderBottom: '2px solid #651FFF',
  paddingBottom: '5px',
  marginBottom: '10px',
});

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

// Functional component for rendering each line item in the invoice
const InvoiceLineItem = ({
  index, // Index of the line item in the list
  item, // Data of the current line item
  handleLineItemChange, // Function to handle changes in the line item input fields
  errors, // Error messages for the line item input fields
  invoice, // Invoice data containing all line items
  deleteLineItem, // Function to delete a line item
}) => {
  return (
    <div key={index}>
      {/* Title for the line item section */}
      <SectionTitle>Item {index + 1}</SectionTitle>
      <FlexContainer>
        {/* Input group for the line item ID */}
        <InputGroup>
          <Label>
            ID: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            name="id"
            value={item.id}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].id`] && (
            <ErrorMessage>{errors[`line_items[${index}].id`]}</ErrorMessage>
          )}
        </InputGroup>

        {/* Input group for the line item quantity */}
        <InputGroup>
          <Label>
            Quantity: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].quantity`] && (
            <ErrorMessage>
              {errors[`line_items[${index}].quantity`]}
            </ErrorMessage>
          )}
        </InputGroup>

        {/* Input group for the line item total */}
        <InputGroup>
          <Label>
            Total: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="number"
            name="total"
            value={item.total}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].total`] && (
            <ErrorMessage>{errors[`line_items[${index}].total`]}</ErrorMessage>
          )}
        </InputGroup>
      </FlexContainer>

      <FlexContainer>
        {/* Input group for the line item description */}
        <InputGroup>
          <Label>
            Description: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            name="description"
            value={item.description}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].description`] && (
            <ErrorMessage>
              {errors[`line_items[${index}].description`]}
            </ErrorMessage>
          )}
        </InputGroup>

        {/* Input group for the line item price */}
        <InputGroup>
          <Label>
            Price: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="number"
            name="price"
            value={item.price}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].price`] && (
            <ErrorMessage>{errors[`line_items[${index}].price`]}</ErrorMessage>
          )}
        </InputGroup>
      </FlexContainer>

      {/* Button to delete the line item, displayed only if there are multiple line items */}
      {invoice.line_items.length > 1 && (
        <DeleteButton
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this item?')) {
              deleteLineItem(index);
            }
          }}
        >
          Delete Item
        </DeleteButton>
      )}
    </div>
  );
};

export default InvoiceLineItem;
