import React from 'react';

import { MapIt } from 'hurumap-ui';

const App: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh"}}>
      <MapIt loadCountries={['KE']} />
    </div>
  );
};

export default App;
