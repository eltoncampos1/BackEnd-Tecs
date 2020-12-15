db.heros.insert({
    name: 'Flash',
    power: 'Speed',
    byrthday: '1997-01-01'
})

db.heros.find()
db.heros.find().pretty()



for(let i=0; i <= 10000; i++) {
    db.heros.insert({
        name: `Clones - ${i}`,
        power: 'Speed',
        byrthday: '1997-01-01'
    })
}

db.heros.count()
db.heros.findOne()
db.heros.find().limit(1000).sort({ name: -1 })
db.heros.find({}, { power : 1, _id: 0})

//create 
db.heros.insert({
    name: 'Flash',
    power: 'Speed',
    byrthday: '1997-01-01'
})

//read
db.heros.find()

//update
db.heros.update( { _id: ObjectId("5fd77867b3624e4e18610393")}, {name: "WonderWoman"} )

db.heros.update({_id: ObjectId("5fd77867b3624e4e18610393")}, {$set: {name: 'Green Lantern'}})

//delete
db.heros.remove({ name: "WonderWoman" })
