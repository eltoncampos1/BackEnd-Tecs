const { deepStrictEqual, ok } = require('assert')
const { before } = require('mocha')
const database = require('./database')


const DEFAULT_ITEM_REGISTER = {
    name: 'Flash',
    power: 'speed',
    id: 1
}

const DEFAULT_ITEM_UPDATE = {
    name: "Spider-man",
    power: "Spider web",
    id: 2

}

describe('Suite of heros manipulation', () => {
    before(async () => {
        await database.register(DEFAULT_ITEM_REGISTER)
        await database.register(DEFAULT_ITEM_UPDATE)
    })

    it('should be to search and return heros',async() => {
        const expected = DEFAULT_ITEM_REGISTER
        const [result] = await database.list(expected.id)

        deepStrictEqual(result, expected)
    })

    it('should be able to register hero', async() => {
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

    it('should be able to update hero', async () => {
        const  expected = {
            ...DEFAULT_ITEM_UPDATE,
            name: 'Batman',
            power: 'dark'
        }
        const newData = {
            name: 'Batman',
            power: 'dark'
        }
        await database.update(DEFAULT_ITEM_UPDATE.id, newData)
        const [result] = await database.list(DEFAULT_ITEM_UPDATE.id)
        deepStrictEqual(result, expected)
    })
})