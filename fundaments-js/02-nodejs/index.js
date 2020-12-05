
function getUser(callback) {
    setTimeout(() => {
      return callback(null, {
        id: 1,
        name: "elton"
      });
    }, 1000);
  }
  
  function getTel(userId, callback) {
    setTimeout(() => {
      return callback(null, {
        tel: "1234-56789",
        ddd: 11
      });
    }, 2000);
  }
  
  function getAddress(userId, callback) {
    setTimeout(() => {
      return callback(null, {
        address: "Silicon valey",
        number : 1000,
      })
    }, 2000)
  }
  
  getUser(function resolveUser(error, user) {
    if (error) {
      console.error("Got error in user", error);
      return;
    }
    getTel(user.id, function (error1, tel) {
      if (error1) {
        console.error("Got error in telephone", error1);
        return;
      }
  
      getAddress(user.id, function (error2, address) {
        if (error2) {
          console.error("Got error in user", error2);
          return;
        }
        
        console.log(`
          Name: ${user.name},
          Tel: (${tel.ddd}) ${tel.tel},
          Address: ${address.address}, ${address.number}
        `)
      });
    });
  });
  