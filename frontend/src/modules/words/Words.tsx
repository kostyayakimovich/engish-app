import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import update from 'immutability-helper';
import { RootState } from '../../store/store';
import WordCard from '../../components/wordCard';
import './style.scss';
import { WordsData } from '../../store/models/words.model';

const Words: React.FunctionComponent = memo(() => {
 const words = useSelector((state: RootState) => state.words);
 const [cards, setCards] = useState(words.wordsData);

 useEffect(() => {
  if (words.wordsData) {
   setCards(words.wordsData);
  }
 }, [words]);

 const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
  setCards((prevCards: WordsData[]) =>
   update(prevCards, {
    $splice: [
     [dragIndex, 1],
     [hoverIndex, 0, prevCards[dragIndex] as WordsData],
    ],
   })
  );
 }, []);

 const renderCard = useCallback(
  (card: WordsData, index: number) => {
   const { word, wordTranslate, _id, userId } = card;
   return (
    <WordCard
     word={word}
     wordTranslate={wordTranslate}
     _id={_id}
     userId={userId}
     index={index}
     moveCard={moveCard}
    />
   );
  },
  [moveCard]
 );

 return <section className='words'>{cards.map((card, i) => renderCard(card, i))}</section>;
});

export default Words;
