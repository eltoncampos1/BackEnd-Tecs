const  Commander = require('commander')
const Database = require('./database')
const Hero = require('./hero')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Hero Name")
        .option('-p, --poder [value]', "Hero Power")
        .option('-i, --id [value]', "Hero ID")

        .option('-r, --register', "Register a new Hero")
        .option('-l, --list', "List a Hero")
        .option('-rm, --remove', "Remove a Hero by id")
        .option('-u, --update [value]', "Update a Hero by id")
        .parse(process.argv)

    const hero = new Hero(Commander)
    
    try {
        if(Commander.register) {
            delete hero.id

            const result = await Database.register(hero)
            if (!result) {
                console.error("heroi has not been registered")
                return;
            }
            console.log('Hero has been successfully registered!');
        }
        if (Commander.list) {
            const result = await Database.list()
            console.log(result);
            return;
        }
        if (Commander.remove) {
            const result = await Database.remove(hero.id)
            if (!result) {
                console.error("It was not possible to remove the hero");
                return;
            }
            console.log('Hero has been removed successfully');
        }
        if(Commander.update) {
            const idUpdate = parseInt(Commander.update)
            const data = JSON.stringify(hero)
            const heroUpdate = JSON.parse(data)
            const result = await Database.update(idUpdate, heroUpdate)

            if(!result) {
                console.error('It was not possible to update the hero')
                return;
            }
            console.log('Hero has been updated successfully!');
        }

    } catch (error) {
        console.error('Got error', error);
    }
}

main()