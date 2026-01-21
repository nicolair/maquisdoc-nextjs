
import React from "react";
import  fs  from 'fs';
//import { css } from "@emotion/react"
//import { graphql , Link} from "gatsby"
//import { rhythm } from "../../utils/typography"

//import Layout from "../../components/layout"

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
/*import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';*/

import { getArticlesData } from "@/lib/api/journal_math";

//import IconeVueDePres from "/src/components/icones/iconevuedepres";
//import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

async function ListeJournalMath(){
  const articles = await getArticlesData();
  const TotalCount = articles.length;
  //console.log(articles);
  
  return (
    <div>
          <Container maxWidth="md" sx={{mt: 3}}>
            <Typography component="h3" variant="h5">
              Les {TotalCount} articles du journal mathématique.
            </Typography>
            {articles.map((node) => (
              <div key={node.id} >
                <Typography component="h4" variant="h6">
                   <Link href={node.slug}>
                     {node.titre}{" "}
                   </Link>
                   <span className="pluspetit">
                        — {node.date}
                   </span>
                  </Typography>
                  <Container maxWidth="md">
                    <Typography component="body1" variant="body2">
                      {node.excerpt}
                    </Typography>
                  </Container>
                
              </div>
            ))}
          </Container>
    </div>
  )
}

export default ListeJournalMath;
