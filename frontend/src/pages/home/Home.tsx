import React, { memo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
   <Words />
  </div>
 );
});

export default Home;
