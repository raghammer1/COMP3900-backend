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

// Functional component for rendering input fields with labels and error messages
const InvoiceFormInputs = ({
  type, // Type of the input field (e.g., text, number, date)
  handleChange, // Function to handle changes in the input field
  error, // Error message to display if validation fails
  label, // Label text for the input field
  value, // Current value of the input field
  name, // Name attribute for the input field
  required, // Boolean to indicate if the field is required
}) => {
  return (
    <InputGroup>
      <Label>
        {label} {required ? <span style={{ color: 'red' }}>*</span> : null}
      </Label>
      <Input type={type} name={name} value={value} onChange={handleChange} />
      {required && error && <ErrorMessage>{error}</ErrorMessage>}
    </InputGroup>
  );
};

export default InvoiceFormInputs;
