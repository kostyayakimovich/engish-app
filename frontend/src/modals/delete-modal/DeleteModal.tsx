import React, { memo, useCallback } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Close from "../../assets/images/icon-close.svg";
import { wordsActions } from "../../store/actions/wordsActions";
import { RootState } from "../../store/store";
import { ChangeWordData } from "../../store/models";

import "./style.scss";

interface ModalDeleteProps {
 isOpenModal: boolean;
 setIsOpenModal: (value: boolean) => void;
 deleteData: ChangeWordData;
 setChangeWordData: (value: ChangeWordData | null) => void;
}

const DeleteModal: React.FunctionComponent<ModalDeleteProps> = memo(
 ({ isOpenModal, setIsOpenModal, deleteData, setChangeWordData }) => {
  const closeModal = () => {
   setIsOpenModal(false);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authorization);

  const handleDelete = useCallback(
   (wordId: string) => {
    if (user && user["id"]) {
     dispatch(
      wordsActions.removeWord({
       wordId: wordId,
       userId: user["id"],
      })
     );
     setChangeWordData(null);
     setIsOpenModal(false);
    }
   },
   [user, setIsOpenModal, dispatch, setChangeWordData]
  );

  return (
   <Modal
    isOpen={isOpenModal}
    onRequestClose={closeModal}
    contentLabel="modal"
    className="modal-dialog"
    overlayClassName="modal-overlay"
    closeTimeoutMS={500}
   >
    <div className="modal-delete">
     <header className="modal-delete__header">
      <h3 className="modal-delete__header--title">Delete Word</h3>
      <img className="modal-delete__header--icon" src={Close} alt="close" onClick={closeModal} />
     </header>
     <section className="modal-delete__content">
      <div className="modal-delete__content--text">{`Do you want to delete: ${deleteData.word} - ${deleteData.wordTranslate} ?`}</div>
      <div className="modal-delete__control">
       <Button variant="contained" onClick={() => handleDelete(deleteData.wordId)}>
        Delete
       </Button>
       <Button variant="contained" onClick={() => setIsOpenModal(false)}>
        Cancel
       </Button>
      </div>
     </section>
    </div>
   </Modal>
  );
 }
);

export default DeleteModal;
