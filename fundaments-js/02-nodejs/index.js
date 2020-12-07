const util = require('util')

const getAddressAsync = util.promisify(getAddress)

function getUser() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
          return resolve({
            id: 1,
            name: "elton",
            birthday: new Date()
          });
        }, 1000);
    })
  }
  
function getTel(userId, ) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
          return resolve( {
            tel: "1234-56789",
            ddd: 11
          });
        }, 2000);
    })
  }
  
function getAddress(userId, callback) {
    setTimeout(() => {
      return callback(null, {
        address: "Silicon valey",
        number : 1000,
      })
    }, 2000)
  }

const userPromise = getUser()

userPromise
  .then((user) => {
      return getTel(user.id)
          .then((result) => {
              return {
                  user: {
                    name: user.name,
                    id: user.id
                  },
                  tell: result
              }
          })
  })
  .then((results) => {
    const address = getAddressAsync(results.user.id)
    return address.then((result) => {
      return {
        user : results.user,
        tell: results.tell,
        address: result,
      }
    })
  })
  .then((result) => {
    console.log(`
      Name: ${result.user.name}
      Adress: ${result.address.address}, ${result.address.number}
      Tell: (${result.tell.ddd}) ${result.tell.tel}
    `);
  })
  .catch((error) => {
    console.error('get bad', error)
  })



  
// getUser((error, user)=> {
//     if (error) {
//       console.error("Got error in user", error);
//       return;
//     }
//     getTel(user.id, (error1, tel) => {
//       if (error1) {
//         console.error("Got error in telephone", error1);
//         return;
//       }
  
//       getAddress(user.id, (error2, address)=> {
//         if (error2) {
//           console.error("Got error in user", error2);
//           return;
//         }
        
//         console.log(`
//           Name: ${user.name},
//           Tel: (${tel.ddd}) ${tel.tel},
//           Address: ${address.address}, ${address.number}
//         `)
//       });
//     });
// });
  