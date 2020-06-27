printjson('Create Database......')
db = db.getSiblingDB('walkingfeet');
db.createUser(
    {
        user: "mongo",
        pwd: "mongo",
        roles: [
            {
                role: "readWrite",
                db: "walkingfeet"
            }
        ]
    }
);

db.city.insertMany([
    {
        name: 'Angers',
        country: 'France'
      },
    {
      name: 'Lille',
      country: 'France'
    },
    {
        name: 'Douai',
        country: 'France'
    },
    {
        name: 'Dijon',
        country: 'France'
    },
    {
        name: 'Arras',
        country: 'France'
    },
    {
        name: 'Bordeaux',
        country: 'France'
    },
    {
        name: 'Besançon',
        country: 'France'
    },
    {
        name: 'Grenoble',
        country: 'France'
    },
    {
        name: 'Lyon',
        country: 'France'
    },
    {
        name: 'Le Havre',
        country: 'France'
    },
    {
        name: 'Marseille',
        country: 'France'
    },
    {
        name: 'Montpellier',
        country: 'France'
    },
    {
        name: 'Nice',
        country: 'France'
    },
    {
        name: 'Nantes',
        country: 'France'
    },
    {
        name: 'Nîmes',
        country: 'France'
    },
    {
        name: 'Paris',
        country: 'France'
    },
    {
        name: 'Rennes',
        country: 'France'
    },
    {
        name: 'Reims',
        country: 'France'
    },
    {
        name: 'Strasbourg',
        country: 'France'
    },
    {
        name: 'Saint-Etienne',
        country: 'France'
    },
    {
        name: 'Toulon',
        country: 'France'
    },
    {
        name: 'Toulouse',
        country: 'France'
    },
    {
        name: 'Bruxelles',
        country: 'Belgique'
    },
    {
        name: 'Liège',
        country: 'Belgique'
    },
    {
      name: 'Mons',
      country: 'Belgique'
    }
]);