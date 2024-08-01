import React from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from '../../zustand/useUserStore';
import { useEffect, useState } from 'react';
import { getHistoryEmailById } from '../../services/api';
import { Typography } from '@mui/material';
import EmailHistoryCard from './EmailHistoryCard';
import { useAlert } from '../../components/AlertError';

// This is the main component for displaying email history
const EmailHistory = () => {
  const { id } = useParams(); // Retrieve the id from URL parameters
  const { getUser } = useUserStore(); // Hook to get the current user from the store
  const user = getUser(); // Get the current user object
  const [emails, setEmails] = useState([]); // State to store the list of emails
  const { showAlert } = useAlert(); // Hook to show alerts

  // useEffect hook to fetch email history when the component mounts or id changes
  useEffect(() => {
    async function getData() {
      // Make an API call to get email history by userId and shareObjId
      const res = await getHistoryEmailById({
        userId: user._id,
        shareObjId: id,
      });

      // Show an alert if there's an error, otherwise set the emails state
      if (res.error) {
        showAlert(
          res.data.error ? res.data.error : 'Failed to fetch history email',
          '#cab201'
        );
      } else {
        setEmails(res);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user._id]);

  return (
    <div
      style={{
        height: '90vh',
        overflow: 'auto',
        width: '80vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div
        style={{
          height: '90vh',
          overflow: 'auto',
          width: '70vw',
        }}>
        <h2>Email History</h2>
        {/* Conditionally render EmailHistoryCard components if emails exist */}
        {emails.length > 0 ? (
          emails.map((email) => (
            <EmailHistoryCard key={email._id} email={email} />
          ))
        ) : (
          <Typography>No email history found.</Typography>
        )}
      </div>
    </div>
  );
};

export default EmailHistory;
