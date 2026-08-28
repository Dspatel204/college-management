const http = require('http');
const assert = require('assert');
const { app } = require('../server');

async function runTests() {
  console.log('🚀 Running Backend API Endpoint Tests...');
  const server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const { port } = server.address();

  function req(pathname, options = {}) {
    return new Promise((resolve, reject) => {
      const { method = 'GET', headers = {}, body } = options;
      const requestOptions = {
        hostname: '127.0.0.1',
        port,
        path: pathname,
        method,
        headers: {
          'Connection': 'close',
          ...headers,
        },
      };


      const clientReq = http.request(requestOptions, (clientRes) => {
        let rawData = '';
        clientRes.on('data', (chunk) => { rawData += chunk; });
        clientRes.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(rawData);
          } catch {
            parsed = rawData;
          }
          resolve({
            res: { status: clientRes.statusCode, headers: clientRes.headers },
            body: parsed,
          });
        });
      });

      clientReq.on('error', reject);
      if (body) {
        clientReq.write(body);
      }
      clientReq.end();
    });
  }


  try {
    // 1. Health check
    console.log('✔ Testing GET /api/health...');
    const h1 = await req('/api/health');
    assert.strictEqual(h1.res.status, 200);
    assert.strictEqual(h1.body.status, 'ok');

    console.log('✔ Testing GET /health...');
    const h2 = await req('/health');
    assert.strictEqual(h2.res.status, 200);
    assert.strictEqual(h2.body.status, 'ok');

    // 2. Server root
    console.log('✔ Testing GET /...');
    const r1 = await req('/');
    assert.strictEqual(r1.res.status, 200);
    assert.strictEqual(r1.body.status, 'online');
    assert.ok(r1.body.nodeVersion);

    // 3. API directory
    console.log('✔ Testing GET /api...');
    const apiRes = await req('/api');
    assert.strictEqual(apiRes.res.status, 200);
    assert.strictEqual(apiRes.body.message, 'College Management API');

    // 4. Auth login GET
    console.log('✔ Testing GET /api/auth/login...');
    const authGet = await req('/api/auth/login');
    assert.strictEqual(authGet.res.status, 405);
    assert.strictEqual(authGet.body.method, 'POST');

    // 5. Auth login POST empty
    console.log('✔ Testing POST /api/auth/login without body...');
    const authPost = await req('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.strictEqual(authPost.res.status, 400);

    // 6. 404 Route
    console.log('✔ Testing 404 handler...');
    const notFound = await req('/api/non-existent-test');
    assert.strictEqual(notFound.res.status, 404);
    assert.ok(notFound.body.message.includes('not found'));

    console.log('\n🎉 ALL 7 TEST CASES PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    server.close();
    process.exit(0);
  }
}

runTests();



