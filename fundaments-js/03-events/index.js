const EventEmitter = require('events')

class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter()
const eventName = 'user:click'

myEmitter.on(eventName,(click) => {
    console.log('an user has clicked', click);
})

// myEmitter.emit(eventName,'in the scrollBar')
// myEmitter.emit(eventName,'in the ok')

// let count = 0
// setInterval(() => {
//     myEmitter.emit(eventName,'in the ok' + (count++))
// }, 1000);

const stdin = process.openStdin()
stdin.addListener('data',(value) => {
    console.log(`You typing: ${value.toString().trim()}`);
})