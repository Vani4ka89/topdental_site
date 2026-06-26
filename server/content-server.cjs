const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const port = Number(process.env.CONTENT_PORT || 4000);
const contentFile = process.env.CONTENT_FILE || path.resolve(process.cwd(), 'data/site-content.json');
const adminPassword = process.env.CONTENT_ADMIN_PASSWORD || process.env.REACT_APP_ADMIN_PASSWORD || 'topdental-admin';
const bodyLimitBytes = Number(process.env.CONTENT_BODY_LIMIT_BYTES || 50 * 1024 * 1024);

const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.CONTENT_ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Admin-Password',
};

const getRequestPassword = (request) => {
    const headerPassword = request.get('X-Admin-Password');
    const authorization = request.get('Authorization') || '';

    if (typeof headerPassword === 'string' && headerPassword) {
        return headerPassword;
    }

    if (authorization.startsWith('Bearer ')) {
        return authorization.slice('Bearer '.length);
    }

    return '';
};

const isAuthorized = (request) => getRequestPassword(request) === adminPassword;

const readContent = async () => {
    try {
        const raw = await fs.readFile(contentFile, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        if (error && error.code === 'ENOENT') {
            return {};
        }

        throw error;
    }
};

const writeContent = async (content) => {
    await fs.mkdir(path.dirname(contentFile), {recursive: true});
    const tempFile = `${contentFile}.tmp`;
    await fs.writeFile(tempFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
    await fs.rename(tempFile, contentFile);
};

const removeContent = async () => {
    await fs.rm(contentFile, {force: true});
};

const asyncHandler = (handler) => (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
};

const contentJsonParser = express.json({
    limit: bodyLimitBytes,
    strict: false,
    type: () => true,
});

const requireAdmin = (request, response, next) => {
    if (!isAuthorized(request)) {
        response.status(401).json({error: 'Unauthorized'});
        return;
    }

    next();
};

const app = express();

app.disable('x-powered-by');

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
        name: 'TopDental content API',
        adminUrl: 'Open the React app at /admin, not this API URL.',
        endpoints: {
            health: '/health',
            content: '/content',
        },
    });
});

app.get('/health', (request, response) => {
    response.json({ok: true});
});

app.get('/content', asyncHandler(async (request, response) => {
    response.json(await readContent());
}));

app.post('/auth', requireAdmin, (request, response) => {
    response.json({ok: true});
});

app.put(
    '/content',
    requireAdmin,
    contentJsonParser,
    asyncHandler(async (request, response) => {
        if (request.body === undefined) {
            response.status(400).json({error: 'Request body is required'});
            return;
        }

        await writeContent(request.body);
        response.json({ok: true});
    }),
);

app.delete('/content', requireAdmin, asyncHandler(async (request, response) => {
    await removeContent();
    response.json({ok: true});
}));

app.use((request, response) => {
    response.status(404).json({error: 'Not found'});
});

app.use((error, request, response, next) => {
    const statusCode = error && Number.isInteger(error.status) ? error.status : 500;

    response.status(statusCode).json({
        error: error instanceof Error ? error.message : 'Internal server error',
    });
});

const server = app.listen(port, () => {
    console.log(`TopDental content API listening on http://localhost:${port}`);
    console.log(`Content file: ${contentFile}`);
});

server.on('error', (error) => {
    if (error && error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
        console.error(`Stop the existing process or run with another port: CONTENT_PORT=4001 npm run content:server`);
        process.exit(1);
    }

    throw error;
});
