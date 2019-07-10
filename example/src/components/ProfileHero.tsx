import React from 'react';

import { Typography } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Hero, { HeroTitle, HeroTitleGrid, HeroDetail } from './Hero';
// import createAPI from '../../api';

// import Search from '../Search';
// import ReleaseDropdown from '../ReleaseDropdown';
// import searchIcon from '../../assets/images/icons/location.svg';
import { Theme } from '@material-ui/core';
import { WithStyles } from '@material-ui/core';
import { Profile } from '../lib/hurumap-dto';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    map: {
      position: 'relative',
      height: '250px',
      left: 'unset',
      top: 'unset',
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        right: '50px',
        width: '50%',
        height: '460px',
        maxHeight: '460px',
        maxWidth: '829px'
      },
      [theme.breakpoints.up('lg')]: {
        right: '9.375rem'
      }
    },
    h2hMap: {
      order: 1,
      height: '270px'
    },
    caption: {
      color: '#8d8d8c',
      fontSize: '0.75em',
      textTransform: 'capitalize',
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing()
    },
    captionItem: {
      display: 'inline-block'
    },
    release: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        color: '#8d8d8c',
        fontSize: '0.688em',
        position: 'absolute',
        bottom: '22%',
        display: 'inline-block',
        right: '4%'
      },
      [theme.breakpoints.up('lg')]: {
        right: '9.375rem'
      }
    },
    h2hRelease: {
      display: 'inline-block'
    }
  });

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  head2head?: boolean;
  geoLevel: string;
  geoCode: string;
  profile: Profile;
}

function ProfileHero({
  classes,
  head2head,
  geoLevel,
  geoCode,
  profile,
  children
}: Props) {
  const {
    // demographics,
    primary_releases: primaryReleases,
    geography
  } = profile;
  let population = 0;
  // if (demographics.total_population && demographics.total_population.values) {
  //   population = demographics.total_population.values.this.toFixed(0);
  // }
  let populationDensity = 0;
  // if (
  //   demographics.population_density &&
  //   demographics.population_density.values
  // ) {
  //   populationDensity = demographics.population_density.values.this.toFixed(1);
  // }
  const { active: activeRelease } = primaryReleases;
  const { parents: parentLinks } = geography;
  const { square_kms: squarekmsStr } = geography.this;
  let squarekms: string | number = squarekmsStr;
  if (!Number.isNaN(squarekms)) {
    if (squarekms < 1.0) {
      squarekms = squarekms.toFixed(3);
    } else {
      squarekms = squarekms.toFixed(1);
    }
  }
  const { short_name: profileName } = geography.this;

  return (
    <Hero>
      <HeroTitleGrid quater head2head={head2head}>
        <HeroTitle breakWord small>
          {profileName}
        </HeroTitle>
        <Typography variant="body2" className={classes.caption} component="p">
          {geoLevel}{' '}
          {parentLinks ? (
            <Typography variant="body1" className={classes.captionItem}>
              in{' '}
              {Object.values(parentLinks)
                .map(item => (
                  <span>
                    <a href={`/profiles/${item.full_geoid}`}>
                      {item.name}
                    </a>
                    {', '}
                  </span>
                ))}
            </Typography>
          ) : null}
        </Typography>
        {population && <HeroDetail label="Population">{population}</HeroDetail>}
        {squarekms && (
          <HeroDetail small label="square kilometers">
            {squarekms}
          </HeroDetail>
        )}
        {populationDensity && (
          <HeroDetail small label="people per square kilometer">
            {populationDensity}
          </HeroDetail>
        )}
        {/* {!head2head && (
            <Search
              dominion={dominion}
              isComparisonSearch
              placeholder="Compare this with"
              thisGeoId={`${geoLevel}-${geoCode}`}
              icon={searchIcon}
            />
          )} */}
      </HeroTitleGrid>

      {/* MAP */}
      <div className={classNames(classes.map, { [classes.h2hMap]: head2head })}>
        {children}
      </div>

      {activeRelease && (
        <Typography
          variant="body2"
          className={classNames(classes.release, {
            [classes.h2hRelease]: head2head
          })}
          component="div"
        >
          {activeRelease.citation}
          {/* <ReleaseDropdown primaryReleases={primaryReleases} fromHero /> */}
        </Typography>
      )}
    </Hero>
  );
}

export default withStyles(styles)(ProfileHero);
