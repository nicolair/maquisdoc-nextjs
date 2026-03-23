
import React from 'react';
import  fs  from 'fs';
//import { css } from "@emotion/react"
//import { graphql , Link} from "gatsby"
//import { rhythm } from "../../utils/typography"
import { Icons } from '@/components/icons';
//import Layout from "../../components/layout"
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import { getArticlesData } from "@/lib/api/journal_math";

//import IconeVueDePres from "/src/components/icones/iconevuedepres";
//import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

async function ListeNouveautePage(){
  //const articles = await getArticlesData();
  //const [page, setPage] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const data = {};
    data.maquis = {};
    data.maquis.documents = [
      {titre:'tagada', 
       date:'01/01/01',
       url:'urltagada', 
       _id:'idtagada'}
    ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>

        <Container maxWidth="md" sx={{mt: 3}}>
          <Typography component="h3" variant="h5">
            Modifications de documents: les {data.maquis.documents.length} plus récentes  
          </Typography>
          <Container maxWidth="md" sx={{ mb: 2 }}>
            <TableContainer >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6"> 
                        titre
                      </Typography>
                    </TableCell>
                    <TableCell>
                      lien vers pdf 
                    </TableCell>
                    <TableCell>
                      maquis 
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody typography="body1">
                  {data.maquis.documents
                    .map(({titre, date, url,_id},index)=>(
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body1">
                            {titre}
                          </Typography>
                          <Typography variant="body2">
                            {date.slice(0,10)}
                          </Typography>
                        </TableCell>
                        <TableCell> 
                          <a 
                            href= {url}
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            <Icons.DownloadPdf/> 
                          </a>
                        </TableCell>
                        <TableCell>
                          <Link 
                           to= {"/document_"+_id}
                          >
                            <Icons.VueDePres/> 
                         </Link>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer >
          </Container>
        </Container>
  </div>      
  )
}

export default ListeNouveautePage;

/*
export const query = graphql`
  query {
        allMarkdownRemark(
          filter: {frontmatter: {theme: {eq: "mathjournal"}}},
          sort: {frontmatter: {date: DESC}},
          limit: 5
        ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }

    maquis {
      documents(sort: {date: DESC}, limit: 25) {
        _id
        titre
        date
        url
      }
    }
  }
`
*/
