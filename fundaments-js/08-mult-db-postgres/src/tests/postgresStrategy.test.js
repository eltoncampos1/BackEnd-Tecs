const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy');

const context = new Context(new Postgres())

describe('Postgres Strategy', () => {
    this.timeout(infinity)
    it('PostgresSQL Connections', async () => {
        const result = await context.isConnected()
        assert.strictEqual(result, true)
    })
})