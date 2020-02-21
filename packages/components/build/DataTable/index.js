"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DataTable;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("../../propTypes"));

var _exportCSV = _interopRequireDefault(require("./exportCSV"));

var _makeStyles = _interopRequireDefault(require("../../../common/src/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  dataTableRoot: {
    border: '1px solid rgba(224, 224, 224, 1)',
    borderTop: 'none'
  },
  dataTableActionButton: {
    backgroundColor: '#f6f6f6',
    borderRadius: '10px',
    padding: '10px'
  },
  dataTableActionButtons: {
    '& > button:not(:first-child)': {
      marginLeft: '10px'
    }
  }
});

function DataTable(_ref) {
  var onHide = _ref.onHide,
      _ref$data = _ref.data,
      tableTitle = _ref$data.tableTitle,
      dataLabelTitle = _ref$data.dataLabelTitle,
      dataValueTitle = _ref$data.dataValueTitle,
      groupByTitle = _ref$data.groupByTitle,
      rawData = _ref$data.rawData,
      props = _objectWithoutProperties(_ref, ["onHide", "data"]);

  var classes = useStyles(props);

  var renderActions = function renderActions() {
    return _react.default.createElement(_core.Grid, {
      container: true,
      className: classes.dataTableActionButtons
    }, _react.default.createElement(_core.ButtonBase, {
      className: classes.dataTableActionButton,
      onClick: onHide
    }, "Hide"), _react.default.createElement(_core.ButtonBase, {
      className: classes.dataTableActionButton,
      onClick: function onClick() {
        return (0, _exportCSV.default)({
          groupBy: groupByTitle,
          x: dataLabelTitle,
          y: dataValueTitle
        }, rawData, tableTitle);
      }
    }, "Download CSV"));
  };

  return _react.default.createElement(_core.Box, {
    borderRadius: "0",
    clone: true
  }, _react.default.createElement(_core.Grid, {
    container: true,
    direction: "column",
    component: _core.Paper,
    elevation: "0",
    className: classes.dataTableRoot
  }, _react.default.createElement(_core.Grid, {
    item: true
  }, _react.default.createElement(_core.Box, {
    padding: "5px 15px",
    clone: true
  }, _react.default.createElement(_core.Grid, {
    container: true,
    justify: "space-between",
    alignItems: "center"
  }, _react.default.createElement(_core.Typography, null, "Table:\xA0", tableTitle), _react.default.createElement(_core.Grid, {
    item: true
  }, renderActions())))), _react.default.createElement(_core.TableContainer, null, _react.default.createElement(_core.Table, null, _react.default.createElement(_core.TableHead, null, _react.default.createElement(_core.TableCell, null, "#"), groupByTitle !== undefined && _react.default.createElement(_core.TableCell, null, groupByTitle || 'Group'), _react.default.createElement(_core.TableCell, null, dataLabelTitle || 'Label'), _react.default.createElement(_core.TableCell, null, dataValueTitle || 'Value')), _react.default.createElement(_core.TableBody, null, rawData.map(function (_ref2, i) {
    var groupBy = _ref2.groupBy,
        x = _ref2.x,
        y = _ref2.y;
    return _react.default.createElement(_core.TableRow, null, _react.default.createElement(_core.TableCell, null, i), groupBy !== undefined && _react.default.createElement(_core.TableCell, null, groupBy), _react.default.createElement(_core.TableCell, null, x), _react.default.createElement(_core.TableCell, null, y));
  })), _react.default.createElement(_core.Grid, {
    item: true
  }))), _react.default.createElement(_core.Grid, {
    item: true
  }, _react.default.createElement(_core.Box, {
    padding: "5px 15px",
    clone: true
  }, _react.default.createElement(_core.Grid, {
    container: true,
    justify: "flex-end",
    alignItems: "center"
  }, _react.default.createElement(_core.Grid, {
    item: true
  }, renderActions()))))));
}

DataTable.propTypes = {
  onHide: _propTypes.default.func,
  data: _propTypes.default.shape({
    tableTitle: _propTypes.default.string,
    groupByTitle: _propTypes.default.string,
    dataValueTitle: _propTypes.default.string,
    dataLabelTitle: _propTypes.default.string,
    rawData: _propTypes.default.arrayOf(_propTypes.default.shape({
      groupBy: _propTypes.default.string,
      x: _propTypes.default.string,
      y: _propTypes.default.string
    }))
  }).isRequired
};
DataTable.defaultProps = {
  onHide: function onHide() {}
};