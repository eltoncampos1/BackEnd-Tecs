const service = require('./service');

async function main () {
    try {
        const result = await service.getPeople('a');
        const names =[]
        // for (let i=0; i <= result.results.length -1; i++) {
        //     const people = result.results[i]
        //     names.push(people.name)
        // }

        // for (let i in result.results) {
        //     const people = result.results[i]
        //     names.push(people.name)
        // }

        for (people of result.results) {
            names.push(people.name)
        }
        console.log('names', names);
    } catch (error) {
        console.error('Intern Error', error);
    }
}

main()