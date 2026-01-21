'use client'
import './global.css';
import { promises as fs } from 'fs';
import { AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import React from "react";
//import { css } from "@emotion/react";
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

//import { fetchGraphQLData } from '../lib/api/neo4j-graphql';

import {Box, Typography} from "@mui/material";
import {Container} from "@mui/material";
import Grid from '@mui/material/Grid';
import { Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

//import { rhythm } from "../lib/styles/typography"
import Footer from "../components/footer"

const darkgreen = "#1b5e20";

const data = { } ; //fetchGraphQLData(GET_LAYOUT_DATA); 
  data.MenuVuesList = [ 
    {slug:'/vues/journal_math', texte:'Journal mathématique'},
    {slug:'/vues/nouveautes', texte:'Modifications récentes'},
    {slug:'/vues/problemes' , texte:'Problèmes'}, 
    {slug:'/vues/feuillesexercices', texte:"Feuilles d'exercices"}, 
    {slug:'/vues/listecours', texte:'Cours'},
    {slug:'/vues/rapidexo', texte:'Rapidexos'},
    {slug:'/vues/listeconcepts', texte:'Concepts'},
    {slug:'/vues/annee/semaine_1', texte:'2019-2020 en mpsiB'}
    ];
  data.ProjetMenuList = [
    {slug:'/projet_menu/principes', texte:"Principes"},
    {slug:'/projet_menu/depots', texte:"Dépôts"},
    {slug:'/projet_menu/basedatagraph', texte:"Graphe de données"},
    {slug:'/projet_menu/site', texte:"Site web - vues"},
    {slug:'/projet_menu/maintenance', texte:"Scripts de maintenance"},
    {slug:'/journal_dev', texte:"Journal"},                    ];

//console.log(data.MenuVuesList);  
  
const MenuVues = () => {
    const [anchorElV, setAnchorElV] = React.useState(null);
    const openV = Boolean(anchorElV);
    const handleClickV = (event) => {
      setAnchorElV(event.currentTarget);
    };
    const handleCloseV = () => {
      setAnchorElV(null);
    };
    return (
      <Toolbar>
       <Typography 
         variant="h5" 
         component="h2"
         color= "darkgreen"
         display= "inline-block"
         margin=" 0 auto"
       >
         Vues
      </Typography>
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonV"
           aria-controls={openV ? 'basic-menuV' : undefined}
           aria-haspopup="true"
           aria-expanded={openV ? 'true' : undefined}
           onClick={handleClickV}
        >       
          <MenuIcon/>
        </IconButton>
        <Menu
          id="basic-menuV"
          anchorEl={anchorElV}
          open={openV}
          onClose={handleCloseV}
          slotProps={{
            list: {
                  'aria-labelledby': 'basic-button',
             },
          }}
        >
          {data.MenuVuesList.map( (node) => (
            <MenuItem key={'id_' + node.slug} sx={{ p: 0, mr: 5}}>
              <Link
                    color = {darkgreen}
                    underline= "hover"
                    href={ node.slug}
                  >
                <Typography component="h4" variant="h7" textDecoration="none">
                  {node.texte}
                </Typography>
              </Link>
            </MenuItem>))            
          }
        </Menu>
      </Toolbar>
    )
};
  
const MenuDev = () => {
    const [anchorElD, setAnchorElD] = React.useState(null);
    const openD = Boolean(anchorElD);
    const handleClickD = (event) => {
      setAnchorElD(event.currentTarget);
    };
    const handleCloseD = () => {
      setAnchorElD(null);
    };

    return (
     <Toolbar>
       <Typography 
         variant="h5" 
         component="h2"
         color= {darkgreen}
         display= "inline-block"
       >
         Projet
       </Typography>
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonD"
           aria-controls={openD ? 'basic-menuD' : undefined}
           aria-haspopup="true"
           aria-expanded={openD ? 'true' : undefined}
           onClick={handleClickD}
        >       
          <MenuIcon/>
        </IconButton>
        <Menu
            id="basic-menuD"
            anchorEl={anchorElD}
            open={openD}
            size= "Auto"
            onClose={handleCloseD}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonD',}}
        >
          {data.ProjetMenuList.map( (node) => (
            <MenuItem key={node.texte} sx={{ p: 0, mr: 5}}>
                  <Link
                    color = {darkgreen}
                    underline= "hover"
                    href={ node.slug}
                  >
                    <Typography 
                        component="h4"
                        variant="h7"
                        textDecoration= "none"
                    >
                      {node.texte}
                    </Typography>
                  </Link>
            </MenuItem>
          ))}
        </Menu>
     </Toolbar>
    )
};
  
function Layout({data, children}){
  return (
    <html>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true}}>
          <div>
            <Box
              sx={{
                backgroundColor: '#CADFC8',
                display: 'flex',
                width: '100%',
              }}
               
               paddingX={{ xs: 2, sm: 5, lg: 4 }}
            >
              <Grid container spacing={1}>
                <Grid 
                  sx = {{
                    display: "flex",
                    justifyContent: "center"
                  }}
                  size={{xs:12}}  
                  alignItems="center">
                  <Link href={`/`}>
                    <Typography variant="h3" 
                                component="h1" 
                                color="darkgreen" 
                                display="inline-block">
                      maquisdoc nextjs
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={1}>
              <Grid size="Auto">
                <MenuVues/>
              </Grid>
              <Grid size="grow">
              </Grid>
              <Grid size="Auto">
                <MenuDev/>
              </Grid>
            </Grid>
            <Divider sx = {{marginBottom:5}}/>
            <Container maxWidth="sm">
              {children}
            </Container>
            <Footer/>
          </div>
        </AppRouterCacheProvider>
      </body>
  </html>
  )
};

export default Layout;

