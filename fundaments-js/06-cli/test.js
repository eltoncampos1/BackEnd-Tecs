const { deepStrictEqual, ok } = require('assert')
const { before } = require('mocha')
const database = require('./database')


const DEFAULT_ITEM_REGISTER = {
    name: 'Flash',
    power: 'speed',
    id: 1
}

describe('Suite of heros manipulation', () => {
    before(async () => {
        await database.register(DEFAULT_ITEM_REGISTER)
    })

    it('should be search a heros using archives',async() => {
        const expected = DEFAULT_ITEM_REGISTER
        const [result] = await database.list(expected.id)

        deepStrictEqual(result, expected)
    })

    it('should register a hero, using archive', async() => {
        const expect = DEFAULT_ITEM_REGISTER
        const result = await database.register(DEFAULT_ITEM_REGISTER)
        const [current] = await database.list(DEFAULT_ITEM_REGISTER.id)

        deepStrictEqual(current, expect)
    })

    it('should be able to remove hero', async() => {
        const expect = true;
        const result = await database.remove(DEFAULT_ITEM_REGISTER.id)
        deepStrictEqual(result, expect)
    })
})