import { Button } from "@nextui-org/react"
import { ReactNode } from "react";
import { IModalOptions } from "../../context/ModalContext";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface IModalProps {
    isShowing: boolean;
    options: IModalOptions;
    closeModal: () => void;
    children: ReactNode;
}

 const Modal = ({children, options, closeModal, isShowing}: IModalProps) => {

    return createPortal(
        <div className={`${!isShowing && "hidden"}fixed inset-0 bg-black/50 flex items-center justify-center`}>
            <div className={` ${!isShowing ? "hidden" : "bg-white p-8 rounded-xl"}`}>
                {options.title && <h2 className="text-2xl font-semibold">{options.title}</h2>}
                {!options.disableCloseButton && <button className="absolute top-6 right-6 btn btn-circle btn-ghost w-10 h-10 min-h-0" onClick={closeModal}>
                    <X  className="w-7 h-7" />
                </button>}
                {children}
                <div className="flex items-center justify-end gap-4 mt-8">
                    <Button color="danger" onClick={closeModal}>
                        <p>Close</p>
                    </Button>
                    <Button color="primary">
                        <p>Save</p>
                    </Button>
                </div>
            </div>
        </div>, document.body
    );
};

export default Modal;