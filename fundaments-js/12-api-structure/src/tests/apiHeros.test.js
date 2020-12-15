const assert = require('assert')
const api = require('../api')

let app= {}
describe('Suite test Heros API', function () {
    this.beforeAll(async() => {
        app = await api
    })

    it('list /heros', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heros'
        })
        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    })
})