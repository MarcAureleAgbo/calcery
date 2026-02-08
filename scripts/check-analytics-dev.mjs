import { spawn } from 'node:child_process';
import process from 'node:process';

const PORT = 4327;
const HOST = '127.0.0.1';
const TARGET_URL = `http://${HOST}:${PORT}/`;
const GA_SNIPPET = 'https://www.googletagmanager.com/gtag/js?id=G-78C5EBM22T';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return true;
      }
    } catch {}
    await sleep(500);
  }
  return false;
}

function stopServer(child) {
  if (!child.killed) {
    child.kill('SIGTERM');
  }
}

const devServer = spawn('npm', ['run', 'dev', '--', '--host', HOST, '--port', String(PORT)], {
  stdio: 'ignore',
  shell: process.platform === 'win32',
});

try {
  const ready = await waitForServer(TARGET_URL);
  if (!ready) {
    throw new Error('Dev server did not start in time.');
  }

  const response = await fetch(TARGET_URL);
  const html = await response.text();
  const hasGa = html.includes(GA_SNIPPET) || html.includes('G-78C5EBM22T');

  if (hasGa) {
    throw new Error('GA4 script was found in development HTML.');
  }

  console.log('OK: GA4 script is not included in development mode.');
} catch (error) {
  console.error(`FAILED: ${error.message}`);
  stopServer(devServer);
  process.exit(1);
}

stopServer(devServer);
