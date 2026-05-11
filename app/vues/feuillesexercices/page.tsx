import { read } from "@/lib/api/neo4j";
import AfficheTable from "@/components/tableclient"

async function RenderListeFeuillesExos(){
  const query = `
    MATCH (p : Document { typeDoc : "liste exercices" })
    ORDER BY p.titre
    RETURN 
      p.titre AS denomination,
      p.uuid AS uuid,
      p.description AS description,
      p.url AS url
  `;
  const listcours = await read(query);
  //console.log(listpbs);
  
  const headrow = ["titre", "Télécharger pdf", "Voir de près"];
  
  return(
      <div> 
        <h3>
          Vue des {listcours.length} feuilles d'exercices en liste
        </h3>
        <AfficheTable datalist={listcours} headrow={headrow}/>
      </div>
  )
};

export default RenderListeFeuillesExos;
