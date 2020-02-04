import React from 'react';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Button,
  Typography
} from '@material-ui/core';
import propTypes from '../propTypes';

import exportCSV from './exportCSV';

export default function DataTable({
  data: { tableTitle, dataLabelTitle, dataValueTitle, groupByTitle, rawData }
}) {
  return (
    <Grid container direction="column">
      <Grid item>
        <Box padding="10px 20px" bgcolor="#fdf9f2" clone>
          <Grid container justify="space-between" alignItems="center">
            <Typography>
              Raw Data:&nbsp;
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
      <Table>
        <Box padding="0 20px" bgcolor="#fffaf0" clone>
          <TableHead>
            <TableCell>#</TableCell>
            {groupByTitle !== undefined && (
              <TableCell>{groupByTitle || 'Group'}</TableCell>
            )}
            <TableCell>{dataLabelTitle || 'Label'}</TableCell>
            <TableCell>{dataValueTitle || 'Value'}</TableCell>
          </TableHead>
        </Box>
        <TableBody>
          {rawData.map(({ groupBy, x, y }, i) => (
            <Box bgcolor={i % 2 ? '#fffaf0' : '#fdf9f2'} clone>
              <TableRow>
                <TableCell>{i}</TableCell>
                {groupBy !== undefined && <TableCell>{groupBy}</TableCell>}
                <TableCell>{x}</TableCell>
                <TableCell>{y}</TableCell>
              </TableRow>
            </Box>
          ))}
        </TableBody>
        <Grid item />
      </Table>
    </Grid>
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
