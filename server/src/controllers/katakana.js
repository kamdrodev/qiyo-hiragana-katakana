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

const updateKatakanaStatisticsViews = async (req, res, next) => {
  
  const client = new Client();

  try {
    client.connect();
    const updateKatakanaStatisticsViewsQuery = `UPDATE katakana set views = views + 1 WHERE id = $1;`;
    const { rows } = await client.query(updateKatakanaStatisticsViewsQuery, [req.params.id]);

    return res.json({'message': 'Statistics have been updated'});
  } catch (e) {
    const customError = new Error('Something has gone wrong');
    customError.status = 400;
    return next(customError);
  } finally {
    client.end();
  }
}

const updateKatakanaStatisticsAnswers = async (req, res, next) => {
  
  const client = new Client();

  try {
    if (req.body.answerStatus === 'correct') {
      client.connect();
      const updateKatakanaStatisticsCorrectAnswersQuery = `UPDATE katakana set correct_answers = correct_answers + 1 WHERE id = $1;`;
      const { rows } = await client.query(updateKatakanaStatisticsCorrectAnswersQuery, [req.params.id]);

      return res.json({'message': 'Statistics have been updated'});
    } else if (req.body.answerStatus === 'incorrect') {
      client.connect();
      const updateKatakanaStatisticsIncorrectAnswersQuery = `UPDATE katakana set incorrect_answers = incorrect_answers + 1 WHERE id = $1;`;
      const { rows } = await client.query(updateKatakanaStatisticsIncorrectAnswersQuery, [req.params.id]);

      return res.json({'message': 'Statistics have been updated'});
    } else {
      return res.json({'message': 'Something has gone wrong'});
    }
   
  } catch (e) {
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
  getKatakanaCharacterById,
  updateKatakanaStatisticsViews,
  updateKatakanaStatisticsAnswers
}

export default katakana;
