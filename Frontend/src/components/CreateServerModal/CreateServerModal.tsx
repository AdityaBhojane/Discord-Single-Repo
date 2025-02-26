import {
  Modal,
  ModalContent,
  ModalHeader,
  // ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { useModalStore } from "../../zustand/modal store/ModalStore";
import CreateServerIcon from "../icons svgs/CreateServerIcon";
import ForwardArrow from "../icons svgs/ForwardArrow";
import { MouseEvent, useEffect, useState } from "react";
import { useCreateServer } from "../../Hooks/apis/server/useCreateServer";
import { useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
// import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";


const CreateServerModal: React.FC = () => {
  const CreateServerModal = useModalStore((state) => state.CreateServerModal);
  const setCreateServerModal = useModalStore((state) => state.setCreateServerModal);
  const [createServer, setCreateServer] = useState(false);
  const [inputError, setInputError] = useState('');
  const [serverName, setServerName] = useState('');
  const queryClient = useQueryClient();

  //  const token = useAuthStore((state) => state.token);
  //   const setToken = useAuthStore((state) => state.setToken);
  // const navigate = useNavigate()

  const { isPending, isSuccess, error, createServerMutation } = useCreateServer()

  const handleCreateServer = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (serverName == '') {
      setInputError("please provide a server name");
      return;
    };
    createServerMutation({ name: serverName });
  };

  useEffect(() => {
    if (error) {
      setInputError('Internal Server Error')
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setCreateServerModal();
      queryClient.invalidateQueries({ queryKey: ['fetchAllServers'] });
    }
  }, [isSuccess, queryClient, setCreateServerModal]);


  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={CreateServerModal}
        onOpenChange={setCreateServerModal}
      >
        <ModalContent className="bg-[#313338]">
          {(onClose) => (
            <>
              <div className="text-center p-4">
                <ModalHeader className="flex flex-col gap-1 text-xl text-[#ccc]">Create Your Server</ModalHeader>
                <p className="text-[#a8a8a8] text-sm font-thin px-8 relative bottom-3">Your server is where you and your friends hang out. Make yours and start taking</p>
              </div>
              {createServer ?
                <div className="p-2  flex items-center justify-center flex-col rounded-lg mb-5 cursor-pointer m-4 ">
                  <div className="flex items-center justify-center p-2">
                    {/* <label className="relative flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-full cursor-pointer hover:border-gray-300">
                      <input type="file" className="hidden" />
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14"></path>
                          <path d="M5 12h14"></path>
                        </svg>
                        <p className="text-sm text-gray-300 mt-1">UPLOAD</p>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xl">
                        +
                      </div>
                    </label> */}
                  </div>
                  <div className="w-full">
                    <label className=" text-sm font-bold text-[#B9BBBE] mb-2" htmlFor="email">
                      SERVER NAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      onChange={(e) => {
                        setInputError('')
                        setServerName(e.target.value)
                      }}
                      className="w-full px-3 py-2 text-[#B9BBBE] bg-[#202225] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className='text-red-500 text-sm'>{inputError ? inputError : ''}</span>
                  </div>
                  <span className="mt-5 text-sm text-[#ccc] absolute top-0 left-5"
                    onClick={() => {
                      setCreateServer(false)
                    }}
                  > back </span>
                </div>
                :
                <div onClick={() => {
                  setCreateServer(true)
                }} className="p-2 border border-[#636363] flex items-center rounded-lg mb-5 hover:bg-[#ffffff10] cursor-pointer m-4">
                  <div className="h-12 w-12 rounded-full bg-gray-700 mb-4 cursor-pointer translate-y-2 mx-3">
                    <CreateServerIcon />
                  </div>
                  <p className="text-[#ccc] font-bold text-md">Create My Own server</p>
                  <ForwardArrow />
                </div>
              }
              <ModalFooter className="flex flex-col justify-center items-center bg-[#2B2D31] h-22">
                <p className="text-md font-semibold text-[#b3b3b3]">Already have an invite?</p>
                {createServer ?
                  <button
                    color="default"
                    className="text-white bg-[#4b6ffd] px-6 py-2 w-full flex justify-center items-center gap-5"
                    onClickCapture={(e) => {
                      handleCreateServer(e)
                    }}
                  >
                    Create Server
                    {isPending && <Loader />}
                  </button> :
                  <Button
                    color="default"
                    variant="light"
                    onPress={onClose}
                    className="text-white bg-[#4E5058] w-full"
                  >
                    Join a Server
                  </Button>
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateServerModal;
