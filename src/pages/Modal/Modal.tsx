import React from "react";
import { ReactNode } from "react";
import { useState } from "react";
import useInput from "../Board/components/CustomHooks/useInput";
import "../Modal/modale.css";
interface IModal {
  children: ReactNode;
}
Modal.Header = function ModalHeader({ children }: IModal) {
  return <div className="modal__header">{children}</div>;
};
Modal.Main = function ModalMain({ children }: IModal) {
  return <div className="modal__main">{children}</div>;
};
Modal.Footer = function ModalFooter({ children }: IModal) {
  return <div className="modal__footer">{children}</div>;
};
export default function Modal({ children }: IModal) {
  return (
    <>
      <div className="modal">
        <div className="modal__overlay">
          <div className="modal__window">{children}</div>
        </div>
      </div>
    </>
  );
}
