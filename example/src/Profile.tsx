import React from 'react';

import { MapIt } from 'hurumap-ui';
import { RouteComponentProps } from '@reach/router';

import bg from './assets/images/background.png';
import ProfileHero from './components/ProfileHero';
import ProfileTabs from './components/ProfileTabs';
import ChartsContainer from './components/ChartsContainer';
import ChartContainer from './components/ChartContainer';
import { Grid } from '@material-ui/core';

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
      style={{ width: '100vw', height: '100vh', backgroundImage: `url(${bg})`, overflowX: 'hidden' }}
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
        <ProfileTabs tabs={[{ name: 'Tab #1', href: '#1' }, { name: 'Tab #2', href: '#2' },{ name: 'Tab #3', href: '#3' }]} />
        <ChartsContainer>
          <Grid container spacing={2}>

          <Grid item md={8}>
          <ChartContainer title="Population" subtitle="People living there">

          </ChartContainer>
          </Grid>
          <Grid item md={4}>
          <ChartContainer title="Extension" subtitle="Surface in km2">

          </ChartContainer>
          </Grid>
          </Grid>
          <Grid container spacing={2}>

          <Grid item md={8}>
          <ChartContainer title="Age distribution" subtitle="">

          </ChartContainer>
          </Grid>
          <Grid item md={4}>
          <ChartContainer title="Median age" subtitle="Average age of the population (years old)">

          </ChartContainer>
          </Grid>
          </Grid>
        </ChartsContainer>
    </div>
  );
}

export default Profile;
