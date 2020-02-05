import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Button,
  Typography,
  TableContainer,
  Paper,
  Box
} from '@material-ui/core';
import propTypes from '../propTypes';

import exportCSV from './exportCSV';

export default function DataTable({
  data: { tableTitle, dataLabelTitle, dataValueTitle, groupByTitle, rawData }
}) {
  return (
    <Box borderRadius="0" clone>
      <Grid container direction="column" component={Paper} elevation="0">
        <Grid item>
          <Box padding="5px 15px" clone>
            <Grid container justify="space-between" alignItems="center">
              <Typography>
                Table:&nbsp;
                {tableTitle}
              </Typography>
              <Button
                onClick={() =>
                  exportCSV(
                    {
                      groupBy: groupByTitle,
                      x: dataLabelTitle,
                      y: dataValueTitle
                    },
                    rawData,
                    tableTitle
                  )
                }
              >
                Download CSV
              </Button>
            </Grid>
          </Box>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>#</TableCell>
              {groupByTitle !== undefined && (
                <TableCell>{groupByTitle || 'Group'}</TableCell>
              )}
              <TableCell>{dataLabelTitle || 'Label'}</TableCell>
              <TableCell>{dataValueTitle || 'Value'}</TableCell>
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
      </Grid>
    </Box>
  );
}

DataTable.propTypes = {
  data: propTypes.shape({
    tableTitle: propTypes.string,
    groupByTitle: propTypes.string,
    dataValueTitle: propTypes.string,
    dataLabelTitle: propTypes.string,
    rawData: propTypes.arrayOf(
      propTypes.shape({
        groupBy: propTypes.string,
        x: propTypes.string,
        y: propTypes.string
      })
    )
  }).isRequired
};
