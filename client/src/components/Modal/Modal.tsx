import React from 'react';
import styles from './Modal.module.css'
interface ModalProps {
    children: React.ReactNode;
    isVisible: boolean;
}

const Modal : React.FC<ModalProps> = ({children, isVisible}) => {
    return (
        <div className={`${isVisible ? styles.modalBackground : ''}`}>
            <div className={`${styles.modal} ${isVisible ? styles.visible : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;