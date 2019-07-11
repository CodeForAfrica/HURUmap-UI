import React from 'react';
import { Router } from '@reach/router';
import Profile from './Profile';

const App: React.FC = () => {
  return (
    <Router>
      <Profile default geoId="country-ZA"/>
      <Profile path="/:geoId" />
    </Router>
  );
};

export default App;
