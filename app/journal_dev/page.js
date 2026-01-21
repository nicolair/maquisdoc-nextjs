import  fs  from 'fs';

import React from "react"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Link from '@mui/material/Link';

import { getArticlesData } from "@/lib/api/journal_dev";

async function Journal( ) {
  const articles = await getArticlesData();
  
  const TotalCount = articles.length;
  return (
          <Container maxWidth="md" sx={{mt: 3}}>
            <Typography component="h3" variant="h5">
              Journal : {TotalCount} articles 
            </Typography>
            {articles.map((node) => (
              <div key={node.id}>
                 <Typography component="h4" variant="h6" >
                    <Link href={node.slug }>
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
  )
}

export default Journal;
