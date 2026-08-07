const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { once } = require('node:events');
const { app } = require('../server');

let server;
let baseUrl;

async function startServer() {
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
});

test('creates, updates and deletes a student', async () => {
  const createResult = await request('/api/students', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Student',
      rollNo: 'CS9999001',
      department: 'Computer Science',
      semester: 5,
      email: 'test@college.com',
      phone: '9999999999',
      avatar: 'TS',
      status: 'active'
    })
  });

  assert.equal(createResult.response.status, 201);
  assert.equal(createResult.body.name, 'Test Student');
  const studentId = createResult.body.id;

  const updateResult = await request(`/api/students/${studentId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Updated Student' })
  });

  assert.equal(updateResult.response.status, 200);
  assert.equal(updateResult.body.name, 'Updated Student');

  const deleteResult = await request(`/api/students/${studentId}`, {
    method: 'DELETE'
  });

  assert.equal(deleteResult.response.status, 200);
  assert.equal(deleteResult.body.message, 'Student deleted successfully');

  const getResult = await request(`/api/students/${studentId}`);
  assert.equal(getResult.response.status, 404);
});
