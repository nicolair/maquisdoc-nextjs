'use client'

import React, {useState }  from "react";
//import { css } from "@emotion/react";
import Link from 'next/link';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useFormik } from "formik";

//import TirageExos from "@/components/tirageexos";
function randomnb(a,b){
      //a, b entiers avec a<=b
      //renvoie un entier aléatoire >=a et <=b
      return Math.floor(a + Math.random()*(b-a+1));
};

function randomlist(a,b,p){
      // a, b, p sont des entiers avec p <= b - a
      // renvoie une liste aléatoire de p entiers distincts
      // >= a et <= b
      // Les entiers de a à b sont placés dans un tableau 
      // nommé "stock" de longueur b-a+1 nommée long
      // on repète p fois
      //   tirer un nb "ind" (de stock) entre 0 et long - 1
      //   pousser stock[ind] dans lili
      //   supprimer stock[ind] dans stock
      //   décrémenter long
      const stock = [];
      const lili = [];
      for(let i = a; i <= b; i++){
        stock.push(i);
      }
      let i = 0;
      let long = b - a + 1;
      let ind = 0;
      while ( i < p ){
        ind = randomnb(0,long - 1);
        lili.push(stock[ind]);
        stock.splice(ind,1);
        long--;
        i++;
      }
      return lili
};


function Rapidexo({datalist}){
  const [role,setRole] = useState("choixnb");
  const [choixnb, setChoixnb] = useState(false);
  const [nbtot, setNbtot] = useState(0);
  const themeslist = datalist.themes;
  const nbthemes = themeslist.length;
  const initval = {} ;
  themeslist.map(({code})=>initval[code] = 0);
  //console.log(initval);
  const maxval = {};
  themeslist.map(({code,nb})=>maxval[code] = nb);
  
  //composant pour le choix des nbs d'exos par thème et le tirage des identifiants
  function ChoixNbExos({datalist}){
    const validate = values => {
      const errors = {};
      let nbtotexos = 0;
      for (let key in values){
        nbtotexos += values[key];
      }
      if ( nbtotexos !== 30){
        errors.somme = "Le total est " + nbtotexos + " au lieu de 30";
      } 
      return errors;
    };
    const rid = {};
    function tirage(datalist){
      const themeslist = datalist.themes;
      //liste des nbs max d'exos par thème'
      const maxnblist = {};
        themeslist.map(({code,nb}) => {
          maxnblist[code]=nb;
        }
      );
      //liste des codes et des noms pour lesquels nb non null
      const nomslist = [];
      const codeslist = [];
      //liste des tableaux d'identifiants d'exos
      const idexoslist = [];
      themeslist.map(({code, nom}) => {
        if (datalist.values[code] > 0) {
          let nb = datalist.values[code];
          let nbmax = maxnblist[code];
          nomslist.push({'nom': nom, 'nb':nb});
          codeslist.push({'code': code, 'nb':nb});
          idexoslist.push({'code': code, 'liste':randomlist(1,nbmax,nb)});
        }      
      });
      datalist.idexos = idexoslist;
    };

    const formik = useFormik({
      initialValues:initval,
      validate,
      onSubmit: (values)=>{
        datalist.values = values;
        setRole("visuchoix");
        tirage(datalist);
      }
    });
    return (
      <Container >
        Choisir un nombre d'exercices pour chaque thème.<br/>
        {formik.errors.somme? <p> {formik.errors.somme} </p> : null}
        <form onSubmit={formik.handleSubmit} >
          <div>
            <Grid container 
                  spacing={2}
                  mt={2}
                  sx={{pt:"3%"}}
                  justifyContent='center'>
              {themeslist.map( ({code, nom, nb}, index)  =>  (
              <Grid xs={6}
                    key={index}>
                {nom}: &nbsp;
                <input type="number"
                     placeholder= '0'
                     key= {code}
                     name={code}
                     value={formik.values[code]}
                     onChange={formik.handleChange}
                     min='0'
                     max={nb}
                />
              </Grid>))
              }
            </Grid>
            <Grid xs={12} 
                  display='flex' 
                  justifyContent='center'
                  sx={{pt:"5%"}}>
                <Button type="submit"
                        variant="contained"
                        sx={{backgroundColor:'#1b5e20'}}>
                   Soumettre 
                </Button>
            </Grid>
          </div>
        </form>
      </Container>
    )
  };
  
  //composant pour visualiser le choix avant la vue de près sur la feuille 
  function VisuChoix({datalist}){
    //const themeslist = datalist.themes;
    function changerClick(){
      setRole("choixnb");
    };
    function nomtheme(code){
      // renvoie le nom du thèe associé au code
      let nom = code;
      for (let i =0; i<13; i++ ){
        //console.log(datalist.themes[i]);
        if ((datalist.themes[i].code === code)) {
          nom = datalist.themes[i].nom;
        }
      }
      return nom;
    };
    
    //console.log("ligne 164" + JSON.stringify(idexoslist, null, 2));
    //console.log(datalist.idexos);
    const queryobjet = {};
    for (const truc of datalist.idexos){
      queryobjet[truc.code] = truc.liste;
    }
    //console.log(urlquery);
    return(
      <div> 
        Liste par thème des identifiants des exos tirés<br/>
        <Grid container xs={12} 
              spacing={4}
              display='flex' 
              justifyContent='center'
              sx={{pt:"5%"}}>
          <ul>
            {datalist.idexos.map(({code, liste},index)=>(
              <li key={index}>
                {nomtheme(code)}: {JSON.stringify(liste, null,2)}
              </li>
            ))}
          </ul>
          <Link  sx={{backgroundColor:'#1b5e20', color:'#FFFFFF'}}
                 href={{
                   pathname:"/vuesproches/feuillerapidexo/",
                   query:queryobjet
                 }}
          >
             Voir feuille rapidexo 
          </Link>
          <Button type="submit"
                  variant="contained"
                  sx={{backgroundColor:'#1b5e20'}}
                  onClick={changerClick}>
             Changer nombres 
          </Button>
        </Grid>
      </div>
    )
  };
  // fin du composant VisuChoix  
  
  switch (role) {
    case 'choixnb':
      return(
        <Container > 
          <ChoixNbExos datalist={datalist} />
        </Container>
      )
    case 'visuchoix':
      return(
        <Container > 
          <VisuChoix datalist={datalist}/>
        </Container>
      )
  };
};

export default Rapidexo;
