import { Dialog, Transition } from "@headlessui/react";
import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
}: ConfirmModalProps) {
  return (
    <Transition
      show={isOpen}
      as={React.Fragment}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-[60] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center relative">
          <Dialog.Overlay className="fixed inset-0" />

          <div className="inline-block p-6 my-8 text-left bg-white rounded-lg shadow-xl relative z-[9999]">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </Dialog.Title>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
