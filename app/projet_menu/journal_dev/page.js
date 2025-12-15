import  fs  from 'fs';

import React from "react"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Link from '@mui/material/Link';

import { getArticlesData } from "@/lib/api/journal_dev";

async function Journal( {params} ) {
  const articles = await getArticlesData();
  //var files = fs.readdirSync(path);
  
  //var articles = files.map( getArticle);
  //articles.sort(compare);
  //console.log(Articles)
  const TotalCount = articles.length;
  return (
          <Container maxWidth="md" sx={{mt: 3}}>
            <Typography component="h3" variant="h5">
              Journal : {TotalCount} articles 
            </Typography>
            {articles.map((node) => (
              <div key={node.id}>
                <Link
                  href={node.slug}
                  css={`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <Typography component="h4" variant="h6"
                      css={`
                        color: darkgreen;
                      `}
                  >
                    {node.titre}{" "}
                  
                    <span
                        css={`
                          color: "#555"
                          font-size: smaller`}
                    >
                      — {node.date}
                    </span>
                  </Typography>
                  <Container maxWidth="md">
                    <Typography component="body1" variant="body2">
                      {node.excerpt}
                    </Typography>
                  </Container>
                </Link>
              </div>
            ))}
          </Container>
  )
}

export default Journal;
