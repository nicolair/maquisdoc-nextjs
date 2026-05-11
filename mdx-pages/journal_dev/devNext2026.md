---
theme: "journal"
title: "Portage 2026 sous Next.js"
date: "2026-26-03"
---
L'ensemble du projet va être porté sous `Next.js`.

Le contenu servi par maquisdoc vient de fichiers markdown locaux ou de la base en graphe. Pour Gatsby, l'interface graphql est une couche intermédiaire qui présente l'ensemble des contenus à la couche de présentation `React`. Ce n'est plus le cas avec `Next.js` pour lequel des outils spécifiques sont utilisés.

Pour les fichiers markdown: (`.md` ou `.mdx`) le paquetage [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx).

Pour la base en graphe: l'API javascript [`neo4j-driver`](https://neo4j.com/docs/javascript-manual/current/) fournie par neo4j. 

Un point important pour `Next.js` est de bien distinguer les différentes manières de présenter du contenu à un utilisateur
 
 1. pages html statiques construites (SSG static site generation) au moment de la construction (build time) 
 2. page html générée par le serveur en réponse à une requête (SSR server site rendering)
 3. mise à jour du DOM d'une page exécutée avec javascript par le navigateur (CSR client side rendering)
 
### Notes sur les *Vues* sur le maquis.
Une "vue de près" d'un noeud `n` présente les données de ce seul noeud avec des liens vers les vues de près des noeuds qui lui sont reliés par une seule arête.  
Les noeuds dans une base neo4j ne possèdent pas par défaut de propriété de type "`id`" permettant de les identifier de manière unique dans le temps. Une telle propriété doit être créée dans le schéma avec une fonction `uuid()` et une contrainte (`CONSTRAINT` en cypher). En fait les [conditions de consistance de maquisdoc](/projet_menu/basedatagraph) imposent déjà de tels identifiants formés avec des propriétés. Par exemple `typeDoc + titre` pour un  noeud labellisé `Document`. Ceci n'est pas commode pour former des slugs pour les vues de près des noeuds.

Une propriété `uuid` a été ajoutée à tous les noeuds en exécutant la requête cypher:

        MATCH (n)
        SET n.uuid = randomUUID()
   
le 28/03/26.
