import { read } from "@/lib/api/neo4j";
import Rapidexo from "@/components/rapidexo";

async function VueRapidexo(){
  const themes = [       
    {'code':'Calcloc', 'nom':'Calcul local','nb':0},
    {'code':'Courbpar', 'nom':'Courbes paramétrées','nb':0},
    {'code':'Ctrigus', 'nom':'Calcul trigonométrique','nb':0},
    {'code':'Deriv', 'nom':'Dérivation','nb':0},
    {'code':'Equadiff', 'nom':'Équations differentielles','nb':0},
    {'code':'Fracrat', 'nom':'Fractions rationnelles','nb':0},
    {'code':'Geomel', 'nom':'Géométrie élémentaire','nb':0},
    {'code':'Integ', 'nom':'Intégration','nb':0},
    {'code':'LinMat', 'nom':'Matrices','nb':0},
    {'code':'Lineuc', 'nom':'Algèbre linéaire euclidienne','nb':0},
    {'code':'Polynom', 'nom':'Polynômes','nb':0},
    {'code':'Systlin', 'nom':'Systèmes linéaires','nb':0},
    {'code':'Vocens', 'nom':'Vocabulaire ensembliste','nb':0}
  ];

  const query = ``;
  // les thèmes et les nbs par thème devraient venir d'une requête neo4j
  //const themes = await read(query);
  function callback(element){
    element.nb = 100;
    return element;
  }
  const datalist = {};
  datalist.themes = themes.map(callback);
  datalist.themes[1].nb = 10;
  //datalist.etat = "choixnb";
  //console.log(datalist);
  
  return(
    <div>
      <h3>
        Rapidexo: vue des petits exercices
      </h3>
      <Rapidexo datalist={datalist}/>
    </div>
    )
};

export default VueRapidexo;
