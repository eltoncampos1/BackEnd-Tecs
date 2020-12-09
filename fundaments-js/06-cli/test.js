const { deepStrictEqual, ok } = require('assert')
const database = require('./database')


const DEFAULT_ITEM_REGISTER = {
    name: 'Flash',
    power: 'speed',
    id: 1
}

describe('Suite of heros manipulation', () => {

    it('should be search a heros using archives',async() => {
        const expected = DEFAULT_ITEM_REGISTER
        const [result] = await database.list(expected.id)

        deepStrictEqual(result, expected)
    })

    // it('should register a hero, using archive', async() => {
    //     const expect = DEFAULT_ITEM_REGISTER

    //     ok(null, expect)
    // })
})