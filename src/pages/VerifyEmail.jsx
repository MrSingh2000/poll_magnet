import React from 'react'
import { useNavigate } from 'react-router-dom'

function VerifyEmail() {
    const navigate = useNavigate();

    return (
        <div className='container w-full m-auto h-screen flex justify-center items-center'>
            <div className="container flex flex-col justify-center items-center border-1 border-gray-500 w-fit py-5 px-7 rounded-xl shadow-md">
                <p className='text-2xl font-semibold mb-1'>Please verify your account.</p>
                <p className='text-sm'>Check your mail for verification link.</p>
                <button
                    onClick={() => navigate('/login')}
                    type="submit"
                    className="mt-4 flex items-center justify-center w-fit px-7 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default VerifyEmail