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
import { ClickAwayListener, Fade, Paper, Typography, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
var styles = function (_a) {
    var _b;
    var breakpoints = _a.breakpoints;
    return createStyles({
        root: (_b = {
                width: '100%',
                marginTop: '1rem'
            },
            _b[breakpoints.up('md')] = {
                width: '22rem'
            },
            _b),
        paper: {},
        code: {
            borderRadius: '0.25rem',
            border: '1px solid gray',
            overflow: 'auto'
        }
    });
};
function EmbedPopup(_a) {
    var children = _a.children, classes = _a.classes, onClose = _a.onClose, open = _a.open, subtitle = _a.subtitle, title = _a.title, props = __rest(_a, ["children", "classes", "onClose", "open", "subtitle", "title"]);
    return (React.createElement(Popper, __assign({ open: open, className: classes.root, transition: true }, props), function (_a) {
        var TransitionProps = _a.TransitionProps;
        return (React.createElement(Fade, __assign({}, TransitionProps, { timeout: 350 }),
            React.createElement(Paper, { className: classes.paper },
                React.createElement(ClickAwayListener, { onClickAway: onClose },
                    React.createElement("div", null,
                        React.createElement(DialogTitle, null, title),
                        React.createElement(DialogContent, null,
                            React.createElement(DialogContentText, null, subtitle),
                            React.createElement(Typography, { variant: "caption", component: "code" },
                                React.createElement("pre", { className: classes.code }, children))))))));
    }));
}
export default withStyles(styles)(EmbedPopup);
