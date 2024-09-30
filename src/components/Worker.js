import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Collapse, Box, Checkbox } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { tableCellClasses } from "@mui/material/TableCell";

const ExpandableRow = ({ row, level = 0, parentChecked, onCheckChange }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(parentChecked);
  const paddingLeft = level * 2;

  const handleCheckboxChange = (event) => {
    const newCheckedState = event.target.checked;
    setChecked(newCheckedState);
    onCheckChange(row, newCheckedState);
  };

  React.useEffect(() => {
    setChecked(parentChecked);
  }, [parentChecked]);

  return (
    <>
      <TableRow>
        <TableCell style={{ paddingLeft: `${paddingLeft}em` }}>
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          {row.name}
        </TableCell>
        <TableCell align="right">{row.rate}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">
          {(row.activities || row.workers) && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      {(row.activities || row.workers) && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small">
                  <TableBody>
                    {row.activities?.map((activity, index) => (
                      <ExpandableRow 
                        key={index} 
                        row={activity} 
                        level={level + 1} 
                        parentChecked={checked}
                        onCheckChange={(childRow, isChecked) => onCheckChange(childRow, isChecked, row)}
                      />
                    ))}
                    {row.workers?.map((worker, index) => (
                      <ExpandableRow 
                        key={index} 
                        row={worker} 
                        level={level + 1}
                        parentChecked={checked}
                        onCheckChange={(childRow, isChecked) => onCheckChange(childRow, isChecked, row)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default function SimpleTable() {
  const [rows, setRows] = useState([
    {
      name: 'Civil 1',
      rate: 567.80,
      total: '₹ 2,98,6792',
      activities: [
        {
          name: 'Activity 1',
          rate: 567.80,
          total: '₹ 2,98,6792',
          workers: [
            { name: 'Work Item 1', total: '₹ 2,98,6792' },
            { name: 'Work Item 2', total: '₹ 2,98,6792' },
            { name: 'Work Item 3', total: '₹ 2,98,6792' },
          ]
        },
        {
          name: 'Activity 27864987364289',
          rate: 567.80,
          total: '₹ 2,98,6792',
          workers: [
            { name: 'Work Item 1', total: '₹ 2,98,6792' },
            { name: 'Work Item 2', total: '₹ 2,98,6792' },
            { name: 'Work Item 3', total: '₹ 2,98,6792' },
          ]
        },
        {
          name: 'Activity 3',
          rate: 567.80,
          total: '₹ 2,98,6792',
        },
        {
          name: 'Activity 4',
          rate: 567.80,
          total: '₹ 2,98,6792',
        },
      ]
    },
    {
      name: 'Civil 4',
      rate: 567.80,
      total: '₹ 2,98,6792',
      activities: [
        {
          name: 'Activity 1',
          rate: 567.80,
          total: '₹ 2,98,6792',
          workers: [
            { name: 'Work Item 1', total: '₹ 2,98,6792' },
            { name: 'Work Item 2', total: '₹ 2,98,6792' },
            { name: 'Work Item 3', total: '₹ 2,98,6792' },
          ]
        },
        {
          name: 'Activity 27864987364289',
          rate: 567.80,
          total: '₹ 2,98,6792',
          workers: [
            { name: 'Work Item 1', total: '₹ 2,98,6792' },
            { name: 'Work Item 2', total: '₹ 2,98,6792' },
            { name: 'Work Item 3', total: '₹ 2,98,6792' },
          ]
        },
        {
          name: 'Activity 3',
          rate: 567.80,
          total: '₹ 2,98,6792',
        },
        {
          name: 'Activity 4',
          rate: 567.80,
          total: '₹ 2,98,6792',
        },
      ]
    },
    {
      name: 'Civil 2',
      rate: 567.80,
      total: '₹ 2,98,6792',
      activities: [
        {
          name: 'Activity 1',
          rate: 567.80,
          total: '₹ 2,98,6792',
          workers: [
            { name: 'Work Item 1', total: '₹ 2,98,6792' },
            { name: 'Work Item 2', total: '₹ 2,98,6792' },
            { name: 'Work Item 3', total: '₹ 2,98,6792' },
          ]
        },
        {
          name: 'Activity 27864987364289',
          rate: 567.80,
          total: '₹ 2,98,6792',
          workers: [
            { name: 'Work Item 1', total: '₹ 2,98,6792' },
            { name: 'Work Item 2', total: '₹ 2,98,6792' },
            { name: 'Work Item 3', total: '₹ 2,98,6792' },
          ]
        },
        {
          name: 'Activity 3',
          rate: 567.80,
          total: '₹ 2,98,6792',
        },
        {
          name: 'Activity 4',
          rate: 567.80,
          total: '₹ 2,98,6792',
        },
      ]
    },
  ]);

  const updateRowsRecursively = (rows, targetRow, isChecked, parentRow = null) => {
    return rows.map(row => {
      if (row === targetRow) {
        return { ...row, checked: isChecked };
      } else if (parentRow === targetRow) {
        return { ...row, checked: isChecked };
      } else if (row.activities || row.workers) {
        const updatedActivities = row.activities ? updateRowsRecursively(row.activities, targetRow, isChecked, parentRow) : row.activities;
        const updatedWorkers = row.workers ? updateRowsRecursively(row.workers, targetRow, isChecked, parentRow) : row.workers;
        return { ...row, activities: updatedActivities, workers: updatedWorkers };
      }
      return row;
    });
  };

  const handleCheckChange = (row, isChecked, parentRow = null) => {
    setRows(prevRows => updateRowsRecursively(prevRows, row, isChecked, parentRow));
  };

  return (
    <Paper sx={{ width: '100%', overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 ,[`& .${tableCellClasses.root}`]: {
      borderBottom: "none"
    }
}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Package</TableCell>
            <TableCell align="right" >Rate(in sqft)</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <ExpandableRow 
              key={index} 
              row={row} 
              parentChecked={false}
              onCheckChange={handleCheckChange}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}