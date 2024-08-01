import React from 'react';
import SelectorLogo from '../../../components/SelectorLogo';
import AllSelectors from './AllSelectors';

// This is the main component for the PDF/UBL validation selector
const PdfUblValidSelector = ({ setDrawerOpen }) => {
  return (
    // This container sets the height for the selector view
    <div style={{ height: '80%' }}>
      {/* Here we display the SelectorLogo component, providing a link to the main dashboard */}
      <SelectorLogo link={`/dashboard/main`} />
      {/* This renders the AllSelectors component, which contains all the selection links */}
      <AllSelectors setDrawerOpen={setDrawerOpen} />
    </div>
  );
};

export default PdfUblValidSelector;
