import dotenv from 'dotenv';

import { Client } from 'pg';

dotenv.config({path: "../../.env"});

const client = new Client();
client.connect();

const query = `
  DROP TABLE IF EXISTS japanese;
`;

async function dropTableJapanese() {
  try {
    await client.query(query);
    await client.end();
  } catch(e) {
    await client.end();
    throw new Error("Something has gone wrong");
  }
}

dropTableJapanese();
