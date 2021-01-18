import dotenv from 'dotenv';

import { Client } from 'pg';

import listOfHiraganaCharacters from './hiragana.json';

dotenv.config({path: "./../.env"});

const client = new Client();
client.connect();

const query = `
CREATE TABLE IF NOT EXISTS japanese (
  id serial PRIMARY KEY,
  hiragana varchar,
  romaji varchar,
  created_at timestamp NOT NULL DEFAULT NOW()
);
`;

async function createTableJapaneses() {
  try {
    await client.query(query);
  } catch(e) {
    throw new Error("Something has gone wrong");
  }
}

async function fillTableJapaneseWithHiraganaCharacters() {
  try {
    for (let obj in listOfHiraganaCharacters) {
      await client.query(
        `INSERT INTO japanese(hiragana, romaji) VALUES($1, $2)`,
        [listOfHiraganaCharacters[obj].hiragana, listOfHiraganaCharacters[obj].romaji]
      );
    }
  } catch(e) {
    throw new Error("Something has gone wrong");
  }
}

async function initTableJapanese() {
  try {
    await createTableJapaneses();
    await fillTableJapaneseWithHiraganaCharacters();
    await client.end();
  } catch(e) {
    console.log(e);
    await client.end(); 
    throw new Error('Something has gone wrong: initTableJapanese');
  }
}

initTableJapanese();

