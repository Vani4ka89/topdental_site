const http = require('http');
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

const send = (response, statusCode, body = '', headers = {}) => {
    response.writeHead(statusCode, {
        ...corsHeaders,
        ...headers,
    });
    response.end(body);
};

const sendJson = (response, statusCode, payload) => {
    send(response, statusCode, JSON.stringify(payload), {'Content-Type': 'application/json; charset=utf-8'});
};

const getRequestPassword = (request) => {
    const headerPassword = request.headers['x-admin-password'];
    const authorization = request.headers.authorization || '';

    if (typeof headerPassword === 'string' && headerPassword) {
        return headerPassword;
    }

    if (authorization.startsWith('Bearer ')) {
        return authorization.slice('Bearer '.length);
    }

    return '';
};

const isAuthorized = (request) => getRequestPassword(request) === adminPassword;

const readBody = (request) => (
    new Promise((resolve, reject) => {
        let body = '';

        request.on('data', chunk => {
            body += chunk;

            if (Buffer.byteLength(body) > bodyLimitBytes) {
                reject(new Error('Request body is too large'));
                request.destroy();
            }
        });

        request.on('end', () => resolve(body));
        request.on('error', reject);
    })
);

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

const server = http.createServer(async (request, response) => {
    const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

    if (request.method === 'OPTIONS') {
        send(response, 204);
        return;
    }

    try {
        if (request.method === 'GET' && url.pathname === '/') {
            sendJson(response, 200, {
                name: 'TopDental content API',
                adminUrl: 'Open the React app at /admin, not this API URL.',
                endpoints: {
                    health: '/health',
                    content: '/content',
                },
            });
            return;
        }

        if (request.method === 'GET' && url.pathname === '/health') {
            sendJson(response, 200, {ok: true});
            return;
        }

        if (request.method === 'GET' && url.pathname === '/content') {
            sendJson(response, 200, await readContent());
            return;
        }

        if (request.method === 'POST' && url.pathname === '/auth') {
            if (!isAuthorized(request)) {
                sendJson(response, 401, {error: 'Unauthorized'});
                return;
            }

            sendJson(response, 200, {ok: true});
            return;
        }

        if (request.method === 'PUT' && url.pathname === '/content') {
            if (!isAuthorized(request)) {
                sendJson(response, 401, {error: 'Unauthorized'});
                return;
            }

            const rawBody = await readBody(request);
            await writeContent(JSON.parse(rawBody));
            sendJson(response, 200, {ok: true});
            return;
        }

        if (request.method === 'DELETE' && url.pathname === '/content') {
            if (!isAuthorized(request)) {
                sendJson(response, 401, {error: 'Unauthorized'});
                return;
            }

            await removeContent();
            sendJson(response, 200, {ok: true});
            return;
        }

        sendJson(response, 404, {error: 'Not found'});
    } catch (error) {
        sendJson(response, 500, {
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
});

server.on('error', (error) => {
    if (error && error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
        console.error(`Stop the existing process or run with another port: CONTENT_PORT=4001 npm run content:server`);
        process.exit(1);
    }

    throw error;
});

server.listen(port, () => {
    console.log(`TopDental content API listening on http://localhost:${port}`);
    console.log(`Content file: ${contentFile}`);
});
