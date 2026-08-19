// Unified production entry point: serves the built React app (./build) and
// the forms API from a single Node process on a single port - the shape
// Hostinger's "Node.js App" (one startup file per app) expects.
//
// Run `npm run build` before starting this (or as part of your deploy step).
require('dotenv').config();

const express = require('express');
const path = require('path');
const {createFormsRouter} = require('./forms-router.cjs');

const port = Number(process.env.PORT || process.env.FORMS_PORT || 3000);
const buildDir = path.join(__dirname, '..', 'build');

const app = express();

app.disable('x-powered-by');
app.use(express.json());

// Forms API first, so /users/first_form and /users/second_form are never
// shadowed by the static/SPA fallback below.
app.use(createFormsRouter());

app.use(express.static(buildDir));

// Client-side routing (react-router) - any other GET falls back to
// index.html so a hard refresh on e.g. /contacts still works.
app.get('*', (request, response) => {
    response.sendFile(path.join(buildDir, 'index.html'));
});

app.use((request, response) => {
    response.status(404).json({error: 'Not found'});
});

app.use((error, request, response, next) => {
    console.error('[app]', error);
    const statusCode = error && Number.isInteger(error.status) ? error.status : 500;

    response.status(statusCode).json({
        error: error instanceof Error ? error.message : 'Internal server error',
    });
});

const server = app.listen(port, () => {
    console.log(`TopDental site + forms API listening on http://localhost:${port}`);
    console.log(`Serving static build from: ${buildDir}`);
});

server.on('error', (error) => {
    if (error && error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
        process.exit(1);
    }

    throw error;
});
