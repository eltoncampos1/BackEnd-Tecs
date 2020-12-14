const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy');
const { TIMEOUT } = require('dns');
const { userInfo } = require('os');

const context = new Context(new Postgres())
const MOCK_HERO_REGISTER = {
    name: "spider man",
    power: "Spider Web"
}
const MOCK_HERO_UPDATE = {
    name: "Superman",
    power: "Super force"
}


describe('Postgres Strategy', () => {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HERO_UPDATE)
    })
    it('PostgresSQL Connections', async () => {
        const result = await context.isConnected()
        assert.strictEqual(result, true)
    })
    it('register', async () => {
        const result = await context.create(MOCK_HERO_REGISTER)
        delete result.id
        assert.strictEqual(result, MOCK_HERO_REGISTER)
    })

    it('list', async () => {
        const [result] = await context.read({name : MOCK_HERO_REGISTER.name})
        delete result.id

        assert.deepStrictEqual(result, MOCK_HERO_REGISTER)
    })
    it('update', async () => {
        const [updateItem] = await context.read( {name:MOCK_HERO_UPDATE.name } )
        const newItem = {
            ...MOCK_HERO_UPDATE,
            NAME : "WonderWoman"
        }
        const [result] = await context.update(updateItem.id, newItem)
        const [itemUpdate] = await context.read( {id: newItem.id})
        assert.deepStrictEqual(result, 1)
        assert.deepStrictEqual(itemUpdate.name, updateItem.name)
         
    })
})