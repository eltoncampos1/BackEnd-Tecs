const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy');
const { TIMEOUT } = require('dns');
const { userInfo } = require('os');

const context = new Context(new Postgres())
const MOCK_HERO_REGISTER = {
    nome: "spider man",
    power: "Spider Web"
}


describe('Postgres Strategy', () => {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        await context.connect()
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
})