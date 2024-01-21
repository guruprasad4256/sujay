import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { Axios } from '../utils/axiosKits';
import styles from '../RegisterForm.module.css';
import React, { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  // Add other form fields here
}
const handleSendOTP = () => {
  // Placeholder logic for sending OTP
  console.log('Sending OTP...'); // Replace this with your actual OTP sending logic
};

const Form = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setLoading(true);
      // Your existing logic for handling form submission
      setLoading(false);
    }
  };

  const previousHandler = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  return (
    <div>
      <div className={`max-w-md mx-auto shadow px-8 py-10 rounded-lg bg-white relative ${styles.registerForm}`}>
        {/* Process Steps with Progress Bar */}
        <div className={`relative ${styles.processStepsContainer}`}>
          <div className={`${styles.progressBar} ${styles[`progress${currentPage - 1}`]}`} />
          <div className={`${styles.processSteps}`}>
            <div className={`${styles.processStep} ${currentPage === 1 ? styles.active : ''}`}>
              <div className={`${styles.stepNumber}`}>1</div>
              <div className={`${styles.stepName}`}>Step 1</div>
            </div>
            <div className={`${styles.processStep} ${currentPage === 2 ? styles.active : ''}`}>
              <div className={`${styles.stepNumber}`}>2</div>
              <div className={`${styles.stepName}`}>Step 2</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h1 className={`${styles.color} text-center`}>Register Your Account</h1><br></br>

          {currentPage === 1 && (
            <div className="mb-6">
              <div className="flex gap-6">
                <div className="w-1/2">
                  <label className="block mb-2 text-themeDarker" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    id="first_name"
                    className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
                      errors?.first_name ? '!border-red-500' : 'border-gray'
                    } rounded-lg placeholder-coolGray-400 focus:outline-none`}
                    type="text"
                    {...register('first_name', { required: true })}
                  />
                  {errors?.first_name && (
                    <span className="text-red-600 text-xss italic">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 text-themeDarker" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
                      errors?.last_name ? '!border-red-500' : 'border-gray'
                    } rounded-lg placeholder-coolGray-400 focus:outline-none`}
                    type="text"
                    {...register('last_name', { required: true })}
                  />
                  {errors?.last_name && (
                    <span className="text-red-600 text-xss italic">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="mb-6">
              <div className="flex gap-6">
                <div className="w-1/2">
                  <label className="block mb-2 text-themeDarker" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                      errors?.email ? '!border-red-500' : 'border-gray'
                    } focus:ring-themePrimary focus:ring-opacity-50`}
                    type="email"
                    {...register('email', { required: true })}
                  />
                  {errors?.email && (
                    <span className="text-red-600 text-xss italic">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 text-themeDarker" htmlFor="phone_number">
                    Phone Number
                  </label>
                  <input
                    id="phone_number"
                    className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                      errors?.phone_number ? '!border-red-500' : 'border-gray'
                    } focus:ring-themePrimary focus:ring-opacity-50`}
                    type="tel"
                    {...register('phone_number', { required: true })}
                  />
                  {errors?.phone_number && (
                    <span className="text-red-600 text-xss italic">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rest of your form fields */}

          {currentPage === 2 && (
            <div className="mt-8">
              <p className="text-lg font-semibold mb-4 text-coolGray-800">Phone Number Verification</p>
              <div className="flex items-center justify-center">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="py-2 px-4 border border-coolGray-300 rounded-md mr-4 focus:outline-none focus:ring focus:border-themePrimary"
                />
                <button
                  onClick={handleSendOTP} // Call the defined handleSendOTP function
                  className="py-2 px-6 bg-themePrimary text-white rounded-md hover:bg-black focus:outline-none focus:ring focus:border-themePrimary"
                >
                  Send OTP
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <br></br>
          <div className="flex gap-4">
            {currentPage === 2 && (
              <button
                onClick={previousHandler}
                className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
            >
              {currentPage === 1 ? 'Next' : <>{loading ? 'Please wait...' : 'Sign Up'}</>}
            </button>
          </div>

          <p className="text-center">
            <span className="text-xss1 text-deep">
              Already have an account?
            </span>
            <Link href="/login">
              <a className="inline-block text-xss1 text-themePrimary hover:text-green-700 hover:underline ml-4">
                Log In
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
