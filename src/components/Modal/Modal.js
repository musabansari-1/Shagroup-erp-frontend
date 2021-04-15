import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = (props) => {
  const {
    className,
    modalOpen,
    setModalOpen
  } = props;

  // const [modal, setModal] = useState(true);

  // const toggle = () => setModal(!modal);

  return (
    <div>
      {/* <Button color="danger" onClick={setModalOpen(false)}>{buttonLabel}</Button> */}
      <Modal isOpen={modalOpen} className={className}>
        <ModalHeader style={{backgroundColor: 'black', color: 'white'}} >{props.header}</ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter >
          {/* <Button color="primary" onClick={() => {}}>Do Something</Button>{' '} */}
          <Button style={{backgroundColor: '#0093DD'}} onClick={() => {
          setModalOpen(false);
          }
          }>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CustomModal;