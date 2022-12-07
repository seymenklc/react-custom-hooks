import { useState } from 'react';

export const useToggle = ({ onOpen, onClose }) => {
    const [isOpen, setIsOpen] = useState();

    const toggler = () => {
        const nextIsOpen = !isOpen;
        setIsOpen(nextIsOpen);

        if (nextIsOpen) {
            onOpen();
        } else {
            onClose();
        }
    };

    return [isOpen, toggler];
};