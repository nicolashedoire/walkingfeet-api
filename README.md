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


### Créer un dump de la base à la date du jour

```
mongodump --db test --collection hikings -u mongo -p mongo --out /home/`date +"%m-%d-%y"`
```

### Copier le dump à la date du jour hors du conteneur docker

```
docker cp mongodb:/home/`date +"%m-%d-%y"` .
```

### Copier le dump à l'interieur du conteneur

```
docker cp dumps/`date +"%m-%d-%y"` mongodb:/home
```

### Restaurer le dump de la base de données

```
mongorestore --drop --db test /home/`date +"%m-%d-%y"`/test -u mongo -p mongo
```