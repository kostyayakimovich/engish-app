import React, { memo } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Stack } from "@mui/material";
import Close from "../../assets/images/icon-close.svg";
import { wordsActions } from "../../store/actions/wordsActions";
import "./style.scss";
import { RootState } from "../../store/store";

interface ModalAddProps {
 isOpenModal: boolean;
 setIsOpenModal: (value: boolean) => void;
}

interface FormValues {
 word: string;
 wordTranslate: string;
}

const AddModal: React.FunctionComponent<ModalAddProps> = memo(
 ({ isOpenModal, setIsOpenModal }) => {
  const closeModal = () => {
   setIsOpenModal(false);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authorization);
  const initialValues: FormValues = { word: "", wordTranslate: "" };

  const handleSubmit = (values: FormValues) => {
   if (user && user["id"]) {
    dispatch(
     wordsActions.addWord({
      word: values.word,
      wordTranslate: values.wordTranslate,
      userId: user["id"],
     })
    );
   }

   setIsOpenModal(false);
  };

  const textFieldStyles = {
   width: "100%",
  };

  return (
   <Modal
    isOpen={isOpenModal}
    onRequestClose={closeModal}
    contentLabel="modal"
    className="modal-dialog"
    overlayClassName="modal-overlay"
    closeTimeoutMS={500}
   >
    <div className="modal-add-container">
     <header className="modal-add-header">
      <h3 className="modal-add-header__title">Add Word</h3>
      <img
       className="modal-add-header__icon"
       src={Close}
       alt="close"
       onClick={closeModal}
      />
     </header>
     <section className="modal-add__content">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
       {({ values, handleChange }) => (
        <Form>
         <Stack spacing={2} alignItems="center">
          <Field
           name="word"
           as={TextField}
           label="Word"
           type="text"
           value={values.word}
           onChange={handleChange}
           style={textFieldStyles}
          />
          <Field
           name="wordTranslate"
           as={TextField}
           label="Translate"
           type="text"
           value={values.wordTranslate}
           onChange={handleChange}
           style={textFieldStyles}
          />
          <Button variant="contained" type="submit">
           Submit
          </Button>
         </Stack>
        </Form>
       )}
      </Formik>
     </section>
    </div>
   </Modal>
  );
 }
);

export default AddModal;
