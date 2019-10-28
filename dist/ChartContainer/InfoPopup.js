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
import { withStyles, createStyles } from '@material-ui/styles';
import { Button, Grid, Link, Typography, ClickAwayListener, Paper, Fade } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
var styles = function (_a) {
    var _b;
    var breakpoints = _a.breakpoints;
    return createStyles({
        root: (_b = {
                width: '100%',
                marginTop: '1rem'
            },
            _b[breakpoints.up('sm')] = {
                width: '20rem'
            },
            _b),
        paper: {},
        source: {
            padding: '1.25rem',
            width: '100%',
            borderBottom: '1px solid #c4c4c4'
        },
        explore: {
            margin: '1.25rem'
        }
    });
};
function InfoPopper(_a) {
    var children = _a.children, classes = _a.classes, onClose = _a.onClose, onExploreData = _a.onExploreData, open = _a.open, sourceLink = _a.sourceLink, sT = _a.sourceTitle, props = __rest(_a, ["children", "classes", "onClose", "onExploreData", "open", "sourceLink", "sourceTitle"]);
    var sourceTitle = sT || sourceLink;
    return (React.createElement(Popper, __assign({ open: open, className: classes.root, transition: true }, props), function (_a) {
        var TransitionProps = _a.TransitionProps;
        return (React.createElement(Fade, __assign({}, TransitionProps, { timeout: 350 }),
            React.createElement(Paper, { className: classes.paper },
                React.createElement(ClickAwayListener, { onClickAway: onClose },
                    React.createElement(Grid, { container: true, justify: "center" },
                        React.createElement(Typography, { className: classes.source },
                            'Sources: ',
                            React.createElement(Link, { href: sourceLink, target: "_blank", rel: "noopener noreferrer" }, sourceTitle)),
                        React.createElement(Button, { variant: "outlined", onClick: onExploreData, className: classes.explore }, children))))));
    }));
}
export default withStyles(styles)(InfoPopper);
