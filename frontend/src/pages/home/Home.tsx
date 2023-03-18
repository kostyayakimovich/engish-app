import { Button, ButtonGroup } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddModal from "../../modals/add-modal";
import DeleteModal from "../../modals/delete-modal";
import Header from "../../modules/header";
import { wordsActions } from "../../store/actions/wordsActions";
import { ChangeWordData } from "../../store/models";
import { WordsData } from "../../store/models/words.model";
import { RootState } from "../../store/store";

import "./style.scss";

const Home: React.FunctionComponent = memo(() => {
 const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
 const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
 const [chageWordData, setChangeWordData] = useState<ChangeWordData | null>(null);
 const [isFlipped, setIsFlipped] = useState(false);
 const [flippedCard, setFlippedCard] = useState("");
 const dispatch = useDispatch();
 const { user } = useSelector((state: RootState) => state.authorization);
 const { wordsData }: any = useSelector((state: RootState) => state.words);

 const handleClickCard = (id: string) => {
  setFlippedCard(isFlipped ? "" : id);
  setIsFlipped(!isFlipped);
 };

 const handleEdit = useCallback(
  (data: ChangeWordData) => {
   setChangeWordData(data);
   setIsOpenModalAdd(!isOpenModalAdd);
  },
  [isOpenModalAdd]
 );
 const handleDelete = useCallback(
  (data: ChangeWordData) => {
   setChangeWordData(data);
   setIsOpenModalDelete(!isOpenModalDelete);
  },
  [isOpenModalDelete]
 );

 useEffect(() => {
  if (user && !chageWordData && !isOpenModalAdd && !isOpenModalDelete) {
   dispatch(wordsActions.getWords({ userId: user["id"] }));
  }
 }, [dispatch, user, chageWordData, isOpenModalAdd, isOpenModalDelete]);

 return (
  <div className="home">
   <Header />
   <div className="controls">
    <Button variant="contained" onClick={() => setIsOpenModalAdd(!isOpenModalAdd)}>
     Add Word
    </Button>
   </div>
   <section className="words-list">
    {wordsData.length
     ? wordsData.map(({ word, wordTranslate, _id }: WordsData) => (
        <div key={_id} className={"card"}>
         <div
          className={`card-container ${flippedCard === _id ? "flipped" : ""}`}
          onClick={() => handleClickCard(_id)}
         >
          <div className="card-front">
           <div className="card__content">
            <h2>Word</h2>
            <p>{word}</p>
           </div>
          </div>
          <div className="card-back">
           <div className="card__content">
            <h2>Translate</h2>
            <p>{wordTranslate}</p>
           </div>
          </div>
         </div>
         <div className="card__control">
          <ButtonGroup disableElevation variant="text" aria-label="Disabled elevation buttons">
           <Button
            onClick={() => {
             handleEdit({ word, wordTranslate, wordId: _id });
            }}
           >
            Edit
           </Button>
           <Button onClick={() => handleDelete({ word, wordTranslate, wordId: _id })}>
            Delete
           </Button>
          </ButtonGroup>
         </div>
        </div>
       ))
     : null}
   </section>
   <AddModal
    editData={chageWordData}
    setChangeWordData={setChangeWordData}
    isOpenModal={isOpenModalAdd}
    setIsOpenModal={setIsOpenModalAdd}
   />
   {chageWordData && (
    <DeleteModal
     deleteData={chageWordData}
     setChangeWordData={setChangeWordData}
     isOpenModal={isOpenModalDelete}
     setIsOpenModal={setIsOpenModalDelete}
    />
   )}
  </div>
 );
});

export default Home;
