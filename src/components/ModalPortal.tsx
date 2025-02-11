"use client";

import { createPortal } from "react-dom";

const ModalPortal = ({ children } : { children: React.ReactNode }) => {
    const target = document.querySelector('.modal-wrapper');

    if ( ! target ) return;

    return createPortal(children, target);
}

export default ModalPortal;
