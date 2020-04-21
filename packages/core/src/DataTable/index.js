import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Box,
  ButtonBase,
} from "@material-ui/core";
import propTypes from "../propTypes";

import exportCSV from "./exportCSV";
import makeStyles from "../makeStyles";

const useStyles = makeStyles({
  dataTableRoot: {
    border: "1px solid rgba(224, 224, 224, 1)",
    borderTop: "none",
  },
  dataTableActionButton: {
    backgroundColor: "#f6f6f6",
    borderRadius: "10px",
    padding: "10px",
  },
  dataTableActionButtons: {
    "& > button:not(:first-child)": {
      marginLeft: "10px",
    },
  },
});

export default function DataTable({
  onHide,
  data: { tableTitle, dataLabelTitle, dataValueTitle, groupByTitle, rawData },
  ...props
}) {
  const classes = useStyles(props);
  const renderActions = () => (
    <Grid container className={classes.dataTableActionButtons}>
      <ButtonBase className={classes.dataTableActionButton} onClick={onHide}>
        Hide
      </ButtonBase>
      <ButtonBase
        className={classes.dataTableActionButton}
        onClick={() =>
          exportCSV(
            {
              groupBy: groupByTitle,
              x: dataLabelTitle,
              y: dataValueTitle,
            },
            rawData,
            tableTitle
          )
        }
      >
        Download CSV
      </ButtonBase>
    </Grid>
  );
  return (
    <Box borderRadius="0" clone>
      <Grid
        container
        direction="column"
        component={Paper}
        elevation="0"
        className={classes.dataTableRoot}
      >
        <Grid item>
          <Box padding="5px 15px" clone>
            <Grid container justify="space-between" alignItems="center">
              <Typography>
                Table:&nbsp;
                {tableTitle}
              </Typography>
              <Grid item>{renderActions()}</Grid>
            </Grid>
          </Box>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>#</TableCell>
              {groupByTitle !== undefined && (
                <TableCell>{groupByTitle || "Group"}</TableCell>
              )}
              <TableCell>{dataLabelTitle || "Label"}</TableCell>
              <TableCell>{dataValueTitle || "Value"}</TableCell>
            </TableHead>
            <TableBody>
              {rawData.map(({ groupBy, x, y }, i) => (
                <TableRow>
                  <TableCell>{i}</TableCell>
                  {groupBy !== undefined && <TableCell>{groupBy}</TableCell>}
                  <TableCell>{x}</TableCell>
                  <TableCell>{y}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <Grid item />
          </Table>
        </TableContainer>
        <Grid item>
          <Box padding="5px 15px" clone>
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>{renderActions()}</Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

DataTable.propTypes = {
  onHide: propTypes.func,
  data: propTypes.shape({
    tableTitle: propTypes.string,
    groupByTitle: propTypes.string,
    dataValueTitle: propTypes.string,
    dataLabelTitle: propTypes.string,
    rawData: propTypes.arrayOf(
      propTypes.shape({
        groupBy: propTypes.string,
        x: propTypes.string,
        y: propTypes.string,
      })
    ),
  }).isRequired,
};

DataTable.defaultProps = {
  onHide: () => {},
};
