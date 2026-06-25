import {FC, ReactNode, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import {Button} from '../ui';

interface IModalComponentProps {
    children?: ReactNode;
    isOpen: boolean;
    message: string;
    onClose: () => void;
    title: string;
}

const ModalComponent: FC<IModalComponentProps> = ({children, isOpen, message, onClose, title}) => {
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className="modal-overlay" role="presentation" onMouseDown={onClose}>
            <div
                aria-labelledby="modal-title"
                aria-modal="true"
                className="modal-card"
                role="dialog"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <button
                    aria-label="Закрити повідомлення"
                    className="modal-card__close"
                    onClick={onClose}
                    ref={closeButtonRef}
                    type="button"
                >
                    <CloseIcon fontSize="small"/>
                </button>
                <div className="modal-card__icon" aria-hidden="true">
                    <CheckCircleOutlineIcon fontSize="large"/>
                </div>
                <h2 id="modal-title">{title}</h2>
                <p>{message}</p>
                {children}
                <div className="modal-card__actions">
                    <Button onClick={onClose} variant="primary">
                        Добре
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export {ModalComponent};
