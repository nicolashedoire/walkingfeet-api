 ## Api WalkingFeet

Vous pouvez accéder à cette ressource en allant vers cette URL

```bash
http://localhost:5002/hikings
```

### Methodes disponibles

- GET
- POST
- PUT
- DELETE

### Informations

Login : mongo
Password : mongo

### Se rendre dans le conteneur mongodb

````
docker exec -it mongodb  /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
````

### Créer un dump de la base de données par

````
mongodump --db walkingfeet -u mongo -p mongo --out /home/`date +"%m-%d-%y"`
````

### Créer un dump d'une collection à la date du jour si besoin

```
mongodump --db test --collection hikings -u mongo -p mongo --out /home/`date +"%m-%d-%y"`
```

### Sortir du conteneur

````
exit
````

### Copier le dump à la date du jour hors du conteneur docker

```
docker cp mongodb:/home/`date +"%m-%d-%y"` .
```

### Copier le dump à l'interieur du conteneur

```
docker cp dumps/`date +"%m-%d-%y"` mongodb:/home
```

### Se rendre à nouveau dans le conteneur mongodb

````
docker exec -it mongodb  /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
````

### Restaurer le dump de la base de données

```
mongorestore --drop --db test /home/`date +"%m-%d-%y"`/test -u mongo -p mongo
```


## Mongo 

## Search by name example 

````
db.users.find(name: new RegExp(search)) //For substring search, case sensitive. 
db.users.find(name: new RegExp('^' + search + '$')) //For exact search, case sensitive
db.users.find(name: new RegExp(search， ‘i')) //For substring search, case insensitive
db.users.find(name: new RegExp('^' +search + '$', 'i')); //For exact search, case insensitive
```