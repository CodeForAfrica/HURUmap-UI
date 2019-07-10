import React from 'react';

import { MapIt } from 'hurumap-ui';
import { RouteComponentProps } from '@reach/router';

import bg from './assets/images/background.png';
import ProfileHero from './components/ProfileHero';

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
  console.log(bg);
  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundImage: `url(${bg})` }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '50px',
          maxWidth: '100%',
          height: '500px'
        }}
      >
        <ProfileHero
          geoCode={geoCode}
          geoLevel={geoLevel}
          profile={{
            demographics: {
              total_population: {
                values: {
                  this: 9999
                }
              },
              population_density: {
                values: {
                  this: 999999.9
                }
              }
            },
            primary_releases: {
              active: {
                citation: 'citation'
              }
            },
            geography: {
              parents: { example: { name: 'Demo', full_geoid: 'Demo' } },
              this: {
                square_kms: '6666.6',
                short_name: 'Demo'
              }
            }
          }}
        >
          <MapIt
            drawChildren
            drawProfile={Boolean(geoId)}
            codeType="AFR"
            geoLevel={geoLevel}
            geoCode={geoCode}
            filterCountries={['KE', 'TZ', 'ZA']}
            onClickGeoLayer={area => {
              if (navigate) {
                navigate(`/${area.codes['AFR']}`);
              }
            }}
          />
        </ProfileHero>
      </div>
    </div>
  );
}

export default Profile;
