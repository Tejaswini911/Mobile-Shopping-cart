import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { contextType } from "./model/Mobile";
import { MobileContext } from "../components/model/MobileContext";

function Popup() {
  const { message, setMessage } = React.useContext(
    MobileContext
  ) as contextType;

  const [show, setShow] = useState(true);
  setTimeout(() => {
    setShow(false);
    setMessage("");
  }, 2000);

  return (
    <>
      <Modal show={show} backdrop={false}
        >
        <Modal.Header>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}!</Modal.Body>
      </Modal>
    </>
  );
}

export default Popup;
