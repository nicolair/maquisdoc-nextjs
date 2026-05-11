import Link from "@mui/material/Link";

import { Icons } from '@/components/icons';

function denomination(label,props){
    switch (label) {
        case "Document": return props.titre;
        case "Concept": return props.litteral;
        case "Evenement": return props.nom;
    }
}

function LocalRelationsView({context}){
  //console.log(context.rels);
  const relsfin = context.relsfin;
  const relsdeb = context.relsdeb;
  if (relsfin.length + relsdeb.length> 0) {
    return(
      <div> 
          <ul>
            {relsfin.map(({typerel, propsfin, labelfin})=>
              <li key={propsfin.uuid}> 
                {context['typenoeud']} &nbsp; local &nbsp;
                {typerel} &nbsp;
                <Link href={propsfin.uuid}>
                  <Icons.SuivreDroit/> 
                </Link>
                &nbsp; {denomination(labelfin,propsfin)}
              </li>)}
          </ul>
          <ul>
            {relsdeb.map(({typerel, propsdeb, labeldeb})=>
              <li key={propsdeb.uuid}> 
                {denomination(labeldeb,propsdeb)} &nbsp;
                <Link href={propsdeb.uuid}>
                  <Icons.SuivreGauche/> 
                </Link>
                &nbsp; {typerel} &nbsp;
                {context['typenoeud']} &nbsp; local
              </li>)}
          </ul>
      </div>)
  }
};

export default LocalRelationsView
 
