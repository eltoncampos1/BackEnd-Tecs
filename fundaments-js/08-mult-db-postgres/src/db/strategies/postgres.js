const Sequelize = require('sequelize')


const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
        this.driver = null
        this._heros = null
        this._connect()
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
        this._heros = driver.define('heros', {
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
        await Heros.sync()
    }

    _connect() {
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
    }

    create(item) {
        console.log("item foi salvo em postgres");
    }
}

module.exports = Postgres