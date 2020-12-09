const {readFile, writeFile} = require('fs')

const { promisify } = require('util')

const readFileAsync  = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor(){
        this.FILE_NAME = 'heros.json'
    }
    async getDatafile(){
        const file = await readFileAsync(this.FILE_NAME, 'utf8')
        return JSON.parse(file.toString())
    }
    async writeFile(datas){
        await writeFileAsync(this.FILE_NAME, JSON.stringify(datas))
        return true;
    }
    async register(hero) {
        const datas = await this.getDatafile()
        const id = hero.id <= 2 ? hero.id : Date.now();
        const heroWithId = { id, ...hero}
        const finalData = [...datas, heroWithId]
        const result = await this.writeFile(finalData)
        return result;
    }
    async list(id){
        const data = await this.getDatafile()
        const dataFilter = data.filter(item => (id ? (item.id === id) : true))
        return dataFilter
    }
    async remove(id){
        if(!id) {
            return await this.writeFile([])
        }
        const datas = await this.getDatafile()
        const index = datas.findIndex(item => item.id === parseInt(id))
        if (index === -1) {
            throw Error ('User not exists')
        }
        datas.splice(index, 1)
        return await this.writeFile(datas)
    }
}

module.exports = new Database()