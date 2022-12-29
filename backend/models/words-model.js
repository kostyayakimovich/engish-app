const { Schema, model } = require("mongoose");

const WordsSchema = new Schema({
 userId: { type: String, required: true },
 word: { type: String, required: true },
 wordTranslate: { type: String, required: true },
});

module.exports = model("Words", WordsSchema);
