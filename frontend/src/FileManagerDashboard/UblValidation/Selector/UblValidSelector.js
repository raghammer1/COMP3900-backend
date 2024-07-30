import React from 'react';
import SelectorLogo from '../../../components/SelectorLogo';
import AllSelectors from './AllSelectors';

// This component is the main selector page for UBL validation
const UblValidSelector = () => {
  return (
    // Container div with a specified height
    <div style={{ height: '80%' }}>
      {/* Logo component that links back to the dashboard */}
      <SelectorLogo link={`/dashboard/main`} />
      {/* Component that displays all the selector links */}
      <AllSelectors />
    </div>
  );
};

export default UblValidSelector;
