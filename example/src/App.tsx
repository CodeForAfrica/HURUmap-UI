import React from 'react';
import { Router } from '@reach/router';
import Profile from './Profile';

const App: React.FC = () => {
  return (
    <Router>
      <Profile default/>
      <Profile path=":geo" />
    </Router>
  );
};

export default App;
