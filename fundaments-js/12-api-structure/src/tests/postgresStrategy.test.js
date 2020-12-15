const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const HeroiSchema = require('../db/strategies/postgres/schemas/heroSchema')
const Context = require('./../db/strategies/base/contextStrategy');
const HeroSchema = require('../db/strategies/postgres/schemas/heroSchema');


const MOCK_HERO_REGISTER = {
    name: "spider man",
    power: "Spider Web"
}
const MOCK_HERO_UPDATE = {
    name: "Superman",
    power: "Super force"
}

let context = {}
describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
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
    it('delete for id', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepStrictEqual(result, 1)
    })
})