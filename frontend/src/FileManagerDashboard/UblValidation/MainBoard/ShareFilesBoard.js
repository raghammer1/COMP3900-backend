import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import CustomInputBox from '../../../components/CustomInputBox';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import useValidatorStore from '../../../zustand/useValidatorStore';
import { useParams } from 'react-router-dom';
import { useAlert } from '../../../components/AlertError';
import { sendFileToEmail } from '../../../services/api';
import { validateEmail } from '../../../shared/validators';
import useUserStore from '../../../zustand/useUserStore';

const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '80vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
  position: 'relative',
}));

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  maxWidth: '400px',
  margin: 'auto',
});

const CheckboxContainer = styled('div')({
  marginTop: '20px',
  marginBottom: '20px',
});

const TextareaContainer = styled('div')({
  position: 'relative',
  margin: '20px 0',
  width: '300px',
});

const StyledTextarea = styled('textarea')({
  width: '100%',
  padding: '20px',
  border: '1px solid #ccc',
  fontSize: '16px',
  borderRadius: '8px',
  '&:focus': {
    outline: 'none',
    borderColor: '#007BFF',
  },
});

const TextareaLabel = styled('label')({
  position: 'absolute',
  top: '-10px',
  left: '10px',
  backgroundColor: '#fff',
  padding: '0 5px',
  fontSize: '13px',
  color: '#424242',
});

const LoadingAnimation = styled('div')({
  fontSize: '16px',
  color: '#007BFF',
  fontStyle: 'italic',
  animation: 'typing 1.5s steps(10, end) infinite',
  '@keyframes typing': {
    '0%, 100%': { width: '0' },
    '50%': { width: '12em' },
  },
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  borderRight: '.1em solid',
});

const ShareFilesBoard = () => {
  const { id, process, file } = useParams();
  const { showAlert } = useAlert();
  const { getUser } = useUserStore();
  const user = getUser();

  const [data, setData] = useState({});
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({
    xml: false,
    validatorPdf: false,
  });

  const [fileIds, setFileIds] = useState({
    xml: null,
    validatorPdf: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  );

  useEffect(() => {
    const data = getValidatorDataById(id);
    setData(data);
    setFileIds({
      xml: data.ublId,
      validatorPdf: data.validatorId,
      _id: data._id,
    });
  }, [getValidatorDataById, id]);

  const handleCheckboxChange = (event) => {
    setSelectedFiles({
      ...selectedFiles,
      [event.target.name]: event.target.checked,
    });
    setFileIds({
      ...fileIds,
      [event.target.name]: event.target.checked ? event.target.id : null,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!validateEmail(email)) {
        showAlert('Please enter a valid email', 'tomato');
        return;
      }

      if (!selectedFiles.validatorPdf && !selectedFiles.xml) {
        showAlert('Please select a file to send', 'tomato');
        return;
      }

      setIsLoading(true);

      const fileTypes = [];
      if (selectedFiles.xml) {
        fileTypes.push('ubl');
      }
      if (selectedFiles.validatorPdf) {
        fileTypes.push('validate');
      }

      const result = await sendFileToEmail({
        email,
        xmlId: selectedFiles.xml ? fileIds.xml : null,
        pdfId: null,
        validatorPdfId: selectedFiles.validatorPdf
          ? fileIds.validatorPdf
          : null,
        message: body,
        emailSubject: subject,
        sharedObjId: id,
        process: process,
        fileTypes,
        userId: user._id,
      });

      console.log(result, 'RESDSDSDSDSDD');

      console.log('Email:', email);
      console.log('Subject:', subject);
      console.log('Body:', body);
      console.log('Selected Files:', selectedFiles);
      console.log('File IDs:', fileIds);
      console.log(fileIds, selectedFiles);

      showAlert('Email sent successfully!', 'green');
    } catch (error) {
      console.error('Error sending email:', error);
      showAlert(
        'There was an error sending the email. Please try again.',
        'tomato'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BoardContainer>
      <FormContainer>
        <CustomInputBox
          value={email}
          setValue={setEmail}
          label="Email Address"
          placeholder="Enter recipient's email"
          type="email"
        />
        <CustomInputBox
          value={subject}
          setValue={setSubject}
          label="Email Subject"
          placeholder="Enter email subject"
        />
        <TextareaContainer>
          <StyledTextarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email body"
            rows={4}
          />
          <TextareaLabel>Email Body</TextareaLabel>
        </TextareaContainer>
        <CheckboxContainer>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFiles.xml}
                  onChange={handleCheckboxChange}
                  name="xml"
                  id={data.ublId}
                />
              }
              label="Send UBL XML file"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFiles.validatorPdf}
                  onChange={handleCheckboxChange}
                  name="validatorPdf"
                  id={data.validatorId}
                />
              }
              label="Send Validator PDF file"
            />
          </FormGroup>
        </CheckboxContainer>
        {isLoading ? (
          <LoadingAnimation>SENDING...</LoadingAnimation>
        ) : (
          <CustomPrimaryButton
            label="Send Email"
            onClick={handleSubmit}
            bgcolour="#007BFF"
          />
        )}
      </FormContainer>
    </BoardContainer>
  );
};

export default ShareFilesBoard;
