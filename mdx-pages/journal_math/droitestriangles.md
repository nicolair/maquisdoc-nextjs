---
theme: "mathjournal"
title: "Droites et triangles"
date: "2026-04-12"
---
Le mercredi premier avril 2026, alors que nous découpions des poissons, Colin a inventé un nouveau jeu.

> Chaque joueur dispose d'une feuille sur laquelle il trace une droite lorsque c'est son tour. Le gagnant est celui qui a formé le plus de triangles valides après un certain nombre de tours.

Un triangle est *valide* lorsque ses côtés sont des segments des droites tracés et qu'il ne contient aucun autre segment des droites tracées.

Le jeu en lui même n'est pas très intéressant car des configurations qui semblent maximisantes sont faciles à trouver.
  - avec 3 droites: 1 triangle ![3 droites](/images/journal_math/IntersectDroites_1.png)
  - avec 4 droites: 2 triangles ![4 droites](/images/journal_math/IntersectDroites_2.png)
  - avec $n\geq 5$ droites: $n$ triangles ![5 droites](/images/journal_math/IntersectDroites_3.png)

Cette note porte sur la mathématisation de cette conjecture.

### Algorithme générant une configuration géométrique
  - on se donne $n$ droites en configuration générale.
  - on calcule les $\binom{n}{2}$ points d'intersection 2 à 2.
  - pour chaque droite:
    - on ordonne ses $n-1$ points
    - on trace les $n-2$ segments
    
Pour la mise en oeuvre mathématique, on se place dans un plan affine muni d'un repère. Une droite est donnée par son équation du type

$$ 
ax + by + c =0 
$$

On suppose les droites en configuration générale c'est à dire 3 à 3 ni parallèles ni concourantes. Cela se traduit par la non nullité des $\binom{n}{3}$ déterminants $3\times 3$ formés avec les coefficients des équations. Ceci assure que les droites se coupent en $\binom{n}{2}$ points distincts.

Pour ordonner les points d'intersection sur une droite, on utilise une *forme de test* c'est à dire une $\varphi = ax + by$ transverse à toutes les droites. Cela se traduit par le fait que la droite $\varphi=0$ coupe les $n$ droites ou encore par la non nullité de $n$ déterminants $2\times 2$.

Dans ce cas la restriction de $\varphi$ à une droite est injective à valeurs réelles. On peut donc ordonner les points $A$ d'une droite selon leur $\varphi(A)$.

