"use client";

import { useCallback, useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          backdrop-blur-md
          focus:outline-none
          border-2
          "
      >
        <div
          className="
                relative
                w-full
                md:w-2/3
                lg:w-1/2
                xl:w-1/3
                2xl:w-1/4
                my-6
                mx-auto
                rounded-lg
                shadow-lg
                focus:outline-none
                p-4
                h-full
                lg:h-auto
                md:h-auto
            "
        >
          {/* Content*/}
          <div
            className={`
                    translate
                    duration-300
                    h-full
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    ${showModal ? "opacity-100" : "opacity-0"}
                    `}
          >
            <div
              className="
                    translate
                    h-full
                    lg:h-auto
                    md:h-auto
                    border-0
                    rounded-lg
                    relative
                    flex
                    flex-col
                    w-full
                    outline-none
                    focus:outline-none
                "
            >
              {/* Header */}
              <div
                className="
                        flex
                        items-center
                        p-6
                        rounded-t
                        justify-center
                        border-b-[1px]
                    "
              >
                <button
                  onClick={handleClose}
                  className="
                        absolute
                        top-0
                        right-0
                        p-2
                        m-2
                        bg-transparent
                        text-black
                        text-3xl
                        leading-none
                        outline-none
                        focus:outline-none
                        hover:text-red-500
                        transition
                        duration-300
                    "
                >
                  <TfiClose size={20} />
                </button>
                <div
                  className="
                    text-lg
                    font-semibold

                "
                >
                  {title}
                </div>
              </div>

              {/* Body */}
              <div className="relative p-6 flex-auto">{body}</div>

              {/* Footer */}
              <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                    "
              >
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}

                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
