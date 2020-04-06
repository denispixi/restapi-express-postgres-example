# restapi-express-postgres-example

* setup a PostgreSQL server and create a test database
* create a table named test with the following sentence:
  ```
  CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title character varying(100),
    description character varying(100)
  );
  ```
* replace the values in the pool config in the `src/controllers/indes.js` file
* install the modules and run the project with the `start` command in the `package.json` file
