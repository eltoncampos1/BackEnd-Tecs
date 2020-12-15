const { connection } = require('mongoose')
const Sequelize = require('sequelize')


const ICrud = require('../interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor(connection, scehma) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected(){
        try {
            await this._connection.authenticate()
            return true;
        } catch (error) {
            console.log("Fail!", error);
        }
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model;
    }

    static async connect() {
        const connection = new Sequelize(
            'heros',
            'eltoncampos1',
            'qaz272518',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            }
        )
        return connection;
    }

    async create(item) {
       const { dataValues } = this._schema.create(item)

       return dataValues
    }
    async update(id, item) {
        return this._schema.update(item, {where: {id : id}})
    }
     delete(id) {
    const query = id ? { id } : {};
    return this._herois.destroy({ where: query });
  }
    async read(item = {}) {
        return this._schema.findAll({where: item, raw: true})
    }
}

module.exports = Postgres