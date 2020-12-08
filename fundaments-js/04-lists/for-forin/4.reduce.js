const {getPeople} = require('./service')

Array.prototype.myReduce = function(callback, initValor) {
    let finalValor = typeof initValor !== undefined ? initValor : this[0]
    for (let index =0; index <= this.length -1; index++) {
        finalValor = callback(finalValor, this[index], this)
    }

    return finalValor;
}

async function main() {
    try {
        const { results } = await getPeople('a')
        const pesos = results.map(item => parseInt(item.height))
        // console.log(`pesos`,pesos);
        // const total = pesos.reduce((prev, next) => {
        //     return prev + next
        // },0)

        const myList = [
            ['elton', 'campos'],
            ['nodeBr', 'reactJs']
        ]
        const total = myList.myReduce((prev,next) => {
            return prev.concat(next)
        },[])
        .join(', ')

        console.log(`total`, total);
    } catch (error) {
        console.error(`Get bad`, error);
    }
}

main()