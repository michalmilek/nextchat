import { Dialog, Transition } from "@headlessui/react";
import Image, { ImageProps } from "next/image";
import React, { Fragment, useState } from "react";
import { useImageSize } from "react-image-size";
import { MdClose } from "react-icons/md";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

const DynamicImage = ({ src, alt, ...props }: CustomImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, { loading, error }] = useImageSize(src);

  if (error) {
    return (
      <div className="bg-red-100 text-red-500 p-4">
        ERROR WHILE DISPLAYING IMAGE
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-300 p-4 animate-pulse h-[200px] w-[200px]" />
    );
  }

  if (dimensions) {
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          <Image
            src={src}
            alt="image from message"
            height={dimensions?.height}
            width={dimensions?.width}
            className="rounded-md border-2 border-gray-800 max-h-[300px] max-w-[300px] object-cover hover:scale-105 transition-all"
            {...props}
          />
        </button>
        <Transition
          appear
          show={isOpen}
          as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setIsOpen(false)}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              </Transition.Child>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-0  z-[9999]">
                <MdClose className="w-8 h-8" />
              </button>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true">
                &#8203;
              </span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <div className="inline-block max-w-full max-h-full overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                  <Image
                    src={src}
                    alt="image from message"
                    width={dimensions.width}
                    height={dimensions.height}
                    className="w-full h-full object-contain"
                    {...props}
                  />
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return null;
};

export default DynamicImage;
