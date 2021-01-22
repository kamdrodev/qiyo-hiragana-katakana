import express from 'express';
import { body, check } from 'express-validator';

import katakanaControllers from '../controllers/katakana.js';


const router = express.Router();

router.get(
  '/katakana',
  katakanaControllers.getAllKatakanaCharacters
)

router.get(
  '/katakana/:id',
  [
    check('id').exists()
  ],
  katakanaControllers.getKatakanaCharacterById
)

router.put(
  '/katakana/:id/statistics/views',
  katakanaControllers.updateKatakanaStatisticsViews
)

router.put(
  '/katakana/:id/statistics/answers',
  katakanaControllers.updateKatakanaStatisticsAnswers
)

export default router;
