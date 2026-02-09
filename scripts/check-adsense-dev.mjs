import { spawn } from 'node:child_process';
import process from 'node:process';

const PORT = 4328;
const HOST = '127.0.0.1';
const TARGET_URL = `http://${HOST}:${PORT}/`;
const ADSENSE_SNIPPET =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8558147642222882';

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
  const hasAdsense = html.includes(ADSENSE_SNIPPET) || html.includes('ca-pub-8558147642222882');

  if (hasAdsense) {
    throw new Error('Adsense script was found in development HTML.');
  }

  console.log('OK: Adsense script is not included in development mode.');
} catch (error) {
  console.error(`FAILED: ${error.message}`);
  stopServer(devServer);
  process.exit(1);
}

stopServer(devServer);
