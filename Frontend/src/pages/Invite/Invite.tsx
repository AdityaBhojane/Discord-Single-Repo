import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetServersById } from '../../Hooks/apis/server/useGetServerById';
import { useAddMember } from '../../Hooks/apis/server/useAddMember';
const Invite: React.FC = () => {
    const { serverId } = useParams();
    const { joinCode } = useParams();
    const [errorMessage, setErrorMessage] = useState(false)
    const [join, setJoin] = useState(true);
    const navigate = useNavigate()
    const { getServerById, isSuccess} = useGetServersById(serverId);
    const {AddMember, isSuccess:addMemberSUccess, error} = useAddMember()

    useEffect(()=>{
        if(isSuccess){
            if(getServerById?.joinCode !== joinCode){
                setJoin(false)
            }
        };
        if(addMemberSUccess){
            navigate('/@me')
        }
        if(error){
            setErrorMessage(true)
        }
    },[addMemberSUccess, getServerById?.joinCode, error, isSuccess, joinCode, navigate]);

    const handleJoin = ()=>{
        if(!serverId) return;
        AddMember({serverId:serverId})
    }



    
    
    return (
        <div className="w-full flex h-screen text-white bg-heroInvite bg-cover bg-no-repeat">
            <div className="w-full max-w-xl mx-auto my-auto bg-[#36393F] rounded-xl shadow-lg p-8">
                <div className="flex flex-col justify-center items-center mb-4 cursor-pointer overflow-hidden">
                    <img className='h-20 w-20 rounded-full' src={`https://api.dicebear.com/9.x/initials/svg?seed=${getServerById?.name}`} alt="server-icon" />
                    <div className='text-2xl mt-4'>
                        <p>{getServerById?.name}</p>
                    </div>
                    <button 
                    onClick={()=>{
                        console.log("first")
                        handleJoin()
                    }}
                    disabled={!join} 
                    className={`${ join? "bg-blue-600 hover:bg-blue-700":"bg-red-700"} px-6 py-1 rounded-xl mt-5 `}
                    >{join? "Join Now":"invite Expire"}</button>
                </div>
                {errorMessage && <p className='text-md text-red-500 text-center'>{error?.message}</p>}
            </div>
        </div>
    );
};

export default Invite;