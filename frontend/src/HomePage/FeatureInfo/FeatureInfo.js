import React from 'react';
import FeatureCard from './FeatureCard';

const FeatureInfo = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '124px',
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          fontFamily: 'Adamina, serif',
          fontWeight: 'initial',
        }}
      >
        Lightning fast. Better privacy. Fairer cost.
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'space-around',
          width: '90%',
          marginTop: '57px',
        }}
      >
        <FeatureCard
          logo={'shield-logo.png'}
          heading="Convert"
          text="Create electronic invoices by converting data from various sources (CSV, SQL, PDF, or manual input) into UBL 2.1 XML format using our API."
        />
        <FeatureCard
          logo={'circle-logo.png'}
          heading="Validate"
          text="Validate UBL 2.1 XML invoices using our API, providing detailed reports in JSON, PDF, or HTML on rule compliance and indicating any validation errors."
        />
        <FeatureCard
          logo={'block-logo.png'}
          heading="Share"
          text="Send UBL invoices via email using our API, with detailed communication reports in JSON, HTML, or PDF formats indicating delivery success or failure."
        />
      </div>
    </div>
  );
};
export default FeatureInfo;
