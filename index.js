// carrega o .env no process.env
require('dotenv').config()

// não sei como resolver o problema error self signed certificate...
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const { Client } = require('pg');

const client = new Client({ssl: true})

async function main () {
  try {
    // procurará pelas infos para conectar ao banco em process.env
    await client.connect();
     
    const res =  await client.query(`SELECT table_name from information_schema.tables where table_schema = 'public' `);
    console.log(res.rows);
  
  } catch(err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

try {
  main()
} catch (err) {
  console.error(err);
}