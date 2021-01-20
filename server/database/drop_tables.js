import dotenv from 'dotenv';

import { Client } from 'pg';

dotenv.config({path: "./../.env"});

const client = new Client();
client.connect();

const query_table_hiragana = `
  DROP TABLE IF EXISTS hiragana;
`;

const query_table_katakana = `
  DROP TABLE IF EXISTS katakana;
`;

async function dropTableHiragana() {
  try {
    await client.query(query_table_hiragana);
  } catch(e) {
    throw new Error("Something has gone wrong");
  }
}

async function dropTableKatakana() {
  try {
    await client.query(query_table_katakana);
  } catch(e) {
    throw new Error("Something has gone wrong");
  }
}

async function dropTables() {
  try {
    await dropTableHiragana();
    await dropTableKatakana();
    await client.end();
  } catch(e) {
    await client.end(); 
    throw new Error("Something has gone wrong");
  }
}

dropTables();
