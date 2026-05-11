import { read } from "@/lib/api/neo4j";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper"

import { Icons } from '@/components/icons';

async function RenderCoursPage({ params,}: { params: Promise<{ slug: string }>})
{
  const { slug } = await params;
  
  const queryloc = `
    WITH "${slug}" AS uuidloc
    MATCH (d : Document)
    WHERE d.uuid = uuidloc
    RETURN 
      d.titre AS titre,
      toString(d.date) AS date , 
      d.typeDoc AS typedoc,
      d.url AS url
    `;
  const queryconceptsfin = `
    WITH "${slug}" AS uuidloc
    MATCH (d : Document)-[r]->(c:Concept)
    WHERE d.uuid = uuidloc
    RETURN 
      c.litteral AS litteral,
      c.uuid AS uuid,
      type(r) AS typerel
    `;
  
  const values = await read(queryloc);
  const {titre, date, url} = values[0];
  const conceptsfin = await read(queryconceptsfin);

  //console.log(conceptsfin);
  
  return ( 
    <div> 
      <h3> 
        Vue de près d'un document de cours
      </h3>
      <Typography variant="body1">
        {titre}
      </Typography>
      <Typography variant="body2">
        {date.slice(0,10)}
      </Typography>
      <Container maxWidth="md" sx={{mt: 3, mb:3}}>
        <Paper sx={{mt: 3, mb:3, pt:1, pl:1}}>
            <object
                data={url}
                type="application/pdf"
                width="99%"
                height="300px"
                css="border-style: none"
            >
              le pdf manque ou le navigateur ne permet pas de l'afficher 
            </object>
        </Paper>
        
        {conceptsfin.map(({litteral, uuid, typerel}) => (
              <div key={uuid}>
                 <Typography component="h4" variant="h6" >
                   {typerel}
                   {litteral}
                   <Link href={"/vuesproches/concepts/" + uuid }> 
                     <Icons.VueDePres/>
                   </Link>
                 </Typography>  
              </div>
            ))}

      </Container>

    </div> )   
};


export default RenderCoursPage
