import { validationResult } from 'express-validator';
import { Client } from 'pg';

const getAllHiraganaCharacters = async (req, res, next) => {

  const client = new Client();

  try {  
    client.connect();

    const getAllHiraganaCharactersQuery = `SELECT * FROM hiragana;`;
    const { rows } = await client.query(getAllHiraganaCharactersQuery);
    
    return res.json({'listOfHiraganaCharacters': rows});
  } catch(e) { 
    const customError = new Error('Something has gone wrong');
    customError.status = 400;
    return next(customError);
  } finally {
    client.end();
  }
}

const getHiraganaCharacterById = async (req, res, next) => {

  const client = new Client();

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const customError = new Error('Validation error');
      customError.status = 400;
      return next(customError);
    }
  
    client.connect();
    
    const getHiraganaCharacterByIdQuery = `SELECT * FROM hiragana WHERE id = $1;`;
    const { rows } = await client.query(getHiraganaCharacterByIdQuery, [req.params.id]);
    client.end();    
    
    return res.json({'hiraganaCharacter': rows});
  } catch(e) {
    console.log(e);
    const customError = new Error('Something has gone wrong');
    customError.status = 400;
    return next(customError);
  } finally {
    client.end();
  }
}

const hiragana = {
  getAllHiraganaCharacters,
  getHiraganaCharacterById
}

export default hiragana;
