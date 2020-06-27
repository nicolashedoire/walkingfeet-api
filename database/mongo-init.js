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
      name: 'Lille',
      country: 'France'
    },
    {
        name: 'Douai',
        country: 'France'
    },
    {
        name: 'Arras',
        country: 'France'
    },
    {
        name: 'Besançon',
        country: 'France'
    },
    {
      name: 'Mons',
      country: 'Belgique'
    }
]);