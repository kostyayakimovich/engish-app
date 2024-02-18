import React, { memo } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Close from '../../assets/images/icon-close.svg';
import { wordsActions } from '../../store/actions/wordsActions';
import { RootState } from '../../store/store';
import './style.scss';

interface ModalWordProps {
 isOpenModal: boolean;
 setIsOpenModal: (value: boolean) => void;
 deleteWord: {
  _id: string;
  userId: string;
  word: string;
  wordTranslate: string;
 };
}

const DeleteModal: React.FunctionComponent<ModalWordProps> = memo(({ isOpenModal, setIsOpenModal, deleteWord }) => {
 const closeModal = () => {
  setIsOpenModal(false);
 };

 const dispatch = useDispatch();
 const { user } = useSelector((state: RootState) => state.authorization);

 const handleDelete = () => {
  if (user && user['id']) {
   dispatch(
    wordsActions.removeWord({
     wordId: deleteWord._id,
     userId: user['id'],
    })
   );
   dispatch(wordsActions.getWords({ userId: user['id'] ?? '' }));
  }

  setIsOpenModal(false);
 };

 return (
  <Modal
   isOpen={isOpenModal}
   onRequestClose={closeModal}
   contentLabel='modal'
   className='modal-dialog delete-dialog'
   overlayClassName='modal-overlay'
   closeTimeoutMS={500}
  >
   <div className='modal-delete-container'>
    <header className='modal-delete-header'>
     <h3 className='modal-delete-header__title'>
      {` Delete word: ${deleteWord.word} - ${deleteWord.wordTranslate} ?`}
     </h3>
     <img
      className='modal-delete-header__icon'
      src={Close}
      alt='close'
      onClick={closeModal}
     />
    </header>
    <section className='modal-delete-actions'>
     <div className='modal-delete-actions__buttons'>
      <Button
       variant='contained'
       onClick={handleDelete}
      >
       Delete
      </Button>
      <Button
       variant='contained'
       onClick={closeModal}
      >
       Cancel
      </Button>
     </div>
    </section>
   </div>
  </Modal>
 );
});

export default DeleteModal;
