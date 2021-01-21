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

export default router;
