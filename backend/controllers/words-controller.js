const wordsService = require('../service/words-service');
const ApiError = require('../exceptions/api-error');

class WordsController {
 async addWord(req, res, next) {
  try {
   const { userId, word, wordTranslate } = req.body;
   const wordData = await wordsService.addWord(userId, word, wordTranslate);
   return res.json(wordData);
  } catch (e) {
   next(e);
  }
 }

 async removeWord(req, res, next) {
  try {
   const { userId, wordId } = req.body;
   const wordData = await wordsService.removeWord(userId, wordId);
   return res.json(wordData);
  } catch (e) {
   next(e);
  }
 }

 async editWord(req, res, next) {
  try {
   const { userId, wordId, newWord, newWordTranslate } = req.body;

   const wordData = await wordsService.editWord(userId, wordId, newWord, newWordTranslate);
   return res.json(wordData);
  } catch (e) {
   next(e);
  }
 }

 async getWords(req, res, next) {
  try {
   const { userId } = req.body;
   const words = await wordsService.getWords(userId);
   return res.json(words);
  } catch (e) {
   next(e);
  }
 }
}

module.exports = new WordsController();
