import { Button, Modal } from "antd";
import React from "react";
const ModalConfirm = ({
  title,
  content,
  buttonName,
  htmlType = "button",
  handleSubmit,
  isOpenModal,
  setOpenModal,
}) => {
  const showModal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} htmlType={htmlType}>
        {buttonName}
      </Button>
      <Modal
        title={title}
        open={isOpenModal}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <p>{content}</p>
      </Modal>
    </>
  );
};
export default ModalConfirm;
