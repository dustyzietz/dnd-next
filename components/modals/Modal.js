import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { IoCloseCircleOutline } from "react-icons/io5"

const Modal = ({ open, setOpen, children }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed z-50 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 transition-opacity bg-opacity-30" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block align-bottom bg-white 
              rounded-lg pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle  max-w-xl relative`}
            >
              <button onClick={()=>setOpen(false)} className='float-right p-1'>
                  <IoCloseCircleOutline size={40}  />
              </button>
              <div>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
