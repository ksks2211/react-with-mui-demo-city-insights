import { styled } from "@mui/material";
import { common } from "@mui/material/colors";
import Overlay from "components/layout/Overlay";
import { rgba } from "polished";
import { createContext, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";

type ModalContent = React.ReactElement | null;
type ModalState = {
  isModalVisible: boolean;
  content: ModalContent;
  openModal: (content: React.ReactElement) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalState | undefined>(undefined);

interface ModalProviderProps {
  children: React.ReactNode;
}

const DISTANCE_FROM_CORNER = "25px";

const ModalOverlay = styled(Overlay)`
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-close-btn {
    position: fixed;
    top: ${DISTANCE_FROM_CORNER};
    right: calc(${DISTANCE_FROM_CORNER} + var(--scrollbar-width));

    svg {
      cursor: pointer;
      width: var(--icon-btn-size);
      height: var(--icon-btn-size);
      padding: var(--icon-btn-padding);
      color: ${common.white};
      fill: var(--icon-color);
      border-radius: 50%;

      &:hover {
        background-color: ${rgba(common.black, 0.5)};
      }
    }
  }
`;

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState<ModalContent>(null);

  const openModal = useCallback((content: React.ReactElement) => {
    setContent(content);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
    setModalVisible(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{ isModalVisible, content, openModal, closeModal }}
    >
      {isModalVisible &&
        createPortal(
          <ModalOverlay>
            <div className="modal-content">{content}</div>
            <button
              className="modal-close-btn"
              children={<CgClose onClick={closeModal} />}
            />
          </ModalOverlay>,
          document.getElementById("modal-root") as Element
        )}
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
