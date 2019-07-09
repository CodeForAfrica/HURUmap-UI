import React from 'react';

import { MapIt } from 'hurumap-ui';
import { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {
  geo?: string;
}

function Profile({ geo }: Props) {
  // TODO: Wait for MapIt enhacement
  //   let geoLevel = '';
  let geoCode = '';
  if (geo) {
    const parts = geo.split('-');
    // geoLevel = parts[0];
    geoCode = parts[1];
  }
  return (
    <div>
      <div style={{ width: '100%', height: '500px' }}>
        <div style={{ width: '600px', height: '400px' }}>
          <MapIt
            loadCountries={geoCode === '' ? ['KE', 'TZ', 'ZA'] : [geoCode]}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
