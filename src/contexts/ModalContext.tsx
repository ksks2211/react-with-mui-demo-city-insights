import { styled } from "@mui/material";
import { common } from "@mui/material/colors";
import Overlay from "components/layout/Overlay";
import { rgba } from "polished";
import { createContext, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

type ModalContent = React.ReactElement | null;
type ModalState = {
  isModalVisible: boolean;
  content: ModalContent;
  openModal: (content: React.ReactElement) => void;
  closeModal: () => void;
  setIsUserTriggered: (v: boolean) => void;
};

const ModalContext = createContext<ModalState | undefined>(undefined);

interface ModalProviderProps {
  children: React.ReactNode;
}

const DISTANCE_FROM_CORNER = "18px";

const ModalPortal = ({ children }: ModalProviderProps) =>
  createPortal(children, document.getElementById("modal-root") as Element);

const ModalOverlay = styled(Overlay)`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-in 0.3s forwards;

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
        background-color: ${rgba(common.black, 0.24)};
      }
    }
  }
`;

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState<ModalContent>(null);
  const [isUserTriggered, setIsUserTriggered] = useState(false);

  // const location = useLocation();
  const navigate = useNavigate();

  const openModal = useCallback((content: React.ReactElement) => {
    setContent(content);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
    setModalVisible(false);
  }, []);

  const handleCloseBtn = () => {
    if (isUserTriggered) {
      navigate(-1);
    } else {
      navigate(location.pathname, { replace: true });
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        content,
        openModal,
        closeModal,
        setIsUserTriggered,
      }}
    >
      {isModalVisible && (
        <ModalPortal>
          <ModalOverlay>
            <div className="modal-content">{content}</div>
            <button
              className="modal-close-btn"
              children={<CgClose onClick={handleCloseBtn} />}
            />
          </ModalOverlay>
        </ModalPortal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
