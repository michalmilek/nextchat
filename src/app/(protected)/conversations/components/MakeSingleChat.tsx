import { useMemo, useState } from "react";
import Select from "react-select";
import { Dialog, DialogProps } from "@headlessui/react";
import { FaUser, FaUsers } from "react-icons/fa";
import { User } from "@prisma/client";
import * as yup from "yup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { postConversation } from "@/services/conversations/conversations";
import { usePostConversation } from "@/services/conversations/conversationServices";

type SelectOption = {
  value: string;
  label: string;
};

interface Props {
  users: User[];
}

const schema = yup.object().shape({
  userToChat: yup.object().shape({
    value: yup.string().required(),
    label: yup.string().required(),
  }),
});

export default function MakeSingleChat({ users }: Props): JSX.Element {
  const { mutate } = usePostConversation();
  const [isOpen, setIsOpen] = useState(false);

  const userList = useMemo(() => {
    return users.map(({ id, name }) => ({ value: id, label: name }));
  }, [users]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userToChat: userList[0] as SelectOption,
    },
  });

  const handleConfirm = (data: { userToChat: SelectOption }) => {
    mutate(data.userToChat.value);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mb-4 mx-4 flex flex-col items-center justify-center">
        <FaUser className="w-6 h-6 mr-2" />
        Create single chat
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <div className="flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleSubmit(handleConfirm)}
            className="bg-white rounded-lg shadow-lg p-4 z-20">
            <Dialog.Title className="text-lg font-medium mb-2">
              Select an User
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-4">
              Please select an user from the dropdown.
            </Dialog.Description>
            <Controller
              name="userToChat"
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <div className="mt-4">
                  <label
                    htmlFor="userToChat"
                    className="block font-medium text-gray-700">
                    Members
                  </label>
                  <Select
                    options={userList as SelectOption[]}
                    value={value}
                    onChange={(selectedOption) => {
                      onChange(selectedOption);
                    }}
                    className={`mt-1 block w-full rounded-md border p-1 border-gray-200 shadow-sm ${
                      fieldState.invalid ? "border-red-500" : ""
                    }`}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "none",
                        padding: "0",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "rgb(31, 41, 55)"
                          : "white",
                        color: state.isSelected ? "white" : "black",
                        ":hover": {
                          backgroundColor: state.isSelected
                            ? "rgb(31, 41, 55)"
                            : "#f3f4f6",
                        },
                      }),
                    }}
                  />
                  {fieldState.invalid && (
                    <p className="mt-2 text-sm text-red-600">
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2 transition-all">
                Cancel
              </button>
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-all">
                {formState.isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
