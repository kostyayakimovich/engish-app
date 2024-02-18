import React, { useState, memo } from 'react';
import WordModal from '../../modals/word-modal';
import DeleteModal from '../../modals/delete-modal';
import './style.scss';

const WordCard: React.FunctionComponent<{ word: string; wordTranslate: string; userId: string; _id: string }> = memo(
 ({ word, wordTranslate, _id, userId }) => {
  const [isFlipped, setFlipped] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [editWord, setEditWord] = useState({
   _id: '',
   userId: '',
   word: '',
   wordTranslate: '',
  });
  const [deleteWord, setDeleteWord] = useState({
   _id: '',
   userId: '',
   word: '',
   wordTranslate: '',
  });

  const handleClick = () => {
   setFlipped(!isFlipped);
  };

  const handleEdit = (word: { _id: string; userId: string; word: string; wordTranslate: string }) => {
   setEditWord(word);
   setIsOpenModalEdit(!isOpenModalEdit);
  };

  const handleDelete = (word: { _id: string; userId: string; word: string; wordTranslate: string }) => {
   setDeleteWord(word);
   setIsOpenModalDelete(!isOpenModalDelete);
  };

  return (
   <div className='word-card'>
    <div
     className={`word-card-container ${isFlipped ? 'flipped' : ''}`}
     onClick={handleClick}
    >
     <div className='front'>{word}</div>
     <div className='back'>{wordTranslate}</div>
    </div>
    <div className='word-card-actions'>
     <p
      onClick={() =>
       handleEdit({
        word,
        wordTranslate,
        userId,
        _id,
       })
      }
     >
      Edit
     </p>
     <p
      onClick={() =>
       handleDelete({
        word,
        wordTranslate,
        userId,
        _id,
       })
      }
     >
      Delete
     </p>
    </div>
    <WordModal
     isOpenModal={isOpenModalEdit}
     setIsOpenModal={setIsOpenModalEdit}
     editWord={editWord}
    />
    <DeleteModal
     isOpenModal={isOpenModalDelete}
     setIsOpenModal={setIsOpenModalDelete}
     deleteWord={deleteWord}
    />
   </div>
  );
 }
);

export default WordCard;
