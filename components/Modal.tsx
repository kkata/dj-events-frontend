import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";

type Props = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export default function Modal({ show, onClose, children, title }: Props) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button type="button" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  const modalRoot = document.getElementById("modal-root");

  if (isBrowser && modalRoot) {
    return ReactDOM.createPortal(modalContent, modalRoot);
  } else {
    return null;
  }
}

// ref https://devrecipes.net/modal-component-with-next-js/
