import { read } from "@/lib/api/neo4j";
import AfficheTable2 from "@/components/tableclient2"

async function RenderListeConcepts(){
  const query = `
    MATCH (p : Concept)
    ORDER BY p.litteral
    RETURN 
      p.litteral AS denomination,
      p.uuid AS uuid
  `;
  const listconcepts = await read(query);
  console.log(listconcepts);
  
  const headrow = ["Litteral", "Voir de près"];
  
  return(
      <div> 
        <h3>
          Vue des {listconcepts.length} concepts en liste 
        </h3>
        <AfficheTable2 datalist={listconcepts} headrow={headrow}/>
      </div>
  )
};

export default RenderListeConcepts;
