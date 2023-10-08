import { useMemo, useState } from "react";
import Select from "react-select";
import { Dialog, DialogProps } from "@headlessui/react";
import { FaUsers } from "react-icons/fa";
import { User } from "@prisma/client";
import * as yup from "yup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { usePostConversationGroup } from "@/services/conversations/conversationServices";

type SelectOption = {
  value: string;
  label: string;
};

interface Props {
  users: User[];
}

const schema = yup.object().shape({
  groupName: yup.string().required("Group name is required"),
  members: yup
    .array()
    .min(2, "At least two member is required")
    .required("At least two members are required"),
});

export default function MakeGroupChat({ users }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = usePostConversationGroup();

  const userList = useMemo(() => {
    return users.map(({ id, name }) => ({ value: id, label: name }));
  }, [users]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      groupName: "",
      members: [],
    },
  });

  const handleConfirm = (data: {
    groupName: string;
    members: SelectOption[];
  }) => {
    mutate(
      { members: data.members, name: data.groupName },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mb-4 mx-4 flex flex-col items-center justify-center">
        <FaUsers className="w-6 h-6 mr-2" />
        Create Group Chat
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
              Select an Option
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-4">
              Please select an option from the dropdown.
            </Dialog.Description>
            <div className="mt-4">
              <Controller
                name="groupName"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label
                      htmlFor="groupName"
                      className="block font-medium text-gray-700">
                      Group Name
                    </label>
                    <input
                      {...field}
                      type="text"
                      id="groupName"
                      className={`mt-1 block w-full rounded-md border p-2 border-gray-200 shadow-sm ${
                        fieldState.invalid ? "border-red-500" : ""
                      }`}
                    />
                    {fieldState.invalid && (
                      <p className="mt-2 text-sm text-red-600">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              name="members"
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <div className="mt-4">
                  <label
                    htmlFor="members"
                    className="block font-medium text-gray-700">
                    Members
                  </label>
                  <Select
                    isMulti
                    options={userList}
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
