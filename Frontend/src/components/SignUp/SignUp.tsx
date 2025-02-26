import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../Hooks/apis/auth/useSignup';
import Loader from '../Loader/Loader';



const SignUp: React.FC = () => {
    const [formData, setFromData] = useState({
        username: '',
        email: "",
        password: ""
    });
    const [inputError, setInputError] = useState('')
    const navigate = useNavigate();

    const { isPending,error, isSuccess, signupMutation } = useSignup()

    const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (formData.email === '' || formData.password === '') {
            setInputError("Please enter username, email or password")
        } else {
            setInputError('')
            signupMutation(formData);
        }
    };

    useEffect(()=>{
        if(error?.message == 'user already exist'){
            setInputError('user already exits')
        }
        if(error){
            setInputError('Internal Server Error')
        }
    },[error]);

    useEffect(()=>{
        if(isSuccess){
            navigate('/signin')
        }
    },[isSuccess, navigate])

    return (
        <>
            <div>
                <div className="text-center">
                    <h2 className="text-2xl text-white mb-2">Welcome back!</h2>
                    <p className="text-[#B9BBBE] mb-8">We're so excited to see you again!</p>
                </div>
                <form>
                    <div className="mb-2">
                        <label className="block text-sm font-bold text-[#B9BBBE] mb-2" htmlFor="email">
                            USERNAME
                        </label>
                        <input
                            type="text"
                            id="username"
                            onChange={(e) => {
                                setInputError('')
                                setFromData({ ...formData, username: e.target.value })
                            }}
                            className="w-full px-3 py-2 text-[#B9BBBE] bg-[#202225] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-[#B9BBBE] mb-2" htmlFor="email">
                            EMAIL
                        </label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => {
                                setInputError('')
                                setFromData({ ...formData, email: e.target.value })
                            }}
                            className="w-full px-3 py-2 text-[#B9BBBE] bg-[#202225] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-[#B9BBBE] text-sm font-bold mb-2" htmlFor="password">
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setFromData({ ...formData, password: e.target.value })}
                            className="w-full px-3 py-2 text-[#B9BBBE] rounded-sm bg-[#202225]  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* <div className="mb-4 text-right">
                        <a href="#" className="text-blue-400 hover:underline">
                            Forgot your password?
                        </a>
                    </div> */}
                    <span className='text-red-500'>{inputError ? inputError : ''}</span>
                    <button
                        type="submit"
                        className="w-full mt-2 py-2 bg-[#5865F2] text-white font-bold rounded-sm hover:bg-[#3744d3] flex items-center justify-center gap-5"
                        onClick={(e) => handleSignup(e)}
                    >
                        Log In
                        {isPending && <Loader/>}
                    </button>
                </form>
                <div className="mt-4">
                    <span className="text-[#B9BBBE]">
                        Already have an account? <span onClick={() => navigate('/signin')} className='text-blue-400 mx-2 hover:underline cursor-pointer'>Login</span>
                    </span>
                </div>

            </div>
        </>
    );
};

export default SignUp;
