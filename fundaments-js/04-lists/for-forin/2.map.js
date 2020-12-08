const service = require('./service')

Array.prototype.myMap = function(callback) {
    const newMappedArray = []

    for (let index = 0; index <= this.length -1; index++) {
        const result = callback(this[index], index)
        newMappedArray.push(result)
    }

    return newMappedArray;
}

async function main() {
    try {
        const results = await service.getPeople('a')
        // const names = []

        // result.results.forEach((item) => {
        //     names.push(item.name)
        // })

        // const names = result.results.map((people) => {
        //     return people.name
        // })

        // const names = result.results.map( people => people.name)

        const names = results.results.myMap((people, index) => {
            return `[${index}]${people.name}`
        })

        console.log(`names`, names);
    } catch (error) {
        console.error(`Get Bad`, error);
    }
}

main()