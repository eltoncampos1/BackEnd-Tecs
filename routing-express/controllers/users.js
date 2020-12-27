import { v4 as uuid } from 'uuid';

let users = [];

export const createuser =  (request, response) => {
    const user = request.body;
    
    users.push({...user, id: uuid()});

    response.send(`The user ${user.firstName} has added to DB`)
}

export const getUser =  (request, response) => {
    response.send(users);
}

export const updateUser =  (request, response) => {
    const {id} = request.params;
    const {firstName, lastName, age} = request.body;
    const user = users.find(user => user.id === id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;

    response.send(`User with the id ${id} has been updated`)
}

export const deleteUser =  (request, response) => {
    const {id} = request.params;

    users = users.filter(user => user.id !== id);

    response.send(`User with id ${id} has deleted from database`)
}

export const findUser =  (request, response) => {
    const {id} = request.params;

    const findUser = users.find(user => user.id === id);
    
    response.send(findUser)
}