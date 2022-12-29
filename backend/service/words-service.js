const { ObjectId } = require("mongodb");
const WordsModel = require("../models/words-model");
const ApiError = require("../exceptions/api-error");
const wordsModel = require("../models/words-model");

class WordsService {
 async addWord(userId, word, wordTranslate) {
  if (!userId || !word || !wordTranslate) {
   throw ApiError.WordAddError();
  }
  await WordsModel.create({
   userId,
   word: word,
   wordTranslate: wordTranslate,
  });
  return { message: "Word has been added" };
 }

 async removeWord(userId, wordId) {
  if (!userId || !wordId) {
   throw ApiError.WordRemoveError();
  }
  await wordsModel.find({ userId }).deleteOne({ _id: ObjectId(wordId) });
  return { message: "Word has been removed" };
 }

 async editWord(userId, wordId, newWord, newWordTranslate) {
  if (!userId || !wordId || !newWord || !newWordTranslate) {
   throw ApiError.WordEditError();
  }
  await wordsModel.findOne({ _id: ObjectId(wordId) }).updateOne({
   $set: { word: newWord, wordTranslate: newWordTranslate },
  });
  return { message: "Word has been changed" };
 }

 async getWords(userId) {
  if (!userId) {
   throw ApiError.GetWordsError();
  }
  const words = await wordsModel.find({ userId });
  return words;
 }
}

module.exports = new WordsService();
