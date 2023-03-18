export enum wordsActionCreaterKeys {
 userId = "userId",
 wordId = "wordId",
 word = "word",
 wordTranslate = "wordTranslate",
 newWord = "newWord",
 newWordTranslate = "newWordTranslate",
}

export interface GetWordsActionCreater {
 [wordsActionCreaterKeys.userId]: string;
}

export interface AddWordActionCreater {
 [wordsActionCreaterKeys.userId]: string;
 [wordsActionCreaterKeys.word]: string;
 [wordsActionCreaterKeys.wordTranslate]: string;
}

export interface WordsData {
    [wordsActionCreaterKeys.userId]: string;
    [wordsActionCreaterKeys.word]: string;
    [wordsActionCreaterKeys.wordTranslate]: string;
    "_id":string;
   }

export interface EditWordActionCreater {
 [wordsActionCreaterKeys.userId]: string;
 [wordsActionCreaterKeys.wordId]: string;
 [wordsActionCreaterKeys.newWord]: string;
 [wordsActionCreaterKeys.newWordTranslate]: string;
}

export interface RemoveWordActionCreater {
 [wordsActionCreaterKeys.userId]: string;
 [wordsActionCreaterKeys.wordId]: string;
}

export interface WordsActionSaga {
 type: string;
 payload: any;
}
