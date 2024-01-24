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
    const [otpSent, setOtpSent] = React.useState(false);
    const [otpVerified, setOtpVerified] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const sendOtpHandler = () => {
        // Implement logic to send OTP to the entered phone number
        // For simplicity, let's set otpSent to true immediately
        setOtpSent(true);
    };

    const [selectedState, setSelectedState] = React.useState('');
    
    const [availableLocations, setAvailableLocations] = React.useState<string[]>([]);
    const verifyOtpHandler = (otp: string) => {
        // Implement logic to verify the entered OTP
        // For simplicity, let's manually set otpVerified to true if the entered OTP is 1234
        if (otp === '1234') {
            setOtpVerified(true);
            addToast('OTP successfully verified!', {
                appearance: 'success',
                autoDismiss: true,
            });
        } else {
            // You can handle the case when the OTP is incorrect
            setOtpVerified(false);
            addToast('Invalid OTP. Please try again.', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    };



    React.useEffect(() => {
        // Filter locations based on the selected state
        const filteredLocations = stateLocationData
            .filter((item) => item.STATE === selectedState)
            .map((item) => item.DISTRICT);

        setAvailableLocations(filteredLocations);
    }, [selectedState]);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    /* ----------------------------- register submit function ---------------------------- */
    const onSubmitHandler = async (data: any) => {
        if (CurrentPage === 1) {
            setCurrentPage(2);
        } else if (CurrentPage === 2) {
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
        } else if (CurrentPage === 3) {
            try {
                setLoading(true);
                // Example: Sending data to the server on page 3
                const response = await Axios.post('/users/experience', {
                    experienceData: data.experience,
                    // Add other fields as needed
                });

                setLoading(false);

                if (response.status === 200 || response.status === 201) {
                    addToast('Data submitted successfully', {
                        appearance: 'success',
                        autoDismiss: true,
                    });

                    // Navigate to success page or handle accordingly
                    Router.push('/success');
                }
            } catch (error) {
                setLoading(false);
                addToast('Error submitting data', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    };

    /* ------------------------- previous page function ------------------------- */
    const previousHandler = () => {
        if (CurrentPage === 3) {
            setCurrentPage(2);
        } else if (CurrentPage === 2) {
            setCurrentPage(1);
        }
    };

    return (
        <div className="max-w-md mx-auto shadow px-8 py-10 rounded-lg bg-white">
            <div className="mb-6 text-center">
                <h3 className="mb-4 text-2xl text-themeDarker">
                    {CurrentPage === 1
                        ? 'Create an Account'
                        : CurrentPage === 2
                        ? 'Password Confirmation'
                        : 'Additional Information'}
                </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                {CurrentPage === 1 && (
                    <>
                   <div className="flex gap-6 pt-2 pb-8 w-full">
                            <div className="w-6/12 checked:bg-themePrimary text-[#fff]">
                                <input
                                    type="radio"
                                    id="freelancer-radio"
                                    defaultValue="candidate"
                                    className="hidden absolute"
                                    {...register('freelancer_role')}
                                    defaultChecked
                                />
                                <label
                                    htmlFor="freelancer-radio"
                                    className="bg-themePrimary/20 w-full text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded"
                                >
                                    Candidate
                                </label>
                            </div>
                            </div>
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
                                <div className="mb-6">
                            <label
                                className="block mb-2 text-themeDarker"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border ${
                                    errors?.email
                                        ? '!border-red-500'
                                        : 'border-gray'
                                } rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                    errors?.email
                                        ? 'focus:ring-red-500'
                                        : 'focus:ring-themePrimary'
                                } focus:ring-opacity-50`}
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="Enter Your Email"
                            />
                            {errors?.email && (
                                <span className="text-red-600 text-xss italic">
                                    Please enter a valid email
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
                 
                 <div className="flex gap-4">
    {CurrentPage === 1 && (
        <button
            type="submit"
            disabled={loading}
            className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
        >
            {loading ? 'Please wait...' : 'Next Step'}
        </button>
    )}
</div>
             
                {CurrentPage === 2 && (
                    <>
                        <div className="mb-6">
                     
                            <label
                                className="block mb-2 text-themeDarker"
                                htmlFor="phone_number"
                            >
                                Phone Number
                            </label>
                            <input
                                className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border ${
                                    errors?.phone_number
                                        ? '!border-red-500'
                                        : 'border-gray'
                                } rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                    errors?.phone_number
                                        ? 'focus:ring-red-500'
                                        : 'focus:ring-themePrimary'
                                } focus:ring-opacity-50`}
                                type="tel"
                                {...register('phone_number', {
                                    required: true,
                                    pattern: /^\d{10}$/ // Adjust the pattern for your phone number format
                                })}
                                placeholder="Enter Your Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {errors?.phone_number && (
                                <span className="text-red-600 text-xss italic">
                                    Please enter a valid phone number
                                </span>
                            )}
                        </div>
                        {!otpSent ? (
                            <button
                                type="button"
                                onClick={sendOtpHandler}
                                className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                            >
                                Send OTP
                            </button>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-themeDarker"
                                        htmlFor="otp"
                                    >
                                        OTP
                                    </label>
                                    <input
                                        className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border ${
                                            errors?.otp
                                                ? '!border-red-500'
                                                : 'border-gray'
                                        } rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                            errors?.otp
                                                ? 'focus:ring-red-500'
                                                : 'focus:ring-themePrimary'
                                        } focus:ring-opacity-50`}
                                        type="text"
                                        {...register('otp', {
                                            required: true,
                                            pattern: /^\d{4}$/ // Adjust the pattern for your OTP format
                                        })}
                                        placeholder="Enter OTP"
                                    />
                                    {errors?.otp && (
                                        <span className="text-red-600 text-xss italic">
                                            Please enter a valid OTP
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => verifyOtpHandler(watch('otp'))}
                                    className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}
           
                       
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={previousHandler}
                                className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                            >
                                {loading ? 'Please wait...' : 'Sign Up'}
                            </button>
                        </div>
                    </>
                )}

               
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
