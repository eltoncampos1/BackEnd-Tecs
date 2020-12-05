const express  = require('express');
const { v4: uuidv4, isUuid } = require('uuid');

const app = express();

app.use(express.json());


const projects = [];


function logRequests(request, response, next) {
    const {method, url} = request;

    const loglabel = `[${method.toUpperCase()}] ${url}`;

    console.time(loglabel);

    next();

    console.timeEnd(loglabel);

}

function validateProjectsId (request,response,next) {
    const {id} = request.params;

    if(!isUuid(id)) {
        return response.status(400).json({error: "invalid project id"});
    }

    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectsId);

app.get('/projects', (request, response) => {
    const {title} = request.query;


    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuidv4(), title, owner};

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id',validateProjectsId,(request,response) => {
    const { id } = request.params;
    const { title, owner } = request.body;


    const projectIndex = projects.findIndex(project => project.id === id);

    if ( projectIndex < 0) {
        return response.status(400).json({ error: "project not found"})
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id',validateProjectsId,(request,response) => {

    const { id } =  request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if ( projectIndex < 0) {
        return response.status(400).json({ error: "project not found"})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('Back-end Started!');
});
