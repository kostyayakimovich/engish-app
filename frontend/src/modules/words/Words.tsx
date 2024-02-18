import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import WordCard from '../../components/wordCard';
import './style.scss';

const Words: React.FunctionComponent = memo(() => {
 const words = useSelector((state: RootState) => state.words);

 return (
  <section className='words'>
   {words.wordsData.map(({ word, wordTranslate, _id, userId }) => (
    <div key={_id}>
     <WordCard
      word={word}
      wordTranslate={wordTranslate}
      _id={_id}
      userId={userId}
     />
    </div>
   ))}
  </section>
 );
});

export default Words;
