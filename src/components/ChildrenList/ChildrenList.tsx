import React, { ChangeEvent, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TablePagination } from '@mui/material';
import ChildrenData from './ChildrenData';
import { Box } from '@mui/system';
import { useFetchChildrenList } from '../../api';

const columns = ['Fullname', 'Birthday', 'Checked in', 'Last check-in time', 'Pickup time', 'Actions'];

export const ChildrenList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data } = useFetchChildrenList();


  const handlePageChange = (_: any, newPage: number) => {
    setPage(newPage);
  }

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => <TableCell key={column} align="left">{column}</TableCell>)}
            </TableRow>
          </TableHead>
          <ChildrenData data={data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length ?? 0}
      />
    </Box>
  );
}