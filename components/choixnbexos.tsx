'use client'

import React, {useState }  from "react";
import { css } from "@emotion/react";


import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Toolbar from "@mui/material/Toolbar"

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

function AfficheForm({datalist}){
  const [etat,setEtat] = useState('choixnb');
  const themeslist = datalist.themes;
  //console.log(themeslist);
  const nbthemes = themeslist.length;
  const initval = {} ;
  themeslist.map(({code})=>initval[code] = 0);
  const maxval = {};
  themeslist.map(({code,nb})=>maxval[code] = nb);
  //console.log('TAGADA');
  
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
    setEtat("tirage");
    //console.log(datalist);
  };
  
  return(
  )
};

export default AfficheForm;
