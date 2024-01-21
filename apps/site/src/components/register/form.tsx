import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { Axios } from '../utils/axiosKits';

const RegisterForm = () => {
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
    
    const stateLocationData = [
        {
            "S. No.": 1,
            "DISTRICT": "ANDAMAN_NICOBAR_IS",
            "STATE": "Andman & Nicobar Island"
        },
        {
            "S. No.": 2,
            "DISTRICT": "ADILABAD",
            "STATE": "Andhra Pradesh"
        },
        {
            "S. No.": 3,
            "DISTRICT": "ANANTAPUR",
            "STATE": "Andhra Pradesh"
        },
        // Add more data as needed
    ];

    const [selectedState, setSelectedState] = React.useState('');
    const [availableLocations, setAvailableLocations] = React.useState([]);

    React.useEffect(() => {
        // Filter locations based on the selected state
        const filteredLocations = stateLocationData
            .filter((item) => item.STATE === selectedState)
            .map((item) => item.DISTRICT);

        setAvailableLocations(filteredLocations);
    }, [selectedState]);

    /* ----------------------------- register submit function ---------------------------- */
    const onSubmitHandler = async (data: any) => {
        if (CurrentPage === 1) {
            setCurrentPage(2);
        }
        if (CurrentPage === 2) {
            setLoading(true);
            if (data.password !== data.confirm_password) {
                addToast('Password and Confirm Password does not match', {
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
                                isCandidate:
                                    data.freelancer_role === 'candidate'
                                        ? true
                                        : false,
                                isEmployer:
                                    data.freelancer_role === 'employer'
                                        ? true
                                        : false,
                                isAdmin:
                                    data.freelancer_role === 'admin'
                                        ? true
                                        : false,
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
                    addToast(error.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                }
            }
        }
    };

    /* ------------------------- previous page function ------------------------- */
    const previousHandler = () => {
        if (CurrentPage === 2) {
            setCurrentPage(1);
        }
    };

    return (
        <div className="max-w-md mx-auto shadow px-8 py-10 rounded-lg bg-white">
            {/* ... */}
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                {CurrentPage === 1 && (
                    <>
                        <div className="mb-6">
                            <label className="block mb-2 text-themeDarker">
                                Full Name
                            </label>
                            <div className="flex gap-6">
                                <input
                                    className={`appearance-none block w-1/2 !p-3 leading-5 text-coolGray-900 border ${
                                        errors?.first_name
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } rounded-lg placeholder-coolGray-400 focus:outline-none `}
                                    type="name"
                                    {...register('first_name', {
                                        required: true,
                                    })}
                                    placeholder="First Name"
                                />
                                <input
                                    className={`appearance-none block w-1/2 !p-3 leading-5 text-coolGray-900 border ${
                                        errors?.last_name
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } rounded-lg placeholder-coolGray-400 focus:outline-none `}
                                    type="name"
                                    {...register('last_name', {
                                        required: true,
                                    })}
                                    placeholder="Last Name"
                                />
                            </div>
                            {errors?.first_name && (
                                <span className="text-red-600 text-xss italic">
                                    First name is required
                                </span>
                            )}
                            {errors?.last_name && (
                                <span className="text-red-600 text-xss italic">
                                    Last name is required
                                </span>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-themeDarker">
                                Email and Phone Number
                            </label>
                            <div className="flex gap-6">
                                <input
                                    className={`appearance-none block w-1/2 !p-3 leading-5 text-coolGray-900 border ${
                                        errors?.email
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                        errors?.email
                                            ? 'ring-red-500'
                                            : 'focus:ring-themePrimary focus:ring-opacity-50'
                                    }`}
                                    type="email"
                                    {...register('email', { required: true })}
                                    placeholder="Enter Your Email"
                                />
                                <input
                                    className={`appearance-none block w-1/2 !p-3 leading-5 text-coolGray-900 border ${
                                        errors?.phone_number
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                        errors?.phone_number
                                            ? 'ring-red-500'
                                            : 'focus:ring-themePrimary focus:ring-opacity-50'
                                    }`}
                                    type="tel"
                                    {...register('phone_number', {
                                        required: true,
                                    })}
                                    placeholder="Enter Your Phone Number"
                                />
                            </div>
                            <div className="flex">
                                <div className="w-1/2">
                                    {errors?.email && (
                                        <span className="text-red-600 text-xss italic">
                                            Email is required
                                        </span>
                                    )}
                                </div>
                                <div className="w-1/2">
                                    {errors?.phone_number && (
                                        <span className="text-red-600 text-xss italic">
                                            Phone number is required
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-themeDarker">
                                State and Location
                            </label>
                            <div className="flex gap-6">
                                <div className="w-1/2">
                                    <select
                                        className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border ${
                                            errors?.state
                                                ? '!border-red-500'
                                                : 'border-gray'
                                        } rounded-lg focus:outline-none focus:ring-2 ${
                                            errors?.state
                                                ? 'ring-red-500'
                                                : 'focus:ring-themePrimary focus:ring-opacity-50'
                                        }`}
                                        {...register('state', { required: true })}
                                        onChange={(e) =>
                                            setSelectedState(e.target.value)
                                        }
                                    >
                                        <option value="" disabled selected>
                                            Select State
                                        </option>
                                        {stateLocationData.map((item) => (
                                            <option
                                                key={item["S. No."]}
                                                value={item.STATE}
                                            >
                                                {item.STATE}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.state && (
                                        <span className="text-red-600 text-xss italic">
                                            State is required
                                        </span>
                                    )}
                                </div>
                                <div className="w-1/2">
                                    <select
                                        className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border ${
                                            errors?.location
                                                ? '!border-red-500'
                                                : 'border-gray'
                                        } rounded-lg focus:outline-none focus:ring-2 ${
                                            errors?.location
                                                ? 'ring-red-500'
                                                : 'focus:ring-themePrimary focus:ring-opacity-50'
                                        }`}
                                        {...register('location', {
                                            required: true,
                                        })}
                                    >
                                        <option value="" disabled selected>
                                            Select Location
                                        </option>
                                        {availableLocations.map((location) => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.location && (
                                        <span className="text-red-600 text-xss italic">
                                            Location is required
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                          <div className="mb-6">
                            <label className="block mb-2 text-themeDarker">
                                New Password
                            </label>
                            <div className="flex gap-6">
                                <input
                                    className={`appearance-none block w-1/2 !p-3 leading-5 text-coolGray-900 border ${
                                        errors?.password
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                        errors?.password
                                            ? 'ring-red-500'
                                            : 'focus:ring-themePrimary focus:ring-opacity-50'
                                    }`}
                                    type="password"
                                    {...register('password', {
                                        required: true,
                                        minLength: 8,
                                    })}
                                    placeholder="New Password"
                                />
                                <input
                                    className={`appearance-none block w-1/2 !p-3 leading-5 text-coolGray-900 border ${
                                        errors?.confirm_password
                                            ? '!border-red-500'
                                            : 'border-gray'
                                    } rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                        errors?.confirm_password
                                            ? 'ring-red-500'
                                            : 'focus:ring-themePrimary focus:ring-opacity-50'
                                    }`}
                                    type="password"
                                    {...register('confirm_password', {
                                        required: true,
                                        validate: (value) =>
                                            value === watch('password') ||
                                            'Passwords do not match',
                                    })}
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <div className="flex">
                                <div className="w-1/2">
                                    {errors?.password && (
                                        <span className="text-red-600 text-xss italic">
                                            {errors?.password?.message}
                                        </span>
                                    )}
                                </div>
                                <div className="w-1/2">
                                    {errors?.confirm_password && (
                                        <span className="text-red-600 text-xss italic">
                                            {errors?.confirm_password?.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* ... (remaining code) */}
                    </>
                )}
                        {/* ... (remaining code) */}
                     {/* ... (remaining code) */}
                

                {CurrentPage === 2 && (
                    <>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-themeDarker"
                                htmlFor=""
                            >
                                Password
                            </label>
                            <input
                                className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border ${
                                    errors?.password
                                        ? '!border-red-500'
                                        : 'border-gray'
                                } rounded-lg placeholder-coolGray-400 focus:outline-none `}
                                type="password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'This field is required',
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters',
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
                        <div className="mb-4">
                            <label
                                className="block mb-2 text-themeDarker"
                                htmlFor=""
                            >
                                Confirm Password
                            </label>
                            <input
                                className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border ${
                                    errors?.confirm_password
                                        ? '!border-red-500'
                                        : 'border-gray'
                                } rounded-lg placeholder-coolGray-400 focus:outline-none `}
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
                    </>
                )}

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
                        {CurrentPage === 1 ? (
                            'Next'
                        ) : (
                            <>{loading ? 'Please wait...' : 'Sign Up'}</>
                        )}
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
export default RegisterForm;
