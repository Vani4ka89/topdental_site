// Runs automatically after every `npm install`. Only builds when AUTO_BUILD=1
// is set explicitly (e.g. as a Hostinger Node.js App environment variable),
// so local `npm install` during development stays fast, and so it never
// double-builds on Heroku, which already runs `heroku-postbuild` (see
// package.json) and sets NODE_ENV=production during every deploy.
const {execSync} = require('child_process');

if (process.env.AUTO_BUILD === '1') {
    console.log('[postinstall] AUTO_BUILD=1 — building the frontend (npm run build)...');
    execSync('npm run build', {stdio: 'inherit'});
} else {
    console.log('[postinstall] Skipping automatic build (AUTO_BUILD is not "1"). Run `npm run build` manually when needed.');
}
