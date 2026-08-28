const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { once } = require('node:events');
const jwt = require('jsonwebtoken');
const { app } = require('../server');
const sequelize = require('../config/database');

let server;
let baseUrl;
const JWT_SECRET = process.env.JWT_SECRET || 'test_secret_for_jwt_testing_32chars_long';

async function startServer() {
  process.env.JWT_SECRET = JWT_SECRET;
  server = http.createServer(app);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
}

async function stopServer() {
  if (server) {
    server.close();
    await once(server, 'close').catch(() => {});
  }
  if (sequelize && typeof sequelize.close === 'function') {
    await sequelize.close().catch(() => {});
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : await response.text();
  return { response, body };
}

test.before(async () => {
  await startServer();
});

test.after(async () => {
  await stopServer();
  setTimeout(() => process.exit(0), 100);
});

test('health check returns ok', async () => {
  const result = await request('/api/health');
  assert.equal(result.response.status, 200);
  assert.equal(result.body.status, 'ok');
});

test('root endpoint returns server info', async () => {
  const result = await request('/');
  assert.equal(result.response.status, 200);
  assert.equal(result.body.status, 'online');
});

