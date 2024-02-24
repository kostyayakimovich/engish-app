import React, { useState, memo, useRef } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';
import WordModal from '../../modals/word-modal';
import DeleteModal from '../../modals/delete-modal';
import './style.scss';

interface DragItem {
 index: number;
 id: string;
 type: string;
}

const ItemTypes = {
 CARD: 'card',
};

const WordCard: React.FunctionComponent<{
 word: string;
 wordTranslate: string;
 userId: string;
 _id: string;
 index: number;
 moveCard: (dragIndex: number, hoverIndex: number) => void;
}> = memo(({ word, wordTranslate, _id, userId, index, moveCard }) => {
 const ref = useRef<HTMLDivElement>(null);
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

 const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
  accept: ItemTypes.CARD,
  collect(monitor) {
   return {
    handlerId: monitor.getHandlerId(),
   };
  },
  hover(item: DragItem, monitor) {
   if (!ref.current) {
    return;
   }
   const dragIndex = item.index;
   const hoverIndex = index;

   if (dragIndex === hoverIndex) {
    return;
   }
   const hoverBoundingRect = ref.current?.getBoundingClientRect();
   const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
   const clientOffset = monitor.getClientOffset();
   const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    return;
   }
   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    return;
   }
   moveCard(dragIndex, hoverIndex);
   item.index = hoverIndex;
  },
 });

 const [{ isDragging }, drag] = useDrag({
  type: ItemTypes.CARD,
  item: () => {
   return { _id, index };
  },
  collect: (monitor: any) => ({
   isDragging: monitor.isDragging(),
  }),
 });

 const opacity = isDragging ? 0 : 1;
 drag(drop(ref));

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
  <div
   className='word-card'
   ref={ref}
   style={{ opacity }}
   data-handler-id={handlerId}
  >
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
});

export default WordCard;
