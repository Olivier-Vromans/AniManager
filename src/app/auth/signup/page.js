"use client"
import Image from 'next/image.js';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';


export default function SignUPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  async function submitHandler(event) {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/api/auth/signup', {
        username: username,
        password: password,
      });

      const data = response.data;
      if (!data.user) {
        setError(data.message);
        return;
      }

      await signIn('credentials', {
        username: data.user.username,
        password: password,
        callbackUrl: '/',
      });

      // Handle success
    } catch (error) {
      setError(error.message);
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
        <h2 className="text-3xl text-center font-japanese font-bold text-primary mb-6">Register</h2>
        {error && <p key={error} className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-gilroy text-primary mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded text-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-gilroy text-primary mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded text-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="btn w-full text-white"
          />
        </form>

        {/* <div className="mb-4">
          <label htmlFor="username" className="block font-gilroy text-primary mb-2">Username:</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded text-primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          className="btn w-full text-white"
          type='submit'
        >
          Sign Up
        </button> */}

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