Cet algorithme a été implémenté dans le langage [`Asymptote`](https://asymptote.sourceforge.io/) de description vectorielle graphique. 

    settings.outformat = "png";
    pen Vert = deepgreen;
    size(8cm);

    //"extension" des droites (réel > 0)
    real extension = 0.1;
    //, (3,1,1)
    //données de base
    triple[] droites = {(1,0,0), (0,1,0), (1,1,-1), (2,-1,2)};
    pair dirtest = (2,-1);
    int nbd = droites.length;
    
    //renvoie le "pair" formé par les 2
    //premieres coordonnées d'un "triple"
    pair proj(triple d){ 
      return (xpart(d), ypart(d));
    }
    
    //renvoie le déterminant de 3 "triples"
    real det(triple u, triple v, triple w){
      return dot( cross(u,v),w);
    }
    
    //renvoie le point d'intersection de deux droites données par leur équation
    pair intersect(triple U, triple V){
      real det = xpart(U)*ypart(V) - ypart(U)*xpart(V);
      return ((-zpart(U)*ypart(V) + zpart(V)*ypart(U))/det , (-xpart(U)*zpart(V) + xpart(V)*zpart(U))/det);
    }
    
    //pour classer les points sur une droite
    //suivant la direction de test
    bool less(pair p, pair q){
      return cross(p,dirtest) < cross(q,dirtest);
    }
    
    pair[] directions = new pair[];
    for(int i; i<nbd; ++i){
      directions.push( proj(droites[i]) );
    }
    
    //Validation que les droites ne sont 
    //  ni parallèles
    //  ni concourantes.
    //Le plus petit déterminant de 3 équations 
    //doit être assez grand.
    real minDet3 = abs(det(droites[0],droites[1], droites[2]));
    for(int i=0; i<nbd; ++i){
      for(int j=i+1; j<nbd; ++j){
        for(int k=j+1; k<nbd; ++k){
         real v = abs(det(droites[i],droites[j], droites[k]));
         if( v < minDet3){
           minDet3 = v;
         }
        }
      }
    }
    
    //Validation que la direction de test
    //n'est pas parallèle à une des droites.
    //Le produit scalaire contre dirtest 
    //doit être assez grand.
    real minDet2 = abs( dot(directions[0],dirtest));
    for(int i=1; i<nbd; ++i){
      real v = abs(dot(directions[i],dirtest));
      if( v < minDet2 ){
        minDet2 = v;
      }
    }
    
    if((minDet3 < 0.00000001) | (minDet2 < 0.00000001)){
      write("les droites sont parallèles ou concourantes
             ou bien la direction de test n'est pas valable");
    } else {
      //calcul des points d'intersection
      pair[][] points = new pair[nbd][];
      pair[][] pointsord = new pair[nbd][];
      for(int i=0; i< nbd; ++i){
        for(int j = 0; j< nbd; ++j){
          if(j!=i){
            pair p = intersect(droites[i],droites[j]);
            points[i].push(p) ;
            dot(p,Vert+4);
          }
        }
        pointsord[i] = sort(points[i], less);
        pointsord[i].push(-extension*pointsord[i][0] + (1+extension)*pointsord[i][nbd-2]);
        pointsord[i].push((1+extension)*pointsord[i][0] -extension*pointsord[i][nbd-2]);
        draw(pointsord[i][nbd-1]--pointsord[i][nbd], Vert+1);
      }
    }

### Graphe associé
![5 droites](/images/journal_math/IntersectDroites_4.png)
On peut associer un graphe à la configuration précédente.

  - noeuds de type "droite": les droites données
  - noeuds de type "point": les points d'intersection
  - relation "APPARTIENT_A" : entre un point et une droite qui le contient
  - relation "CONTIGU_A": entre deux points consécutifs sur une droite ordonnée.

Cet algorithme a été implémenté dans le langage déclaratif [`Cypher`](https://neo4j.com/docs/cypher-manual/current/introduction/) de requête pour les graphes [`Neo4j`](https://neo4j.com/). Il construit le graphe attaché à une configuration géométrique et cherche les "triangles" c'est à dire les cycles de 3 relations `CONTIGU_A`.

  
    //liste des équations des droites (le 4eme nb est le numéro de la droite)
    WITH [[1,0,0,1], [0,1,0,2], [1,1,-1,3], [2,-1,2,4]] AS lili ,
         [1,-1] AS forme
    // 1-forme pour le calcul de contiguité
    WITH lili, forme, size(lili) AS nbd // nombre de droites
    
    // vérification de l'absence de parallélisme dans liste des directions
    WITH  nbd, [forme] + [l IN lili | l[..2]] AS didi
    UNWIND range(0,nbd) AS i
    UNWIND range(i+1,nbd) AS j
    WITH didi[i] AS u, didi[j] AS v
    RETURN min(abs(u[0]*v[1]-u[1]*v[0]) ) //doit être assez grand
    
    // création de la direction de contiguité
    WITH [1,-1] AS forme
    CREATE (:contig {dir: forme})
    
    // création des droites
    WITH [[1,0,0,1], [0,1,0,2], [1,1,-1,3], [2,-1,2,4]] AS lili
    // 1-forme pour le calcul de contiguité
    WITH lili, size(lili) AS nbd // nombre de droites
    UNWIND lili AS eq
    CREATE (:droite {eq:toFloatList(eq[..3]), numero:eq[3]})
    
    //création des points
    MATCH (d:droite)
    WITH count(d) AS nbd
    UNWIND range(1,nbd) AS i
    UNWIND range(i+1,nbd) AS j
    MATCH (d1:droite {numero:i}),(d2:droite {numero:j})
    WITH i, j, d1, d2, d1.eq[0] * d2.eq[1] - d1.eq[1] * d2.eq[0] AS delta
    WITH i, j, [(-d1.eq[2] * d2.eq[1] + d2.eq[2] * d1.eq[1])/delta,
                (-d1.eq[0] * d2.eq[2] + d1.eq[2] * d2.eq[0])/delta ] AS coord
    CREATE (:point {coord:coord, nom:[i,j]})
    
    //création des relations d'appartenance
    MATCH (p:point),(d:droite)
    WHERE  abs(d.eq[0]*p.coord[0] + d.eq[1]*p.coord[1] + d.eq[2]) < 1.0e-10
    CREATE (p)-[:APPARTIENT_A]->(d)
    
    On utilise la direction supplémentaire du noeud "contig" pour former les contiguités
    //création des contiguités
    MATCH (d:droite)
    CALL(d){
      MATCH (n:contig)
      WITH n.dir AS v
      MATCH (p:point)-[:APPARTIENT_A]->(d)
      WITH p, p.coord[0]*v[0] + p.coord[1]*v[1] AS s
      ORDER BY s
      RETURN collect([p,s]) AS ordpoints
    }
    WITH d.numero AS numdte, ordpoints, size(ordpoints) AS nbPts
    UNWIND range(0,nbPts-2) AS i
    WITH ordpoints[i][0] AS p,
         ordpoints[i+1][0] AS q
    CREATE (p)-[:CONTIGU_A]-> (q),
           (p)<-[:CONTIGU_A]- (q)

    //pour trouver les triangles
    MATCH triang=(p:point)-[:CONTIGU_A]->{2}(:point)-[:CONTIGU_A]->(p)
    RETURN triang
    //on peut renvoyer count(triang)/6 pour compter les triangles
    
### Chantier
On se donne un polygone convexe $\mathcal{C}$ à $n$ côtés. Les côtés sont des segments des droites $D_1, \cdots, D_n$. Si les droites $D_{i-1}$ et $D_{i+1}$ se coupent en dehors de $\mathcal{C}$, on forme, en dehors du convexe, un triangle valide avec les deux sommets consécutifs et ce point d'intersection.

On forme ainsi $n$ triangles.

Attention, si $n$ est pair certains couples de côtés d'un polygone régulier sont parallèles. Il faut perturber les équations pour se placer en configuration générale. En revanche cela ne se produit pas dans le cas impair. La figure suivante est obtenue en perturbant très légèrement un polygone régulier à 7 côtés.

![7 droites](/images/journal_math/IntersectDroites_5.png)

Pour un polygone quelconque, existe-t-il une condition entre les angles des côtés consécutifs pour que les droites se coupent en dehors du polygone ? 

On peut convenir d'appeler *étoile compacte* de la famille de droites le plus grand polygone dont les cotés sont sur les droites données.
On impose au coeff constant des équations d'être >0. Le point $O$ est une solution de $(\varphi_i(M)>0, \forall i)$

L'étoile compacte est l'union des ensembles de solutions des systèmes $(\varepsilon_i\varphi_i(M)>0, \forall i)$ avec $\varepsilon= \pm 1$ étendues seulement aux ensembles compacts.

Si l'ensemble des solutions de $(\varepsilon_i\varphi_i(M)>0, \forall i)$ est compact non vide il existe au moins 3 des $\varepsilon_i$ qui valent $+1$.

