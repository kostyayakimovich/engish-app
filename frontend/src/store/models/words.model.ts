export enum wordsActionCreaterKeys {
 userId = "userId",
 wordId = "wordId",
 word = "word",
 wordTranslate = "wordTranslate",
 newWord = "newWord",
 newWordTranslate = "newWordTranslate",
}

export interface getWordsActionCreater {
 [wordsActionCreaterKeys.userId]: string;
}

export interface addWordActionCreater {
 [wordsActionCreaterKeys.userId]: string;
 [wordsActionCreaterKeys.word]: string;
 [wordsActionCreaterKeys.wordTranslate]: string;
}

export interface editWordActionCreater {
 [wordsActionCreaterKeys.userId]: string;
 [wordsActionCreaterKeys.wordId]: string;
 [wordsActionCreaterKeys.newWord]: string;
 [wordsActionCreaterKeys.newWordTranslate]: string;
}

export interface removeWordActionCreater {
 [wordsActionCreaterKeys.userId]: string;
 [wordsActionCreaterKeys.wordId]: string;
}

export interface WordsActionSaga {
 type: string;
 payload: any;
}
