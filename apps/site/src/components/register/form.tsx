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
    const [otpSent, setOtpSent] = React.useState(false);
    const [otpVerified, setOtpVerified] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const sendOtpHandler = () => {
        // Implement logic to send OTP to the entered phone number
        // For simplicity, let's set otpSent to true immediately
        setOtpSent(true);
    };

    const verifyOtpHandler = (otp) => {
        // Implement logic to verify the entered OTP
        // For simplicity, let's manually set otpVerified to true if the entered OTP is 1234
        if (otp === '1234') {
            setOtpVerified(true);
        } else {
            // You can handle the case when the OTP is incorrect
            setOtpVerified(false);
        }
    };

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
    
    const [availableLocations, setAvailableLocations] = React.useState<string[]>([]);

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
                        <div className="flex gap-6 mt-6">
                                <div className="w-6/12">
                                    <label className="block mb-2 text-themeDarker text-sm">
                                        Gender
                                    </label>
                                    <div className="flex gap-2">
                                        <div>
                                            <input
                                                type="radio"
                                                id="male-radio"
                                                value="male"
                                                {...register('gender', { required: true })}
                                                className="hidden absolute"
                                            />
                                            <label
                                                htmlFor="male-radio"
                                                className={`bg-themePrimary/20 w-full text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-2 py-1.5 text-center cursor-pointer rounded ${
                                                    watch('gender') === 'male'
                                                        ? 'bg-themePrimary text-white'
                                                        : ''
                                                }`}
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="female-radio"
                                                value="female"
                                                {...register('gender', { required: true })}
                                                className="hidden absolute"
                                            />
                                            <label
                                                htmlFor="female-radio"
                                                className={`bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-2 py-1.5 w-full text-center cursor-pointer rounded ${
                                                    watch('gender') === 'female'
                                                        ? 'bg-themePrimary text-white'
                                                        : ''
                                                }`}
                                            >
                                                Female
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="others-radio"
                                                value="others"
                                                {...register('gender', { required: true })}
                                                className="hidden absolute"
                                            />
                                            <label
                                                htmlFor="others-radio"
                                                className={`bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-2 py-1.5 w-full text-center cursor-pointer rounded ${
                                                    watch('gender') === 'others'
                                                        ? 'bg-themePrimary text-white'
                                                        : ''
                                                }`}
                                            >
                                                Others
                                            </label>
                                        </div>
                                    </div>
                                    {errors?.gender && (
                                        <span className="text-red-600 text-xss italic">
                                            Gender is required
                                        </span>
                                    )}
                                </div>
                                <div className="w-6/12">
                                    <label className="block mb-2 text-themeDarker text-sm">
                                        Phone Number
                                    </label>
                                    <input
                                        className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                            errors?.phone_number
                                                ? '!border-red-500'
                                                : 'border-gray'
                                        } focus:ring-themePrimary focus:ring-opacity-50 text-sm`}
                                        type="tel"
                                        {...register('phone_number', {
                                            required: true,
                                        })}
                                        placeholder="Enter Your Phone Number"
                                    />
                                    {errors?.phone_number && (
                                        <span className="text-red-600 text-xss italic">
                                            Phone number is required
                                        </span>
                                    )}
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
                
                     <div className="mb-6">
                    <div className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            id="agree-checkbox"
                            {...register('agree', { required: true })}
                            className="hidden absolute"
                        />
                        <label
                            htmlFor="agree-checkbox"
                            className={`text-coolGray-600 text-sm cursor-pointer ${
                                watch('agree') ? 'relative' : ''
                            }`}
                        >
                            <span className={`inline-block w-4 h-4 border rounded-md mr-2 ${watch('agree') ? 'border-themePrimary' : 'border-coolGray-400'}`}></span>
                            {watch('agree') && (
                                <span className="absolute top-0 left-0 mt-1 ml-0.5 text-themePrimary">&#10003;</span>
                            )}
                            I agree to the{' '}
                            <Link href="/terms-of-service">
                                <a className="text-themePrimary hover:underline">
                                    Terms of Service
                                </a>
                            </Link>{' '}
                            &{' '}
                            <Link href="/privacy-policy">
                                <a className="text-themePrimary hover:underline">
                                    Privacy Policy
                                </a>
                            </Link>
                        </label>
                    </div>
                    {errors?.agree && (
                        <span className="text-red-600 text-xss italic">
                            Please agree to the terms and privacy policy
                        </span>
                    )}
                </div>

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
