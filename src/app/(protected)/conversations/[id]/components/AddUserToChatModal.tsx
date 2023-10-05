import { Dialog, Transition } from "@headlessui/react";
import { User } from "@prisma/client";
import React, { useMemo, useState } from "react";
import Select from "react-select";

interface AddUserToChatProps {
  users: User[];
  isOpen: boolean;
  conversationUsers: User[];
  onClose: () => void;
  addUserToConversation: (userId: string) => void;
  title: string;
}

interface SelectedOption {
  value: string;
  label: string;
}

export default function AddUserToChat({
  conversationUsers,
  isOpen,
  onClose,
  addUserToConversation,
  title,
  users,
}: AddUserToChatProps) {
  const [selectedUser, setSelectedUser] = useState<SelectedOption | null>(null);

  const usersNotInConversation = useMemo<SelectedOption[]>(
    () =>
      users
        .filter((user) => {
          return !conversationUsers.some(
            (conversationUser) => conversationUser.id === user.id
          );
        })
        .map((user) => ({
          label: user.name || user.id,
          value: user.id,
        })),
    [conversationUsers, users]
  );

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

            <div className="mt-4">
              <Select
                options={usersNotInConversation}
                value={selectedUser}
                onChange={setSelectedUser}
              />
            </div>

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
                onClick={() => {
                  if (selectedUser) {
                    addUserToConversation(selectedUser.value);
                    setSelectedUser(null);
                  }
                }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
