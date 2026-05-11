import { read } from "@/lib/api/neo4j";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper"

import { Icons } from '@/components/icons';

async function RenderConceptPage({ params,}: { params: Promise<{ slug: string }>})
{
  const { slug } = await params;
  
  const queryloc = `
    WITH "${slug}" AS uuidloc
    MATCH (c : Concept)
    WHERE c.uuid = uuidloc
    RETURN 
      c.litteral AS litteral,
      c.typeDoc AS typedoc,
      c.uuid AS uuid
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
  
  const querydocsdebut = `
    WITH "${slug}" AS uuidloc
    MATCH (d : Document)-[r]->(c:Concept)
    WHERE c.uuid = uuidloc
    RETURN 
      d.titre AS titre,
      d.uuid AS uuid,
      type(r) AS typerel
    `;
    
    
  const values = await read(queryloc);
  const {litteral, uuid, typerel} = values[0];
  const conceptsfin = await read(queryconceptsfin);
  const docsdebut = await read(querydocsdebut);

  console.log(docsdebut);
  
  return ( 
    <div> 
      <h3> 
        Vue de près d'un concept
      </h3>
      <Typography variant="body1">
        {litteral}
      </Typography>
      <Container maxWidth="md" sx={{mt: 3, mb:3}}>        
        {conceptsfin.map(({litteral, uuid, typerel}) => (
              <div key={uuid}>
                 <Typography component="h4" variant="h6" >
                   {typerel}
                   <Link href={uuid }> </Link>
                   {litteral}  
                 </Typography>  
              </div>
            ))}

            {conceptsfin.map(({litteral, uuid, typerel}) => (
              <div key={uuid}>
                 <Typography component="h4" variant="h6" >
                   {typerel}
                   <Link href={uuid }> </Link>
                   {litteral}  
                 </Typography>  
              </div>
            ))}

            {docsdebut.map(({titre, uuid, typerel}) => (
              <div key={uuid}>
                 <Typography component="h4" variant="h6" >
                   {typerel}
                   <Link href={"/vuesproches/cours/" + uuid }> 
                     <Icons.VueDePres/>
                   </Link>
                   {titre}  
                 </Typography>  
              </div>
            ))}

      </Container>

    </div> )   
};


export default RenderConceptPage
