import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyQR from '../MyQR/MyQR';
import { useSignin } from '../../Hooks/apis/auth/useSignin';
import Loader from '../Loader/Loader';
import { useAuthStore } from '../../zustand/auth store/AuthStore';


const SignIn: React.FC = () => {
    const [formData, setFromData] = useState({
        email:"",
        password:""
    });
    const [inputError, setInputError] = useState('')
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token) || '';
    console.log(token)

    const {isPending,isSuccess,error,signinMutation } = useSignin()

    const handleSignin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if(formData.email === '' || formData.password === ''){
            setInputError("Please enter email or password")
        }else{
            setInputError('')
            signinMutation(formData);
        }
    };

    useEffect(()=>{
        if(error?.message == "password or email is wrong"){
            console.log('first')
            setInputError('enter a valid email or password')
        }else if(error){
            setInputError("Internal Server Error")
        }
        
    },[error]);

    useEffect(()=>{
        if(isSuccess){
            navigate('/@me')
        }
    },[isSuccess,navigate]);



    return (
        <>
            <div className='flex items-center justify-between'>
                <div className="w-1/2">
                    <div className="text-center">
                        <h2 className="text-2xl text-white mb-2">Welcome back!</h2>
                        <p className="text-[#B9BBBE] mb-8">We're so excited to see you again!</p>
                    </div>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-[#B9BBBE] mb-2" htmlFor="email">
                                EMAIL
                            </label>
                            <input
                                type="text"
                                onChange={(e)=> setFromData({...formData,email:e.target.value})}
                                id="email"
                                className="w-full px-3 py-2 text-[#B9BBBE] bg-[#202225] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="password">
                                PASSWORD
                            </label>
                            <input
                                type="password"
                                onChange={(e)=> setFromData({...formData,password:e.target.value})}
                                id="password"
                                className="w-full px-3 py-2 text-[#B9BBBE] rounded-sm bg-[#202225]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* <div className="mb-4 text-right">
                        <a href="#" className="text-blue-400 hover:underline">
                        Forgot your password?
                        </a>
                        </div> */}
                        <span className='text-red-500'>{inputError? inputError:''}</span>
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-[#5865F2] text-white font-bold rounded-sm hover:bg-[#3744d3] flex items-center justify-center gap-5"
                            onClick={(e)=>handleSignin(e)}
                        >
                            Log In
                            {isPending && <Loader/>}
                        </button>
                    </form>
                    <div className="mt-4">
                        <span className="text-[#B9BBBE]">
                            Need an account? <span onClick={() => navigate('/signup')} className='text-blue-400 mx-2 hover:underline cursor-pointer'>Register</span>
                        </span>
                    </div>
                </div>
                <div className="mr-12">
                    <p className='my-3 uppercase'>Scan and Connect </p>
                    <MyQR />
                    <br />
                    <div className="text-center">
                        <button 
                        onClick={()=>{
                            signinMutation({
                                email:'Guest@gmail.com',
                                password:"g12345"
                            });
                        }}
                        className='bg-gray-500 px-6 py-2 mt-5'
                        >Guest Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
