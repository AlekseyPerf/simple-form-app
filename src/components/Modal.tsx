import React, { useEffect } from "react";
import { useFormContext } from "../context/FormContext";
import { ModalProps } from "../types";

const Modal = ({ onClose, dayWord }: ModalProps) => {
  const { formData } = useFormContext();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Заявка одобрена!</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {" "}
              <div className="text-center">
                <h4>
                  Поздравляем, {formData.lastName} {formData.firstName}.
                </h4>
                <p className="mt-3">
                  Вам одобрена ${formData.loanAmount} на {formData.loanTerm}{" "}
                  {dayWord}.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
