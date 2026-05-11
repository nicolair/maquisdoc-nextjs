import { read } from "@/lib/api/neo4j";
import AfficheTable from "@/components/tableclient"
import { Icons } from '@/components/icons';

import Paper from "@mui/material/Paper";
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

async function ListeNouveautePage(){
  const query = `
    MATCH (d : Document)
    RETURN 
      d.uuid AS uuid,
      d.titre + ' ( ' + d.typeDoc + ' )' AS denomination,
      toString(d.date) AS date , 
      d.typeDoc AS typedoc,
      d.url AS url
    ORDER BY d.date DESC
    LIMIT 10
   `;
  
  const listdocrec = await read(query );
  const headrow = ["Titre", "Télécharger pdf", "Voir de près"];
    
  //console.log(values);
  
  return (
    <div>
      <h3>
        Vue des {listdocrec.length} plus récentes modifications de documents
      </h3>
      <AfficheTable datalist={listdocrec} headrow={headrow}/>
    </div>      
  )
}

export default ListeNouveautePage;

/*
export const query = graphql`
    maquis {
      documents(sort: {date: DESC}, limit: 25) {
        _id
        titre
        date
        url
      }
    }
  }
`
*/
