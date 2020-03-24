#README

Projet utilisant Node.js en TypeScript avec les libs Koa (Express 4.0) et TypeORM pour le back et Vue.JS avec Axios pour le front.

Le fichier de configuration de la base (ormconfig.json) est écrit en dur dans le projet, en effet, il ne m’a pas semblé nécessaire de faire de l’injection d’environnement sans docker-compose.
Il suffit d’y modifier les valeurs : host, port, username, password et database.
Si l’option synchronize est set sur true, le programme créera automatiquement les tables nécéssaire à son fonctionnement.
La compatibilité est garantie sur MySQL et MariaDB, mais ne l’est pas sur Postgres.

Pour lancer une base de donnée de test :

`docker run -itd -p 3306:3306 -e MYSQL_ROOT_PASSWORD=tasty -e MYSQL_DATABASE=tasty -e MYSQL_USER=tasty -e MYSQL_PASSWORD=tasty --name db mariadb:5`

Pour construire l’image docker :

`docker build srcs/ -t tasty_back`

Pour la lancer :

`docker run -it --link db:db -p 3000:3000 tasty_back`

Pour construire et lancer l’image front :

`docker build front -t tasty_front`

`docker run -it -p 8080:8080 tasty_front`

Concernant le back en tant que tel, il ne répond au sujet à 100% qu'uniquement sur les produits.
En revanche, le design de la base de donnée à été poussé plus loins, et les routes de bases ont été implémentées.
Le schema .sql se trouve dans le dossier `sql` et les reflexions sur les questions ouvertes dans `questions`
