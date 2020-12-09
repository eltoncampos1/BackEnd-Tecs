var request = require('superagent')

var getUserFollowers = (username, callback) => {
    request
        .get(`https://api.github.com/users/${username}/followers`)
        .end((err, res) => {
            if (!err) {
                var users = res.body.map((user) => {
                    return user.login;
                });
                callback(null,users);
            }else {
                callback('Error Ocurred!');
            }
        })
}

module.exports = {
     getUserFollowers
}