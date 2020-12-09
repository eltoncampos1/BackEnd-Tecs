const {readFile} = require('fs')

const { promisify } = require('util')

const readFileAsync  = promisify(readFile)


class Database {
    constructor(){
        this.FILE_NAME = 'heros.json'
    }
    async getDatafile(){
        const file = await readFileAsync(this.FILE_NAME, 'utf8')
        return JSON.parse(file.toString())
    }
    writeFile(){

    }
    async list(id){
        const data = await this.getDatafile()
        const dataFilter = data.filter(item => (id ? (item.id === id) : true))
        return dataFilter
    }
}

module.exports = new Database()