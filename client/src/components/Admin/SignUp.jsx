import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await fetch('https://ten-ivr.onrender.com/api/admin/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (response.status === 201) {
      console.log('Signup successful:', await response.json());
      alert('Signup successful! Please log in.');
      navigate('/login');
    } else {
      const errorMessage = await response.json();
      alert(errorMessage.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-900">Email :</label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="username" className="block text-gray-900">Username :</label>
            <Input
              id="username"
              type="text"
              placeholder="example01"
              {...register('username', { required: 'Username is required' })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-900">Password :</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="***"
                {...register('password', { required: 'Password is required' })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye className="text-gray-500"/> : <FaEyeSlash className="text-gray-500"/>}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-gray-900">Confirm Password :</label>
            <Input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: value => value === watch('password') || 'Passwords do not match',
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;