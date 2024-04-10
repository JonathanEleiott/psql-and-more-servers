# psql & more servers

## PostgreSQL - (psql)

- database software
- can hold multipl databases
- commands
  - \l -> list all databases
  - \c name_of_database -> connect to the database
  - \d -> display the tables in the database

## pg package (postgres)

- allows us to easily send SQL commands from our code to the database
- client = connection information
  - client.connect() -> open a connection to the database
  - client.query -> send SQL to the database
  - client.end() -> ends a connection to the database

## Seed File -  a file to create mock data in our database thot will be used by devs and QA for testing

- Creating tables
  - Creating Tables
    - SERIAL - starts at 1 and goes up by one everytime a new record is created
    - REFERENCES table_name(column) -> foreign key
    - UNIQUE - must be different from every other row
  - Dropping Tables
    - IF EXISTS -> chekcs if the table exists before dropping

## DB Table Files

- conatin functions that will be used by botht he seed file and by the server
- when inserting or deleting, you can use "RETURNING *" to retrieve the row just added or deleted

## Servers

- POST requests with a body MUST have either express.json() or express.urlencoded({extended: true}) based on how you are sending the body
  - x-www-form-urlencoded -> express.urlencoded({extended: true})
  - raw -> express.json()
- app.use - middleware
  - used to catch a request and do something before sending the request on to other routes
- next - function that tells Express to go on to the next route that matches
- error handler
  - allows us to send custom information
- HTTP Response Codes - used to let the frontend know what happened