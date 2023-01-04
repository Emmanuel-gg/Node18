import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'
test('Person Integration Test Suite', async (t) => {
  const testPort = 9010

  // that's bad practice because it mutates the environment
  process.env.PORT = testPort
  const { server } = await import('../../src/index.js')

  const testServerAddress = `http://localhost:${testPort}/person`

  await t.test('should create a person', async (t) => {
    const expected = {
      "name": "John",
      "age": "30",
      "city": "New York"
    }
    const request = await fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(expected)
    })

    assert.deepStrictEqual(request.headers.get('Content-Type'), 'application/json', 'Content-Type should be application/json')

    assert.strictEqual(request.status, 201, 'Status code should be 201')

    const result = await request.json()

    assert.deepStrictEqual(result.message, 'Person created with success!', 'Message should be Person created with success!')

    const id = result.data.id
    delete result.data.id

    assert.ok(id.length > 30, 'Id should be a string with more than 30 characters')

    assert.deepStrictEqual(result.data, expected, 'Data should be the same as expected')
  })

  await promisify(server.close.bind(server))()

})