import dotenv from 'dotenv';

import { Client } from 'pg';

import listOfHiraganaCharacters from './hiragana.json';
import listOfKatakanaCharacters from './katakana.json';

dotenv.config({path: "./../.env"});

const client = new Client();
client.connect();

const query_table_hiragana = `
  CREATE TABLE IF NOT EXISTS hiragana (
    id serial PRIMARY KEY,
    hiragana varchar,
    romaji varchar,
    created_at timestamp NOT NULL DEFAULT NOW(),
    views INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    incorrect_answers INT DEFAULT 0
  );
`;

const query_table_katakana = `
  CREATE TABLE IF NOT EXISTS katakana (
    id serial PRIMARY KEY,
    katakana varchar,
    romaji varchar,
    created_at timestamp NOT NULL DEFAULT NOW(),
    views INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    incorrect_answers INT DEFAULT 0
  );
`;

async function createTableHiragana() {
  try {
    await client.query(query_table_hiragana);
  } catch(e) {
    console.log(e);
    throw new Error("Something has gone wrong"); 
  }
}

async function createTableKatakana() {
  try {
    await client.query(query_table_katakana);
  } catch(e) {
    console.log(e) ;
    throw new Error("Something has gone wrong");
  }
}

async function fillTableHiraganaWithHiraganaCharacters() {
  try {
    for (let obj in listOfHiraganaCharacters) {
      await client.query(
        `INSERT INTO hiragana(hiragana, romaji) VALUES($1, $2)`,
        [listOfHiraganaCharacters[obj].hiragana, listOfHiraganaCharacters[obj].romaji]
      );
    }
  } catch(e) {
    throw new Error("Something has gone wrong");
  }
}

async function fillTableKatakanaWithKatakanaCharacters() {
  try {
    for (let obj in listOfKatakanaCharacters) {
      await client.query(
        `INSERT INTO katakana(katakana, romaji) VALUES($1, $2)`,
        [listOfKatakanaCharacters[obj].katakana, listOfKatakanaCharacters[obj].romaji]
      );
    }
  } catch(e) {
    throw new Error("Something has gone wrong");
  }
}

async function initTableJapanese() {
  try {
    await createTableHiragana();
    await createTableKatakana();
    await fillTableHiraganaWithHiraganaCharacters();
    await fillTableKatakanaWithKatakanaCharacters();
    await client.end();
  } catch(e) {
    console.log(e);
    await client.end(); 
    throw new Error('Something has gone wrong: initTableJapanese');
  }
}

initTableJapanese();

