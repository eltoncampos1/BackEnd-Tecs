const Mongoose = require('mongoose')
Mongoose.connect('mongodb://eltoncampos:minhasenhasecreta@localhost:27017/heros', 
    { useNewUrlParser: true , useUnifiedTopology: true }, (error) => {
        if(!error) return;

        console.log('connection failled', error);
    })

const connection = Mongoose.connection
connection.once('open', () => console.log('database starting'))

const heroSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heros', heroSchema)

async function main() {
    const resultRegister = await model.create( {
        name: 'Batman',
        power: 'Money'
    })

    console.log('result register', resultRegister);

    const listItems = await model.find()
    console.log('Items', listItems);
}

main()
