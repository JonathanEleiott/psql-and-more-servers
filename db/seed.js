const client = require('./client.js');
const { createOwner, getOwners } = require('./owners.js')

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL,
        type VARCHAR(20) NOT NULL,
        owner_id INTEGER REFERENCES owners(id)
      );
    `);
  } catch (error) {
    console.log(error);
  }
}

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS pets;
      DROP TABLE IF EXISTS owners;
    `)
  } catch (error) {
    console.log(error)
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log(`CONNECTED TO THE DB`);

  await dropTables();
  console.log(`TABLES DROPPED`);

  await createTables();
  console.log(`TABLES CREATED`);

  await createOwner('Bill');
  await createOwner('Charles');
  await createOwner('Paula');
  await createOwner('Gregory');

  const allOwners = await getOwners();
  console.log(`ALL OWNERS`, allOwners);

  await client.end();
  console.log(`CONNECTION ENDED`);
}

syncAndSeed();
