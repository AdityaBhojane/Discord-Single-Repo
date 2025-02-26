import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../../zustand/auth store/AuthStore"
import { useNavigate } from "react-router-dom";


function ProtectedUser({children}:{children:ReactNode}) {
    const navigate = useNavigate()
    const token = useAuthStore(state=> state.token);

    useEffect(()=>{
        if(token){
          console.log('page')
            navigate('/@me');
        }else{
          console.log('signin')
            navigate('/signin')
        }
    },[navigate, token])
    

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedUser