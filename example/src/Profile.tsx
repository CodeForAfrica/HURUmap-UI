import React, { useState, useEffect } from 'react';

import { MapIt, GroupedBarChart } from 'hurumap-ui';
import { RouteComponentProps } from '@reach/router';

import bg from './assets/images/background.png';
import ProfileHero from './components/ProfileHero';
import ProfileTabs from './components/ProfileTabs';
import ChartsContainer from './components/ChartsContainer';
import ChartContainer from './components/ChartContainer';
import { Grid } from '@material-ui/core';
import { getProfile } from './lib/api';
import ChartFactory from './components/ChartFactory';
import { Profile } from './lib/hurumap-dto';

interface Props extends RouteComponentProps {
  geoId?: string;
}

function ProfilePage({ geoId, navigate }: Props) {
  const [profile, setProfile] = useState<Profile>();
  let geoLevel = 'country';
  let geoCode = 'ZA';
  if (geoId) {
    const parts = geoId.split('-');
    geoLevel = parts[0];
    geoCode = parts[1];
  }

  useEffect(() => {
    if (geoId) {
      getProfile(geoId).then(setProfile);
    }
  }, [geoId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${bg})`,
        overflowX: 'hidden'
      }}
    >
      <ProfileHero geoCode={geoCode} geoLevel={geoLevel} profile={profile}>
        <MapIt
          drawChildren
          drawProfile={Boolean(geoId)}
          codeType="AFR"
          geoLevel={geoLevel}
          geoCode={geoCode}
          filterCountries={['KE', 'ZA']}
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
        {Object.values(profile.charts).map(chart => (
          <Grid container spacing={2}>
            <Grid item md={8}>
              <ChartContainer title={chart.title} subtitle={chart.section}>
                {ChartFactory.build(chart)}
              </ChartContainer>
            </Grid>
            <Grid item md={4}>
              <ChartContainer title="Median" subtitle="">
                <GroupedBarChart
                  horizontal
                  barWidth={10}
                  dataUnit="%"
                  data={[
                    {
                      x: '',
                      data: [{ x: '17', y: 50 }, { x: '25', y: 40 }]
                    }
                  ]}
                />
              </ChartContainer>
            </Grid>
          </Grid>
        ))}
      </ChartsContainer>
    </div>
  );
}

export default ProfilePage;
