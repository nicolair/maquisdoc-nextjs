import { read } from "@/lib/api/neo4j";
import AfficheTable from "@/components/tableclient"

async function RenderListeProblemes(){
  const querypbs = `
    MATCH (p : Document { typeDoc : "problème" })
    ORDER BY p.titre
    RETURN 
      p.titre AS titre,
      p.uuid AS uuid,
      p.description AS denomination,
      p.url AS url
  `;
  const listpbs = await read(querypbs);
  //console.log(listpbs);
  
  const headrow = ["Description", "Télécharger pdf", "Voir de près"];
  
  return(
      <div> 
        <h3>
          Vue des {listpbs.length} problèmes en liste 
        </h3>
        <AfficheTable datalist={listpbs} headrow={headrow}/>
      </div>
  )
};

export default RenderListeProblemes;
