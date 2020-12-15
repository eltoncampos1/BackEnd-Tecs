const assert = require('assert')
const MongoDB = require('./../db/strategies/mongo')
const Context = require('./../db/strategies/base/contextStrategy');

const MOCK_HERO_DEFAULT = {
    name: 'SpiderMan',
    power: 'Super web'
}
const MOCK_HERO_RESGISTER = {
    name: `WonderWoman-${Date.now()}`,
    power: 'Tie'
}

const MOCK_HERO_UPDATE = {
    name: `Arrow-${Date.now()}`,
    power: 'Arrows'
}

let MOCK_HERO_ID = ''


const context = new Context(new MongoDB())
describe('MongoDB tests suite', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HERO_DEFAULT)
        const result = await context.create(MOCK_HERO_UPDATE)
        MOCK_HERO_ID = result._id
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
    it('list', async () => {
        const [{name,power}] = await context.read({name: MOCK_HERO_DEFAULT.name})
        const result = {
            name,
            power
        }
        assert.deepStrictEqual(result, MOCK_HERO_DEFAULT)
    }) 

    it('update', async () => {
        const result = await context.update(MOCK_HERO_ID, {
            name: 'Marvin'
        })

        assert.deepStrictEqual(result.nModified, 1)
    })
})