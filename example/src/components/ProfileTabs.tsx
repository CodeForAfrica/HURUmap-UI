import React, { useEffect, useState }  from 'react';

import { AppBar, Tabs, Tab } from '@material-ui/core';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: '#fff',
      scrollBehavior: 'smooth',
      paddingLeft: '1.875rem',
      paddingRight: '1.875rem',
      [theme.breakpoints.up('md')]: {
        paddingLeft: '3.125rem',
        paddingRight: '3.125rem'
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '9.375rem',
        paddingRight: '9.375rem'
      }
    },
    appbar: {
      boxShadow: 'none'
    },
    indicator: {
      height: '.25rem', // 4px / 16
      backgroundColor: '#7f9442'
    },
    tab: {
      height: '6.25rem', // 100px / 16
      fontFamily: theme.typography.subtitle1.fontFamily,
      fontSize: theme.typography.subtitle1.fontSize,
      textTransform: 'none',
      [theme.breakpoints.up('md')]: {
        minWidth: 0
      }
    },
    tabSelected: {
      fontWeight: 700
    },
    labelContainer: {
      paddingLeft: theme.spacing() * 2,
      paddingRight: theme.spacing() * 2
    }
  });

function LinkTab(props: any) {
  return <Tab component="a" {...props} />;
}

interface Props extends WithStyles<typeof styles>, WithWidth {
  tabs: { name: string; href: string }[];
  switchToTab?: (href: string) => void;
}

function ProfileTabs({ classes, width, tabs, switchToTab }: Props) {
  const [value, setValue] = useState();
  useEffect(() => {
    if (tabs.length) {
      const [{ href }] = tabs;
      setValue(href);
    }
  }, [tabs]);

  const handleChange = () => {
    setValue(value);
    if (switchToTab) {
      switchToTab(value);
    }
  };

  const centered = isWidthUp('md', width); // centered is only for md and up
  const variant = centered ? 'standard' : 'scrollable';

  return (
    <div className={classes.root}>
      <AppBar color="inherit" position="static" className={classes.appbar}>
        <Tabs
          value={value}
          variant={variant}
          scrollButtons="off" // Never show scroll buttons
          classes={{ indicator: classes.indicator }}
          onChange={handleChange}
        >
          {tabs.map(tab => (
            <LinkTab
              key={tab.href}
              value={tab.href}
              href="#dominionProfileTabs" // Always show the tabs on click
              label={tab.name}
              className={classes.tab}
              classes={{
                selected: classes.tabSelected,
                labelContainer: classes.labelContainer
              }}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}

export default withWidth()(withStyles(styles)(ProfileTabs));
