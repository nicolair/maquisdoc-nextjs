import { read } from "@/lib/api/neo4j";
import AfficheTable2 from "@/components/tableclient2"

async function RenderSemainePage(){
  const query = `
    MATCH (s:Evenement {typeEvt:"semaine de colle"})
    RETURN  
      s.uuid AS uuid
  `;
  
  const uuidlist = await read(query);
  function callback(element,index){
    return {
      denomination : "semaine " + (index +1).toString(),
      uuid : element.uuid
    }
  };
  const datalist = uuidlist.map(callback);
  
  const headrow = ["Semaines", "Voir de près"];
  
  //console.log(datalist);
  
  return(
    <div>
      <h3>
        Année 2019-2020 en MPSI B
      </h3>
      <AfficheTable2 datalist={datalist} headrow={headrow}/>
    </div>
  )
};

export default RenderSemainePage;
