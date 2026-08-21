// Unified production entry point: serves the built React app (./build) and
// the forms API from a single Node process on a single port. This is what
// the Heroku Procfile runs.
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

// CORS - safety net for the forms API. Normally the page and the API share
// the same origin (this same server), so no CORS is needed. But the React
// build's REACT_APP_API_URL is baked in at build time, so a stale build (or
// one built without that var pinned to an empty string) can end up calling
// this server from a *different* origin than the one that served the page -
// e.g. www.topdental.te.ua vs topdental.te.ua vs the raw *.herokuapp.com
// host. Without this, the browser silently blocks the request client-side
// (the API itself would have handled it fine) and the form shows a generic
// "failed to send" error. The forms endpoints carry no auth/cookies, so
// reflecting/allowing the origin is safe; set FORMS_ALLOWED_ORIGIN to lock
// this down to a specific origin instead of the default wildcard.
const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.FORMS_ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

app.use((request, response, next) => {
    response.set(corsHeaders);

    if (request.method === 'OPTIONS') {
        response.status(204).end();
        return;
    }

    next();
});

// Forms API first, so /users/second_form is never shadowed by the
// static/SPA fallback below.
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
