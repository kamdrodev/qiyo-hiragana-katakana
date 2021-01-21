import { validationResult } from 'express-validator';
import { Client } from 'pg';

const getAllKatakanaCharacters = async (req, res, next) => {

  const client = new Client();

  try {  
    client.connect();

    const getAllKatakanaCharactersQuery = `SELECT * FROM katakana;`;
    const { rows } = await client.query(getAllKatakanaCharactersQuery);
    
    return res.json({'listOfKatakanaCharacters': rows});
  } catch(e) { 
    const customError = new Error('Something has gone wrong');
    customError.status = 400;
    return next(customError);
  } finally {
    client.end();
  }
}

const getKatakanaCharacterById = async (req, res, next) => {

  const client = new Client();

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const customError = new Error('Validation error');
      customError.status = 400;
      return next(customError);
    }
  
    client.connect();
    
    const getKatakanaCharacterByIdQuery = `SELECT * FROM katakana WHERE id = $1;`;
    const { rows } = await client.query(getKatakanaCharacterByIdQuery, [req.params.id]);
    client.end();    
    
    return res.json({'katakanaCharacter': rows});
  } catch(e) {
    console.log(e);
    const customError = new Error('Something has gone wrong');
    customError.status = 400;
    return next(customError);
  } finally {
    client.end();
  }
}
const katakana = {
  getAllKatakanaCharacters,
  getKatakanaCharacterById
}

export default katakana;
