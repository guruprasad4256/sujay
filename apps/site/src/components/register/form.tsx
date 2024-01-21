import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { Axios } from '../utils/axiosKits';
import styles from '../RegisterForm.module.css'; 
import React, { useEffect, useState } from 'react';
const handleSendOTP = () => {
    // Placeholder logic for sending OTP
    console.log('Sending OTP...'); // Replace this with your actual OTP sending logic
  };

const form = () => {
    const [CurrentPage, setCurrentPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const { addToast } = useToasts();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmitHandler = async (data: any) => {
        if (CurrentPage === 1) {
            setCurrentPage(2);
        }
        if (CurrentPage === 2) {
            setLoading(true);
            if (data.password !== data.confirm_password) {
                addToast('Password and Confirm Password do not match', {
                    appearance: 'error',
                    autoDismiss: true,
                });
                setLoading(false);
            } else if (data.password === data.confirm_password) {
                try {
                    await Axios({
                        method: 'post',
                        url: `/users/signup`,
                        data: {
                            fullName: {
                                firstName: data.first_name,
                                lastName: data.last_name,
                            },
                            email: data.email,
                            isConfirmed: false,
                            password: data.password,
                            role: {
                                isCandidate: true,
                                isEmployer: false,
                                isAdmin: false,
                            },
                        },
                    }).then((res) => {
                        setLoading(false);
                        if (res.status === 200 || res.status === 201) {
                            addToast(res.data.message, {
                                appearance: 'success',
                                autoDismiss: true,
                            });
                            Router.push('/login');
                            setTimeout(() => {
                                setCurrentPage(1);
                                reset();
                            }, 3000);
                        }
                    });
                } catch (error: any) {
                    setLoading(false);
                    const errorMessage =
                        error.response && error.response.data
                            ? error.response.data.message
                            : 'An error occurred';
                    addToast(errorMessage, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                }
            }
        }
    };

    const previousHandler = () => {
        if (CurrentPage === 2) {
            setCurrentPage(1);
        }
    };    return (
        <div className={`max-w-md mx-auto shadow px-8 py-10 rounded-lg bg-white relative ${styles.registerForm}`}>
        {/* Process Steps with Progress Bar */}
        <div className={`relative ${styles.processStepsContainer}`}>
            <div className={`${styles.progressBar} ${styles[`progress${CurrentPage - 1}`]}`} />
            <div className={`${styles.processSteps}`}>
                <div className={`${styles.processStep} ${CurrentPage === 1 ? styles.active : ''}`}>
                    <div className={`${styles.stepNumber}`}>1</div>
                    <div className={`${styles.stepName}`}>Step 1</div>
                </div>
                <div className={`${styles.processStep} ${CurrentPage === 2 ? styles.active : ''}`}>
                    <div className={`${styles.stepNumber}`}>2</div>
                    <div className={`${styles.stepName}`}>Step 2</div>
                </div>
            </div>
        </div>

      
            <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1 className={`${styles.color} text-center`}>Register Your Account</h1><br></br>
            {CurrentPage === 1 && (
  <>

    
 
    
    <div className="mb-6">
      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            First Name
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.first_name ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="name"
            {...register('first_name', { required: true })}
          />
          {errors?.first_name && (
            <span className="text-red-600 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Last Name
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.last_name ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="name"
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

    <div className="mb-6">
      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Email
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
              errors?.email ? '!border-red-500' : 'border-gray'
            } focus:ring-themePrimary focus:ring-opacity-50`}
            type="name"
            {...register('email', { required: true })}
          />
          {errors?.email && (
            <span className="text-red-600 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Phone Number
          </label>
          <input
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

    <div className="mb-6">
      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Password
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.password ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'This field is required',
              },
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            placeholder="Enter Password"
          />
          {errors?.password && (
            <span className="text-red-600 text-xss italic">
              {errors?.password?.message}
            </span>
          )}
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Confirm Password
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.confirm_password ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="password"
            {...register('confirm_password', {
              required: {
                value: true,
                message: 'This field is required',
              },
              validate: (value) => {
                return (
                  value === watch('password') ||
                  'Passwords do not match'
                );
              },
            })}
            placeholder="Enter Confirm Password"
          />
          {errors?.confirm_password && (
            <span className="text-red-600 text-xss italic">
              {errors?.confirm_password?.message}
            </span>
          )}
        </div>
      </div>
    </div>
  

    {/* Rest of your form fields */}
  </>
)}



   
{/* Phone Number Verification Section Styling */}
{CurrentPage === 2 && (
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

          {/* OTP Input Boxes */}
          
      
)}

{/* Buttons */}<br></br>
<div className="flex gap-4">
    {CurrentPage === 2 && (
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
        {CurrentPage === 1 ? 'Next' : <>{loading ? 'Please wait...' : 'Sign Up'}</>}
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
    );
};

export default form;
