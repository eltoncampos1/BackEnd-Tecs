const assert = require('assert')
const MongoDB = require('./../db/strategies/mongo')
const Context = require('./../db/strategies/base/contextStrategy');

const MOCK_HERO_RESGISTER = {
    name: 'WonderWoman',
    power: 'Tie'
}

const context = new Context(new MongoDB())
describe('MongoDB tests suite', function () {
    this.beforeAll(async () => {
        await context.connect()
    })
    it('connection verification', async () => {
        const result = await context.isConnected()
        const expected = "Connected"

        assert.deepStrictEqual(result, expected)
    })

    it('resgister', async () => {
        const { name, power } = await context.create(MOCK_HERO_RESGISTER)
        assert.deepStrictEqual({name, power}, MOCK_HERO_RESGISTER)
    })
})