const client = require('./client.js');

const createOwner = async(ownerName) => {
  try {
    const { rows: [ owner ] } = await client.query(`
      INSERT INTO owners (name)
      VALUES('${ownerName}')
      RETURNING *;
    `);
    return owner;
  } catch (error) {
    console.log(error);
  }
}

const getOwners = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM owners;
    `);
    return rows;
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  createOwner,
  getOwners
}