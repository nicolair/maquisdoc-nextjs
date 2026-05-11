---
theme: "mathjournal"
title: "Tirage non uniforme d'une partie"
date: "2026-04-03"
---
Si on tire aléatoirement une partie de $\llbracket 1, n \rrbracket$ à $p$ éléments avec une expérience vérifiant une loi uniforme, la probabilité d'obtenir une partie particulière est 

$$\frac{1}{\binom{n}{p}} = \frac{p!}{n(n-1)\cdots(n-p+1)}$$

À cause de l'ordre des entiers, l'ensemble des parties à $p$ éléments est en bijection avec l'ensemble des applications strictement croissantes de $\llbracket 1, p \rrbracket$ dans $\llbracket 1, n \rrbracket$.  
Cela permet d'imaginer une expérience conduisant à une loi qui n'est pas uniforme. Définissons aléatoirement une application strictement croissante $\varphi$ de la manière suivante:

  - $\varphi(1) \in \llbracket 1, n-p+1 \rrbracket$
  - $\varphi(2) \in \llbracket \varphi(1) + 1, n-p+2 \rrbracket$
  - $\vdots$
  - $\varphi(p) \in \llbracket \varphi(p-1) + 1, n \rrbracket$
      
Quelle est la probabilité d'obtenir une $\varphi$ donnée à l'avance?  
On note $\varphi_i = \varphi(i)$.  
Avec des probabilités conditionnelles:

$$\frac{1}{n-p+1} \times \frac{1}{n-\varphi_1 - p + 2}  \times \cdots \times \frac{1}{n - \varphi_{p-1}}$$

La loi n'est pas uniforme car 

  - la probabilité d'obtenir $(1,2, \cdots, p)$ est $(\frac{1}{n-p+1})^p$
  - la probabilité d'obtenir $(n-p+1,n-p+2, \cdots, n)$ est $\frac{1}{n-p+1}$

> **Le tirage des $p$ plus grandes valeurs est beaucoup plus probable que le tirage des $p$ plus petites.**



Le code suivant implémente cet algorithme en javascript

      // a, b, p sont des entiers avec p <= b - a
      // renvoie une liste strictement croissante aléatoire
      // de p entiers >= a et <= b
      const lili = [];
      let i = 0;
      let m = a;
      let M = b - p + 1;
      let v = 0;
      while ( i < p ){
        v = randomnb(m,M);
        lili.push(v);
        m = v + 1;
        M = M + 1;
        i++;
      }
      return lili
