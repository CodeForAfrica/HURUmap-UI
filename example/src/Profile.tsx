import React from 'react';

import { MapIt, PieChart, GroupedBarChart } from 'hurumap-ui';
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
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${bg})`,
        overflowX: 'hidden'
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
      <ProfileTabs
        tabs={[
          { name: 'Tab #1', href: '#1' },
          { name: 'Tab #2', href: '#2' },
          { name: 'Tab #3', href: '#3' }
        ]}
      />
      <ChartsContainer>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <ChartContainer title="Population" subtitle="People living there">
              <GroupedBarChart
              width="100%"
              height="200px"
              dataUnit="%"
                data={[
                  {
                    x: 'Slept under any net last night',
                    data: [
                      { x: 'Male', y: 49 },
                      { x: 'Female', y: 51 }
                    ]
                  }
                ]}
              />
            </ChartContainer>
          </Grid>
          <Grid item md={4}>
            <ChartContainer title="Extension" subtitle="Surface in km2">
              <GroupedBarChart
              width="100%"
              height="200px"
              horizontal
              dataUnit="%"
                data={[
                  {
                    x: 'Slept under any net last night',
                    data: [
                      { x: '17', y: 50 },
                      { x: '25', y: 40 }
                    ]
                  }
                ]}
              />
            </ChartContainer>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <ChartContainer title="Age distribution" subtitle="">
              <GroupedBarChart
              width="100%"
              height="200px"
              dataUnit="%"
                data={[
                  {
                    x: 'Slept under any net last night',
                    data: [
                      { x: '0-9', y: 40 },
                      { x: '10-19', y: 20 },
                      { x: '20-29', y: 10 },
                      { x: '30-39', y: 5 },
                      { x: '40-49', y: 5 },
                      { x: '50-59', y: 10 },
                      { x: '60-69', y: 10 },
                      { x: '70-79', y: 0 },
                      { x: '80+', y: 0 }
                    ]
                  }
                ]}
              />
            </ChartContainer>
          </Grid>
          <Grid item md={4}>
            <ChartContainer
              title="Median age"
              subtitle="Average age of the population (years old)"
            >
              <GroupedBarChart
              width="100%"
              height="200px"
              horizontal
              dataUnit="%"
                data={[
                  {
                    x: 'Slept under any net last night',
                    data: [
                      { x: '17', y: 50 },
                      { x: '25', y: 40 }
                    ]
                  }
                ]}
              />
            </ChartContainer>
          </Grid>
        </Grid>
      </ChartsContainer>
    </div>
  );
}

export default Profile;
