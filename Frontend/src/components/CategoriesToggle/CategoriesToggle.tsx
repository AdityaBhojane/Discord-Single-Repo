import {  ReactNode, useState } from "react"
import { Plus } from "lucide-react";
import { useModalStore } from "../../zustand/modal store/ModalStore";



export default function CategoriesToggle({ categoryName, children, categoryId }: { categoryName: string, children: ReactNode, categoryId?:string  }) {
    const [openChannel, setOpenChannel] = useState(false);
    const setCreateChannelModal = useModalStore((state) => state.setCreateChannelModal);
    const setEditModal = useModalStore(state => state.setEditModal);
    // console.log("CI",categoryId)

    return (
        <>
            <div className="mx-2 pt-3 px-1 flex justify-between items-center text-[#949BA4] ">
                <div 
                onClick={() => setOpenChannel(!openChannel)} 
                onContextMenu={(e) => {
                    e.preventDefault();
                    const id = categoryId?? ""
                    console.log("ID",id)
                    setEditModal(categoryName,"category",id)
                }} 
                className="flex items-center cursor-pointer ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        className={`w-3 h-3 mr-2 ${openChannel ? 'rotate-90' : ""} transition-all`}
                    >
                        <path
                            clipRule="evenodd"
                            d="m5.41667 4.2625 5.66573 5.7375-5.66573 5.7375 1.74426 1.7625 7.42237-7.5-7.42237-7.5z"
                            fill="#cccccc"
                            fillRule="evenodd"
                        />
                    </svg>
                    <p className="text-[12px] text-[#adadad]">{categoryName}</p>
                </div>
                <Plus className="size-4 cursor-pointer" onClick={()=>setCreateChannelModal()} />
            </div>
            {openChannel ? children : <></>}
        </>
    )
}
