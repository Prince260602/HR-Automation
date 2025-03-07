import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Send login data to the backend API
      const response = await axios.post('https://hr-automation-hxy7.onrender.com/api/admin/login', data);
  
      if (response.status === 200) {
        const { token, admin } = response.data;
        localStorage.setItem('authToken', token);
  
        console.log('Login successful:', admin);
        
        // Navigate to the Admin page
        navigate('/Admin');
        // Refresh the page after navigating
        window.location.reload(); // This will refresh the page
      } else {
        alert(response.data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Login Form</h2>
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
            <label htmlFor="password" className="block text-gray-900">Password :</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="*******"
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
{/*           <div className="flex justify-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500">
                <span>Create an account</span>
              </Link>
            </p>
          </div> */}
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
