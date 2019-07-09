import React from 'react';

import { MapIt } from 'hurumap-ui';
import { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {
  geoId?: string;
}

function Profile({ geoId, navigate }: Props) {
  let geoLevel = 'continent';
  let geoCode = 'AFR';
  if (geoId) {
    const parts = geoId.split('-');
    geoLevel = parts[0];
    geoCode = parts[1];
  }
  return (
    <div>
      <div style={{ width: '100%', height: '500px' }}>
        <div style={{ width: '600px', height: '400px' }}>
          <MapIt
            drawChildren
            drawProfile={Boolean(geoId)}
            codeType="AFR"
            geoLevel={geoLevel}
            geoCode={geoCode}
            filterCountries={['KE', 'TZ', 'ZA']}
            onClickGeoLayer={(area) => {
              if (navigate) {
                navigate(`/${area.codes['AFR']}`);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
