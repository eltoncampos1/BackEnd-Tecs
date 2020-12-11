const Sequelize = require('sequelize')


const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
        this.driver = null
        this._heros = null
    }

    async isConnected(){
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log("Fail!", error);
        }
    }

    async defineModel() {
        this._heros = this._driver.define('heros', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            power: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROS',
            freezeTableName: false,
            timestamps: false
        })
        await this._heros.sync()
    }

    async connect() {
        this._driver = new Sequelize(
            'heros',
            'eltoncampos1',
            'qaz272518',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this.defineModel()
    }

    async create(item) {
       const { dataValues } = this._heros.create(item)

       return dataValues
    }
}

module.exports = Postgres