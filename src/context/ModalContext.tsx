
import { ReactNode, createContext, useContext, useState } from "react";
import Modal from "../components/ui/Modal";

export interface IModalOptions {
  title?: string;
  size?: string;
  disableCloseButton?: ReactNode;
  content: ReactNode;
}
interface IModalContext {
  isShowing: boolean;
  openModal: (options: IModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IModalContext | null>(null);

const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return modalContext;
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalOptions, setModalOptions] = useState<IModalOptions>({
    content: null,
  });

  const openModal = (options: IModalOptions) => {
    setIsShowing(true);

    setModalOptions(options);
  };

  const closeModal = () => {
    setIsShowing(false);
    setTimeout(() => {
      setModalOptions({ content: null });
    }, 300);
  };


  return (
    <ModalContext.Provider value={{ isShowing, openModal, closeModal }}>
      <Modal isShowing={isShowing} options={modalOptions} closeModal={closeModal}>
        {modalOptions.content}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export { useModal, ModalProvider }
