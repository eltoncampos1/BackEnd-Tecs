const ICrud = require("../interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
    0: 'Disconnec',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}

class MongoDB extends ICrud {
  constructor(connections, schema) {
    super()
    this._schema = schema
    this._connection = connection
  }

  async isConnected() {
      const state = STATUS[this._connection.readyState]
      if (state === 'Connected') return state;

      if (state !== 'Connecting') return state

      await new Promise(resolve => setTimeout(resolve, 1000))

      return STATUS[this._connection.readyState]
  }

  static connect() {
    Mongoose.connect(
      "mongodb://eltoncampos:minhasenhasecreta@localhost:27017/heros",
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (!error) return;

        console.log("connection failled", error);
      }
    );

    const connection = Mongoose.connection;
    connection.once('open', () => console.log('database is running'))
    return connection;
  }

  create(item) {
    return this._schema.create(item) 
  }

  read(item, skip=0, limit=10) {
      return this._schema.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
      return this._schema.updateOne({_id: id}, {$set: item })
  }

  delete(id) {
      return this._schema.deleteOne({_id: id})
  }
}

module.exports = MongoDB;
