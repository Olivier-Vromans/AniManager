"use client"
import Image from 'next/image.js';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.js';
import validator from 'validator';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    const { login, signup, currentUser, logout } = useAuth();

    if (currentUser) {
        console.log(currentUser);
        // window.location.href = '/';
    }

    async function submitHandler() {
        setError(null);
        if (!email || !password) {
          setError('Please enter a valid email and password');
          return;
        }
      
        if (!validator.isEmail(email)) {
          setError('Please enter a valid email');
          return;
        }
      
        try {
          if (isLoggingIn) {
            await login(email, password);
            return window.location.href = '/';
          } else {
            await signup(email, password);
            return window.location.href = '/';
          }

        } catch (err) {
          console.log(err);
          if (err.code === 'auth/wrong-password') {
            setError('Incorrect email or password');
          } else if (err.code === 'auth/user-not-found') {
            setError('User not found');
          } else {
            setError('An error occurred while logging in');
          }
        }
      }
      

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
                {/* Background Image */}
                <Image src="/img/bg/login.webp" alt="Background" className="object-cover" fill />
                {/* Background Video */}
                {/* <video src="/path/to/background-video.mp4" className="object-cover w-full h-full" autoPlay muted loop /> */}
            </div>
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-l z-10">
                <h2 className="text-3xl text-center font-japanese font-bold text-primary mb-6">Anime {isLoggingIn ? "Login" : "Register"}</h2>
                {error && <p key={error} className="text-red-500 text-center mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block font-gilroy text-primary mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded text-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block font-gilroy text-primary mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded text-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={submitHandler}
                    className="btn w-full text-white">
                    {isLoggingIn ? "Login" : "Register"}
                </button>
                {/* <h2
                    onClick={() => setIsLoggingIn(!isLoggingIn)}
                    className="duration-300 hover:scale-110 cursor-pointer text-primary text-center mt-4"
                >
                    {!isLoggingIn ? 'Login' : 'Register'}
                </h2> */}
            </div>
        </div>
    );
}