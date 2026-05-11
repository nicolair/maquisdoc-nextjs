'use client'

import React, {useState }  from "react";
import { css } from "@emotion/react";

import { useFormik } from "formik";
//import { trackPromise } from "react-promise-tracker";
//import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Toolbar from "@mui/material/Toolbar"

function randomnb(a,b){
  //a, b entiers avec a<=b
  //renvoie un entier aléatoire >=a et <=b
  return Math.floor(a + Math.random()*(b-a+1));
};

//alert(JSON.stringify(values, null, 2));
function randomlistSpec(a,b,p){
  // a, b, p sont des entiers avec p <= b - a
  // renvoie une liste strictement croissante aléatoire de p entiers
  // >= a et <= b
  const lili = [];
  let i = 0;
  let m = a;
  let M = b - p;
  let v = 0;
  while ( i < p ){
    v = randomnb(m,M);
    lili.push(v);
    m = v + 1;
    M = M + 1;
    i++;
  }
  return lili
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


function AfficheForm({datalist}){
  const themeslist = datalist.themes;
  //console.log(themeslist);
  const nbthemes = themeslist.length;
  const initval = {} ;
  themeslist.map(({code})=>initval[code] = 0);
  const maxval = {};
  themeslist.map(({code,nb})=>maxval[code] = nb);
  //console.log(maxval);
  
  function randomid(values){
    // values désigne un objet de nombres n[theme] par thème
    // la fonction renvoie un objet par thème dont les valeurs sont des listes aléatoires l[theme]
    // de n[theme nbs ] identifiant de rapidexo par thème
    // rid: "random identifiants"
    const rid = {}; 
    for(let code in values){
      rid[code] = randomlist(0, maxval[code], values[code]);
    };
    datalist.rid = rid;
    //alert(JSON.stringify(rid, null, 2));
    console.log(datalist);
  };

  const validate = values => {
    const errors = {};
    let nbtotexos = 0;
    for (let key in values){
      nbtotexos += values[key];
    }
    //nbtotexos = 30;
    if ( nbtotexos !== 30){
        errors.somme = "La somme des nombres par thème est " + nbtotexos + ". Elle doit être 30.";
        //alert(errors.somme);
    }
    return errors;
  };
  
  //let nbtotexos = 10;
  
  const formik = useFormik({
    initialValues:initval,
    validate,
    //onSubmit: fetchREFS
    onSubmit: randomid
  });

  return(
    <Container >
      Choisir un nombre d'exercices pour chaque thème.
      <form onSubmit={formik.handleSubmit} >
        <div>
          {formik.errors.somme ? <div>{formik.errors.somme}</div> : null}
          <Grid container 
                spacing={2}
                mt={2}
                sx={{pt:"3%"}}
                justifyContent='center'>
            {themeslist.map( ({code, nom}, index)  =>  (
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
                     max='30'
                />
              </Grid>))
            }
          </Grid>
          {formik.errors.somme ? 
            null :
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
          }
        </div>
      </form>
    </Container>
  )
};

export default AfficheForm;
