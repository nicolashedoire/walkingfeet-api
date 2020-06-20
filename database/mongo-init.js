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