import React, { memo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../../modules/header';
import Words from '../../modules/words';
import { wordsActions } from '../../store/actions/wordsActions';
import { RootState } from '../../store/store';
import './style.scss';

const Home: React.FunctionComponent = memo(() => {
 const dispatch = useDispatch();
 const { user } = useSelector((state: RootState) => state.authorization);

 useLayoutEffect(() => {
  if (user) {
   dispatch(wordsActions.getWords({ userId: user['id'] ?? '' }));
  }
 }, [dispatch, user]);
 return (
  <div className='home'>
   <Header />
   <DndProvider backend={HTML5Backend}>
    <Words />
   </DndProvider>
  </div>
 );
});

export default Home;
