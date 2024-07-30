import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import CustomInputBox from '../../../../components/CustomInputBox';
import InfoIcon from '@mui/icons-material/Info';

// This component handles user information input fields and their corresponding labels and tooltips
const UserInfoForm = ({
  name, // State variable for the name input
  setName, // Function to update the name input
  vendorGln, // State variable for the vendor GLN input
  setVendorGln, // Function to update the vendor GLN input
  customerGln, // State variable for the customer GLN input
  setCustomerGln, // Function to update the customer GLN input
  saveGln, // State variable for the save GLN checkbox
  setSaveGln, // Function to update the save GLN checkbox
}) => {
  return (
    <div>
      {/* Input for file name */}
      <CustomInputBox
        value={name}
        setValue={setName}
        type="text"
        label="File Name"
        placeholder="File A"
        additionalStyles={{ width: '80%' }}
      />

      {/* Input for vendor GLN with tooltip */}
      <div style={{ position: 'relative', marginTop: '30px' }}>
        <CustomInputBox
          value={vendorGln}
          setValue={setVendorGln}
          type="text"
          label="Your GLN"
          placeholder="1234567898765"
          additionalStyles={{ width: '80%' }}
        />
        <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
          <InfoIcon
            style={{
              position: 'absolute',
              right: '15%',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      </div>

      {/* Input for customer GLN with tooltip */}
      <div style={{ position: 'relative', marginTop: '30px' }}>
        <CustomInputBox
          value={customerGln}
          setValue={setCustomerGln}
          type="text"
          label="Customer GLN"
          placeholder="9876543212345"
          additionalStyles={{ width: '80%' }}
        />
        <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
          <InfoIcon
            style={{
              position: 'absolute',
              right: '15%',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      </div>

      {/* Checkbox to save GLN for future uploads */}
      <FormControlLabel
        style={{ marginLeft: '5px' }}
        control={
          <Checkbox
            checked={saveGln}
            onChange={(e) => setSaveGln(e.target.checked)}
            name="saveGln"
          />
        }
        label="Save your GLN for future uploads"
      />
    </div>
  );
};

export default UserInfoForm;
