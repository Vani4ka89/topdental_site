require('dotenv').config();

const express = require('express');
const {createFormsRouter} = require('./forms-router.cjs');

const port = Number(process.env.FORMS_PORT || 4002);

const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.FORMS_ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.use((request, response, next) => {
    response.set(corsHeaders);

    if (request.method === 'OPTIONS') {
        response.status(204).end();
        return;
    }

    next();
});

app.get('/', (request, response) => {
    response.json({
        name: 'TopDental forms API',
        endpoints: {
            health: '/health',
            firstForm: 'POST /users/first_form',
            secondForm: 'POST /users/second_form',
        },
    });
});

app.use(createFormsRouter());

app.use((request, response) => {
    response.status(404).json({error: 'Not found'});
});

app.use((error, request, response, next) => {
    console.error('[forms-server]', error);
    const statusCode = error && Number.isInteger(error.status) ? error.status : 500;

    response.status(statusCode).json({
        error: error instanceof Error ? error.message : 'Internal server error',
    });
});

const server = app.listen(port, () => {
    console.log(`TopDental forms API listening on http://localhost:${port}`);
});

server.on('error', (error) => {
    if (error && error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
        console.error(`Stop the existing process or run with another port: FORMS_PORT=4003 npm run forms:server`);
        process.exit(1);
    }

    throw error;
});
