
import React from "react";
import  fs  from 'fs';

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';

import { getArticlesData } from "@/lib/api/journal_math";

async function ListeJournalMath(){
  const articles = await getArticlesData();
  const TotalCount = articles.length;
  //console.log(articles);
  
  return (
    <div>
          <Container maxWidth="md" sx={{mt: 3}}>
            <h3>
              Les {TotalCount} articles du journal mathématique.
            </h3>
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
