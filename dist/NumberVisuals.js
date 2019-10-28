function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
var useStyles = makeStyles(function () {
  return {
    root: {
      width: '100%',
      height: 'auto',
      margin: '1rem'
    },
    hidden: {
      display: 'none'
    },
    mainStatistic: {
      marginTop: '1em'
    },
    statistic: {
      fontSize: '2.5em'
    },
    statisticDeviation: {
      fontSize: '0.4em',
      color: '#777',
      display: 'inlineBlock'
    },
    secondaryDeviation: {
      fontSize: '1em',
      color: '#777'
    },
    subtitle: {
      fontSize: '1.25em'
    },
    description: {
      fontSize: '1.5em'
    },
    comparison: {
      fontWeight: 'bold'
    },
    list: {
      padding: 0
    },
    listParent: {
      paddingLeft: 0,
      paddingRight: 0
    },
    listTypography: {
      fontSize: '0.9em',
      lineHeight: 1.3,
      color: '#777'
    }
  };
});

function NumberVisuals(_ref) {
  var subtitle = _ref.subtitle,
      statistic = _ref.statistic,
      statisticDeviation = _ref.statisticDeviation,
      secondaryDeviation = _ref.secondaryDeviation,
      description = _ref.description,
      comparisonData = _ref.comparisonData;
  var classes = useStyles();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      onHover = _useState2[0],
      setOnHover = _useState2[1];

  var toggleHover = function toggleHover() {
    return setOnHover(!onHover);
  };

  return React.createElement("div", {
    className: classes.root
  }, React.createElement(Typography, {
    className: classes.subtitle
  }, subtitle), React.createElement("div", {
    className: classes.mainStatistic
  }, React.createElement(Typography, {
    className: classes.statistic,
    onMouseEnter: toggleHover,
    onMouseLeave: toggleHover
  }, " ", statistic, React.createElement("span", {
    className: !onHover ? classes.hidden : classes.statisticDeviation
  }, ' ', statisticDeviation)), React.createElement(Typography, {
    className: !onHover ? classes.hidden : classes.secondaryDeviation
  }, ' ', secondaryDeviation)), React.createElement(Typography, {
    className: classes.description
  }, description), React.createElement(List, {
    className: classes.list
  }, comparisonData.map(function (d) {
    return React.createElement(ListItem, {
      className: classes.listParent
    }, React.createElement(ListItemText, {
      primary: React.createElement(Typography, {
        className: classes.listTypography
      }, React.createElement("span", {
        className: classes.comparison
      }, " ", d.parentComparison), React.createElement("span", null, " ", d.parentDescription), React.createElement("span", {
        className: !onHover ? classes.hidden : classes.secondaryDeviation
      }, " ", d.parentDeviation))
    }));
  })));
}

NumberVisuals.propTypes = {
  subtitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  statistic: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  statisticDeviation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondaryDeviation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  description: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  comparisonData: PropTypes.arrayOf(PropTypes.shape({}))
};
NumberVisuals.defaultProps = {
  subtitle: undefined,
  statistic: undefined,
  statisticDeviation: undefined,
  secondaryDeviation: undefined,
  description: undefined,
  comparisonData: undefined
};
export default NumberVisuals;