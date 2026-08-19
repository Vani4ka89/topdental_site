// Runs automatically after `npm install`. Only builds when NODE_ENV=production
// (Hostinger's Node.js Apps set this by default) so local `npm install` during
// development stays fast and doesn't rebuild on every dependency change.
const {execSync} = require('child_process');

if (process.env.NODE_ENV === 'production') {
    console.log('[postinstall] NODE_ENV=production — building the frontend (npm run build)...');
    execSync('npm run build', {stdio: 'inherit'});
} else {
    console.log('[postinstall] Skipping automatic build (NODE_ENV is not "production"). Run `npm run build` manually when needed.');
}
