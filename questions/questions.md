**Question 1 : Comment pouvons-nous récupérer le parcours client (on parle du client du restaurant) sur les tablettes ?**

Il est important de considérer le type de matériel utilisé par les clients (du restaurant) dans cette reflexion.
En effet, même s’il est pour l’instant centré sur les tablettes, il n’est pas impossible que ce support évolue, et il existe des technologies qui peuvent être facilement mises en place pour se préparer à cette évolution.

La première solution à mettre en place une heatmap.
C’est un outil qui à chaque interaction, click, scroll etc. va envoyer le lieu (sur l’écran) et la date de l’interaction à un serveur, avec d’autres informations comme par exemple, le temps de réponse serveur, ID de la tablette etc.
On peut ensuite stocker ces données dans un moteur adaptés au logs, comme une base Cassandra voir une base ElasticSearch modifiée.

En parallèle de ces données, il est possible de stocker chaque étape du parcours client afin d’utiliser ces données d’une façon que je vais développer dans la réponse à la question 2.

Il serait intéressant de récupérer directement l’avis du client à la fin du parcours, tout simplement en lui demandant.
Avant un bouton valider par exemple, une échelle graphique allant de 1 à 5 pourrait lui être proposée afin de donner son avis sur son experience.

——

**Question 2 : Comment proposer le meilleur produit sur la tablette, au meilleur moment, afin d'optimiser le taux de conversion ? Comment le mettre en place ?**

Pour toujours proposer le meilleur produit au bon moment, il faut jouer d’une synergie entre les données utilisateurs récolées et les choix du restaurant, comme par un exemple une promotion.
Avec les données récoltées sur l’experience utilisateurs il aurait pu par exemple apparaitre que les produits au centre de l’écran sont plus souvent sélectionnés que ceux dans les coins.

Sur une solution bien plus poussée, il serait possible de détecter le type de client (reconnaissance facile par exemple ou selection par le serveur qui remet les tablettes du type de client eg. Enfant adulte etc)

S’il a déjà été possible de fidéliser les clients et de les reconnaitre, proposer des choix de nouveaux produits qui ont une forte probabilités de les intéresser  serait très facile en se basant les données précédemment récoltées.

Il est également possible de developper des modèles d’intelligence artificiels qui proposent des suggestions comme le font les moteurs de contenus.


——

**Question 3 : Comment faire pour avoir un menu sur tablette, en ligne, en click and collect (certains produits peuvent être dispo qu'en commande en ligne et inversement), sur des bornes, avec une architecture scalable ?**

Pour proposer un service scalable avec une parc assez varié, la solution full web me parait le plus facile à mettre en place.
Il faut éviter d’avoir à developer et maintenir de multiples applications pour chaque type d’interface, pour des raisons évidentes de couts.

Cependant, le possible difference des choix de produits en fonction du support utilisé n’est pas une problématique difficile à résoudre, car il est aisé de détecter le type de support utilisé par le client final.

La première problématique de cette scalabilité est la forte variation de charge sur le service.
En effet, on peut facilement estimer que pendant les heures pleines, par exemple entre 11h30 et 13h00, le nombre de consultations des menus et de commandes sera très important, comparé à la nuit où le service ne sera que très peu utilisé.
Il serait dommage de consommer des ressources “dans le vide” pour des raison écologiques et économiques.
Il convient donc de mettre en place en solution la plus stateless possible qui peut être redimensionné à souhait sur le plan horizontal.
De plus en plus d’offres de cloud publique permettent la locations d’instance hotspots qui répondent parfaitement à cette problématique.

Le baremetal ou l’hybride n’est pas non plus à écarter car il existe aujourd’hui des technologies permettant de faire cohabiter les deux dans un environnement aussi sécurisé qu’efficace.

Le tout pouvant être dockerizé et orchestré par un ou plusieurs clusters K8s afin de s’assurer de la fiabilité et la scalabilité de l’ensemble.

Sur une solution déployée sur plusieurs fuseaux horaires, une gestion des ressources pourrait être avantageusement tournée autour de critère.
Il sera par la suite possible de prévoir avec plus de précision la consommation des ressources par le système, et ainsi mettre en place des modèles plus économiques.

La question du stockage des données est aussi un point important concernant la scalabilité du projet.
Les questions types comme : quels bases ? SQL? NoSQL? Cassandra? Mongo? Mysql? etc, quel moteur de stockage ? L’object storage à la S3 est-tel possible ? Si MySQL est retenu, comme assurer la scalabilité horizontale facilement ? l’ACID est-il important ? — devront être poser et analyser dans les moindres détails.


——

Déploiement

Il convient de dockerizer le back-end, un exemple de dockerfile est disponible dans le projet.
Sur un cluster K8s, nous pourrions avoir un environnement de dev en plus du prod afin de tester les changements à plus grande échelle.
Le cluster serait couplée à au moins une CI, le CD automatique n’étant pas toujours une bonne idée sur des projets de taille importante.
Elle peut se faire via un outil comme GitLab, qui teste le projet au sein de containers afin de s’assurer de la qualité de l’environnement de test.
D’autres solutions existent comme Jenkins ou des outils conçus pour K8s mais elles apportent généralement le même résultat.
