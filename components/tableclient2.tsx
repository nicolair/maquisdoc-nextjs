'use client'

import React from 'react';
import Link from 'next/link';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';


import { Icons } from "@/components/icons";

// affiche une table à deux colonnes

function AfficheTable2({datalist,headrow}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <TableContainer component={Paper}>
    <Table  aria-label="simple table">
        <TableHead >
          <TableRow>
            {headrow.map((nomcol, index)=>(
                  <TableCell variant="head" key={index}>
                    {nomcol}
                  </TableCell>))
            }
          </TableRow>
        </TableHead>
        <TableBody typography="body1">
          {datalist
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({uuid, denomination},index)=>(
                   <TableRow key={index}>
                     <TableCell> 
                       <Typography variant="body1">
                            {denomination}
                       </Typography>
                     </TableCell>
                     <TableCell>
                          <Link 
                            href= {"/vuesproches/noeuds/" + uuid}
                          >
                            <Icons.VueDePres />
                          </Link>
                     </TableCell>
                   </TableRow>
                ))
          }
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={datalist.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
  );
}

export default AfficheTable2;


