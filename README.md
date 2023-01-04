# Node18

database
    - mongo db

src -all source code
    - entities - object mappins
    - factories - instance generators
    - repositories - data access
    - routes - endpoint mappins
    - services - communication between the routes and repositories layer (business logic)
    - util - shared code
    - handler - communication between routes and server
    - index -

tests -> all automated test suites
    - integrations test - testing on the user point of view E2E test because there's no app consuming integrations

    - unit test - all tests that must run wihtout any external connections such as databases, external APIs
