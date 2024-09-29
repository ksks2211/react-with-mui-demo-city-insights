import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Modal Context is not found!");
  }

  return modalContext;
};

export default useModal;
