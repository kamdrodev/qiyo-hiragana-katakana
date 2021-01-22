import express from 'express';
import { body, check } from 'express-validator';

import hiraganaControllers from '../controllers/hiragana.js';


const router = express.Router();

router.get(
  '/hiragana',
  hiraganaControllers.getAllHiraganaCharacters
)

router.get(
  '/hiragana/:id',
  [
    check('id').exists()
  ],
  hiraganaControllers.getHiraganaCharacterById
)

router.put(
  '/hiragana/:id/statistics/views',
  hiraganaControllers.updateHiraganaStatisticsViews
)

router.put(
  '/hiragana/:id/statistics/answers',
  hiraganaControllers.updateHiraganaStatisticsAnswers
)

export default router;
