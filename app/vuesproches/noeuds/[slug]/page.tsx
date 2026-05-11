import { read } from "@/lib/api/neo4j";

import NodeCloseView from "@/components/nodecloseview"

async function RenderNoeudPage({ params,}: { params: Promise<{ slug: string }>})
{
  const { slug } = await params;
  
  const queryloc = `
    WITH "${slug}" AS uuidloc
    MATCH (n)
    WHERE n.uuid = uuidloc
    RETURN 
      labels(n) AS labels,
      properties(n) AS props
  `;
  const queryrelsfin = `
    WITH "${slug}" AS uuidloc
    MATCH (n)-[r]->(nfin)
    WHERE n.uuid = uuidloc
    RETURN 
      type(r) AS typerel,
      properties(nfin) AS propsfin,
      labels(nfin)[0] AS labelfin
    `;
  
  const queryrelsdeb = `
    WITH "${slug}" AS uuidloc
    MATCH (ndeb) -[r]->(n)
    WHERE n.uuid = uuidloc
    RETURN 
      type(r) AS typerel,
      properties(ndeb) AS propsdeb,
      labels(ndeb)[0] AS labeldeb
    `;
    
    
  const values = await read(queryloc);
  const valuesdeb = await read(queryrelsdeb);
  const valuesfin = await read(queryrelsfin);
  const context = {};
  context['typenoeud'] = values[0]['labels'][0];
  context['props'] = values[0]['props'];
  context['relsfin'] = valuesfin;
  context['relsdeb'] = valuesdeb;
  //console.log(values);
  
  return ( 
    <div>
      <NodeCloseView context={context}/> 
    </div>
  )   
};


export default RenderNoeudPage
