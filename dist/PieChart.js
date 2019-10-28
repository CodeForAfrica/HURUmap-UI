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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React from 'react';
import { Helpers, VictoryPie } from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';
import CustomContainer from './CustomContainer';
var DEFAULT_DONUT_INNER_RADIUS = 75; // in degrees
var computeRadii = function (width, height, padding, groupSpacing) {
    if (groupSpacing === void 0) { groupSpacing = 0; }
    var radius = Helpers.getRadius({ width: width, height: height, padding: padding });
    return [radius - groupSpacing / 2];
};
function PieChart(_a) {
    var _b;
    var colorScale = _a.colorScale, data = _a.data, donut = _a.donut, groupSpacing = _a.groupSpacing, suggestedInnerRadius = _a.innerRadius, padding = _a.padding, radius = _a.radius, radii = _a.radii, _c = _a.standalone, standalone = _c === void 0 ? true : _c, theme = _a.theme, height = _a.height, width = _a.width, props = __rest(_a, ["colorScale", "data", "donut", "groupSpacing", "innerRadius", "padding", "radius", "radii", "standalone", "theme", "height", "width"]);
    if (!theme || !data) {
        return null;
    }
    var chart = theme.pie;
    if (!chart) {
        return null;
    }
    // If colorScale is null, the one from theme will be used.
    var colorScale1 = colorScale;
    var colorScale2 = colorScale;
    if (radii && colorScale && colorScale.length > 1) {
        colorScale2 = colorScale.slice(1);
    }
    var startAngle1 = 0;
    var endAngle1 = 360; // Full circle
    var startAngle2 = 0;
    var endAngle2 = 180; // Half circle clockwise
    var data1 = data;
    var data2;
    if (data.length > 1 && Array.isArray(data[0])) {
        endAngle1 = -180; // Half circle, counter-clockwise
        _b = __read(data, 2), data1 = _b[0], data2 = _b[1]; // Assume data[2] is also Array
    }
    var innerRadius = 0;
    if (donut || chart.donut) {
        innerRadius =
            suggestedInnerRadius && suggestedInnerRadius > 0
                ? suggestedInnerRadius
                : DEFAULT_DONUT_INNER_RADIUS;
    }
    // Only include groupSpacing if in comparison mode
    var computedGroupSpacing = data2 ? groupSpacing || chart.groupSpacing : 0;
    var computedRadii = radii ||
        (radius
            ? [radius]
            : computeRadii(width || chart.width, height || chart.height, padding || chart.padding, computedGroupSpacing));
    return (React.createElement(CustomContainer, { standalone: standalone, height: height || chart.height, width: width || chart.height },
        React.createElement(VictoryPie, __assign({ standalone: false, groupComponent: React.createElement("g", { role: "presentation", transform: "translate(" + -computedGroupSpacing / 2 + ", 0)" }), colorScale: colorScale1, data: data1, endAngle: endAngle1, innerRadius: innerRadius, radius: computedRadii[0], startAngle: startAngle1, theme: theme, height: height, width: width }, props)),
        data2 && data2.length > 0 && (React.createElement(VictoryPie, __assign({ standalone: false, colorScale: colorScale2, data: data2, endAngle: endAngle2, groupComponent: React.createElement("g", { role: "presentation", transform: "translate(" + computedGroupSpacing / 2 + ", 0)" }), innerRadius: innerRadius, radius: computedRadii[1 % computedRadii.length], startAngle: startAngle2, theme: theme, height: height, width: width }, props)))));
}
export default withVictoryTheme(PieChart);
