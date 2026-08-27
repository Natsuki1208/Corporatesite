import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const endpoint = 'http://127.0.0.1:9223';
const output = resolve(process.env.QA_OUTPUT || 'qa-screenshots');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4331/Corporatesite/';
await mkdir(output, { recursive: true });

async function connect(url) {
  const target = await fetch(`${endpoint}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' }).then((response) => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok, fail) => { socket.addEventListener('open', ok, { once: true }); socket.addEventListener('error', fail, { once: true }); });
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve: done, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : done(message.result);
  });
  const send = (method, params = {}) => new Promise((done, reject) => {
    const current = ++id;
    pending.set(current, { resolve: done, reject });
    socket.send(JSON.stringify({ id: current, method, params }));
  });
  return { target, socket, send };
}

async function capture(name, hash, width, height, locale = '', reduced = false) {
  const pageUrl = `${base}${locale}?qa-screenshot#${hash}`;
  const { target, socket, send } = await connect(pageUrl);
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  if (reduced) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await new Promise((ok) => setTimeout(ok, 900));
  await send('Runtime.evaluate', { expression: `document.getElementById(${JSON.stringify(hash)})?.scrollIntoView({block:'start'}); document.documentElement.classList.add('qa-screenshot');` });
  await new Promise((ok) => setTimeout(ok, 700));
  const { data } = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
  await writeFile(resolve(output, `${name}.png`), Buffer.from(data, 'base64'));
  socket.close();
  await fetch(`${endpoint}/json/close/${target.id}`);
  console.log(`${name}.png`);
}

if (process.env.REDUCED_ONLY === '1') {
  await capture('reduced-motion-hero', 'hero', 1440, 900, '', true);
} else {
  const desktop = [['00-hero','hero'],['01-products','products'],['02-control','control'],['03-leadership','leadership'],['04-contact','contact']];
  for (const [name, hash] of desktop) await capture(`desktop-${name}`, hash, 1440, 900);
  for (const hash of ['hero','products','control','leadership','contact']) await capture(`mobile-${hash}`, hash, 390, 844);
}
