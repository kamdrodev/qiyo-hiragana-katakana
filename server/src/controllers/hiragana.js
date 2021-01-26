import { validationResult } from 'express-validator';
import { Client } from 'pg';

const getAllHiraganaCharacters = async (req, res, next) => {

  const client = new Client();

  try {  
    client.connect();

    const getAllHiraganaCharactersQuery = `SELECT * FROM hiragana;`;
    const { rows } = await client.query(getAllHiraganaCharactersQuery);
    
    return res.json({ 'message': 'List has been fetched', 'listOfHiraganaCharacters': rows });
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
    
    return res.json({ message: 'Hiragana character has been fetched', hiraganaCharacter: rows });
  } catch(e) {
    const customError = new Error('Something has gone wrong');
    customError.status = 400;
    return next(customError);
  } finally {
    client.end();
  }
}

const updateHiraganaStatisticsViews = async (req, res, next) => {
  
  const client = new Client();

  try {
    client.connect();
    const updateHiraganaStatisticsViewsQuery = `UPDATE hiragana set views = views + 1 WHERE id = $1;`;
    const { rows } = await client.query(updateHiraganaStatisticsViewsQuery, [req.params.id]);

    return res.json({ 'message': 'Statistics have been updated' });
  } catch (e) {
    const customError = new Error('Something has gone wrong');
    customError.status = 400;
    return next(customError);
  } finally {
    client.end();
  }
}

const updateHiraganaStatisticsAnswers = async (req, res, next) => {
  
  const client = new Client();

  try {
    if (req.body.answerStatus === 'correct') {
      client.connect();
      const updateHiraganaStatisticsCorrectAnswersQuery = `UPDATE hiragana set correct_answers = correct_answers + 1 WHERE id = $1;`;
      const { rows } = await client.query(updateHiraganaStatisticsCorrectAnswersQuery, [req.params.id]);

      return res.json({ 'message': 'Statistics have been updated' });
    } else if (req.body.answerStatus === 'incorrect') {
      client.connect();
      const updateHiraganaStatisticsIncorrectAnswersQuery = `UPDATE hiragana set incorrect_answers = incorrect_answers + 1 WHERE id = $1;`;
      const { rows } = await client.query(updateHiraganaStatisticsIncorrectAnswersQuery, [req.params.id]);

      return res.json({ 'message': 'Statistics have been updated' });
    } else {
      return res.json({ 'message': 'Something has gone wrong' });
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

const hiragana = {
  getAllHiraganaCharacters,
  getHiraganaCharacterById,
  updateHiraganaStatisticsViews,
  updateHiraganaStatisticsAnswers
}

export default hiragana;
