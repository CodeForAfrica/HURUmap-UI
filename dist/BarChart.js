var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import { VictoryBar, VictoryGroup, VictoryAxis } from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';
import WrapLabel from './WrapLabel';
import Chart from './Chart';
function BarChart(_a) {
    var theme = _a.theme, data = _a.data, _b = _a.barWidth, barWidth = _b === void 0 ? 40 : _b, _c = _a.groupSpacing, groupSpacing = _c === void 0 ? 30 : _c, _d = _a.barSpacing, barSpacing = _d === void 0 ? 5 : _d, horizontal = _a.horizontal, width = _a.width, height = _a.height, _e = _a.responsive, responsive = _e === void 0 ? false : _e, axisProps = _a.axisProps, dependantAxisProps = _a.dependantAxisProps, props = __rest(_a, ["theme", "data", "barWidth", "groupSpacing", "barSpacing", "horizontal", "width", "height", "responsive", "axisProps", "dependantAxisProps"]);
    // This space is the sides of the chart, outside the data
    // The axis is rendered in this space
    var dataMargin = 95;
    var groupCount = 1;
    var barCount = data.length;
    var plotData = [data];
    var isGrouped = Boolean(data[0].data);
    if (isGrouped) {
        var dataFields = data[0].data.map(function (d) { return d.x; });
        groupCount = data.length;
        barCount = dataFields.length * groupCount;
        // Inverse the data provided
        // Victory group expects the fields to group as root
        plotData = dataFields.map(function (field) {
            return data.map(function (x) {
                var d = x.data.find(function (y) { return y.x === field; });
                return { x: x.label, y: d ? d.y : 0 };
            });
        });
    }
    var calculatedDimmension = (barWidth + barSpacing) * barCount +
        groupSpacing * (groupCount - 1) +
        dataMargin;
    return (React.createElement(Chart, { theme: theme, padding: horizontal ? { left: barWidth + 5, bottom: 50, right: 50 } : undefined, responsive: responsive, horizontal: horizontal, width: horizontal ? width : calculatedDimmension, height: !horizontal ? height : calculatedDimmension, 
        // The bar chart would always overflow by half the width plus some pixels
        domainPadding: { x: barWidth / 2 + 5 } },
        isGrouped ? (React.createElement(VictoryGroup, { offset: barWidth + barSpacing }, plotData.map(function (d) { return (React.createElement(VictoryBar, __assign({ data: d, barWidth: barWidth }, props))); }))) : (plotData.map(function (d) { return (React.createElement(VictoryBar, __assign({ data: d, barWidth: barWidth }, props))); })),
        React.createElement(VictoryAxis, __assign({ tickLabelComponent: React.createElement(WrapLabel, { width: barWidth * groupCount }) }, Object.assign({
            style: {
                tickLabels: {
                    display: 'block'
                }
            }
        }, axisProps))),
        React.createElement(VictoryAxis, __assign({ dependentAxis: true }, dependantAxisProps))));
}
export default withVictoryTheme(BarChart);
