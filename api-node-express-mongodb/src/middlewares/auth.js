const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
    const token_header = request.headers.auth;

    if(!token_header)  {
        return response.status(401).send({ error: "unauthenticated user"});
    };

    jwt.verify(token_header, 'supersenhafodasecretangmvaiimaginarisso', (err,decoded) => {
        if(err) {
            return response.status(401).send({ error: "Invalid Token"});
        };

        response.locals.auth_data = decoded;

        return next();
    });
};

module.exports = auth;