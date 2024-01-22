import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import '../RegisterForm.module.css'; 
import { Axios } from '../utils/axiosKits';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';

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
    

// ... (existing code)


// ... (existing code)


const [portfolioFiles, setPortfolioFiles] = React.useState([null, null, null]);

// ... (existing code)

    const [selectedTools, setSelectedTools] = React.useState([]);
    const [selectedSkills, setSelectedSkills] = React.useState([]);
    const designTypeOptions = {
        GD: {
            tools: ['Tool1', 'Tool2', 'Tool3'],
            skills: ['Skill1', 'Skill2', 'Skill3'],
        },
        '3D': {
            tools: ['ToolA', 'ToolB', 'ToolC'],
            skills: ['SkillA', 'SkillB', 'SkillC'],
        },
        Illustrator: {
            tools: ['ToolX', 'ToolY', 'ToolZ'],
            skills: ['SkillX', 'SkillY', 'SkillZ'],
        },
        UI: {
            tools: ['ToolUI1', 'ToolUI2', 'ToolUI3'],
            skills: ['SkillUI1', 'SkillUI2', 'SkillUI3'],
        },
    };
    
    
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


    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,  // Add this line to get access to setValue
        getValues, // Add this line to get access to getValues
        formState: { errors },
    } = useForm();
    const [previewURLs, setPreviewURLs] = React.useState({});

// File change handler
const handleFileChange = async (e, boxNumber) => {
    const file = e.target.files[0];
    if (file) {
        const previewURL = await readFileAsDataURL(file);
        setPreviewURLs((prev) => ({ ...prev, [boxNumber]: previewURL }));
    }
};

// Function to read file as Data URL
const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
};
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
            <div className="mb-6 text-center">
            <h3 className="mb-4 text-2xl text-themeDarker">
                    {CurrentPage === 1
                        ? 'Create an Account'
                        : CurrentPage === 2
                        ? 'Personal Information'
                        : 'Let Us Get To Know You Better'}
                </h3>
            </div>
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
                        {/* ... (remaining code) */}
                     {/* ... (remaining code) */}
                
                     <div className="mb-6">
                            <input
                                type="checkbox"
                                id="agree"
                                {...register('agree', { required: true })}
                                className="mr-2"
                            />
                            <label htmlFor="agree" className="text-xss1">
                                I agree to the{' '}
                                <Link href="/terms">
                                    <a className="text-themePrimary hover:underline">
                                        Terms of Service
                                    </a>
                                </Link>{' '}
                                &{' '}
                                <Link href="/privacy">
                                    <a className="text-themePrimary hover:underline">
                                        Privacy Policy
                                    </a>
                                </Link>
                            </label>
                            {errors?.agree && (
                                <span className="text-red-600 text-xss italic">
                                    You must agree to the Terms of Service and Privacy Policy
                                </span>
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
                    </>
                )}


{CurrentPage === 3 && (
                    
                        <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">
            What Kind of Designing Are You Looking For?
        </h3>
        <div className="flex flex-col gap-2">
            <input
                type="radio"
                id="gd"
                value="GD"
                {...register('designType')}
                className="hidden"
            />
            <label
                htmlFor="gd"
                className={`bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded ${
                    watch('designType') === 'GD' ? 'bg-themePrimary text-white' : ''
                }`}
            >
                GD
            </label>

            <input
                type="radio"
                id="3d"
                value="3D"
                {...register('designType')}
                className="hidden"
            />
            <label
                htmlFor="3d"
                className={`bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded ${
                    watch('designType') === '3D' ? 'bg-themePrimary text-white' : ''
                }`}
            >
                3D
            </label>

            <input
                type="radio"
                id="illustrator"
                value="Illustrator"
                {...register('designType')}
                className="hidden"
            />
            <label
                htmlFor="illustrator"
                className={`bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded ${
                    watch('designType') === 'Illustrator' ? 'bg-themePrimary text-white' : ''
                }`}
            >
                Illustrator
            </label>

            <input
                type="radio"
                id="ui"
                value="UI"
                {...register('designType')}
                className="hidden"
            />
            <label
                htmlFor="ui"
                className={`bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded ${
                    watch('designType') === 'UI' ? 'bg-themePrimary text-white' : ''
                }`}
            >
                UI
            </label>
        </div>
    </div>
                   )}

                  {CurrentPage === 1 && (
                <div className="flex gap-4">
                    <button
                        onClick={() => setCurrentPage(2)}
                        className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                    >
                        Next Step
                    </button>
                </div>
            )}

            {CurrentPage === 2 && (
                <div className="flex gap-4">
                    <button
                        onClick={() => setCurrentPage(3)}
                        className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                    >
                        Next Step
                    </button>
                    <button
                        onClick={previousHandler}
                        className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
                    >
                        Previous
                    </button>
                </div>
            )}

            {CurrentPage === 3 && (
                
               <div className="flex gap-4">
               <button
                   onClick={() => setCurrentPage(4)} // Step 3: Update to navigate to section 4
                   className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
               >
                   Next Step
               </button>
               <button
                   onClick={previousHandler}
                   className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
               >
                   Previous
               </button>
           </div>
      
)}


{CurrentPage === 4 && (
    <div className="mb-6">
        <div className="flex justify-between mb-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Select Tools</h3>
                <div className="flex gap-2">
                    {/* Add a searchable dropdown for tools */}
                    <select
                        {...register('selectedTools')}
                        className="border rounded p-2"
                    >
                        <option value="" disabled hidden>Select Tools</option>
                        {designTypeOptions[watch('designType') as keyof typeof designTypeOptions]?.tools &&
                            designTypeOptions[watch('designType') as keyof typeof designTypeOptions]?.tools.map((tool, index) => (
                                <option key={index} value={tool}>
                                    {tool}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Select Skills</h3>
                <div className="flex gap-2">
                    {/* Add a searchable dropdown for skills */}
                    <select
                        {...register('selectedSkills')}
                        className="border rounded p-2"
                    >
                        <option value="" disabled hidden>Select Skills</option>
                        {designTypeOptions[watch('designType') as keyof typeof designTypeOptions]?.skills &&
                            designTypeOptions[watch('designType') as keyof typeof designTypeOptions]?.skills.map((skill, index) => (
                                <option key={index} value={skill}>
                                    {skill}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>

        <div className="mt-4 flex gap-4">
            <div>
                <label className="block mb-2 text-themeDarker">Or type your own tools:</label>
                <input
                    type="text"
                    {...register('customTools')}
                    className="border rounded p-2"
                    placeholder="Type your tools here"
                />
            </div>

            <div>
                <label className="block mb-2 text-themeDarker">Or type your own skills:</label>
                <input
                    type="text"
                    {...register('customSkills')}
                    className="border rounded p-2"
                    placeholder="Type your skills here"
                />
            </div>
        </div>
    </div>
)}


{CurrentPage === 4 && (
    <div className="mb-6">
        <div className="flex justify-between mb-4">
            <div className="flex gap-4">
                <div>
                    <label className="block mb-2 text-themeDarker">Certification Name:</label>
                    <input
                        type="text"
                        {...register('certificationName')}
                        className="border rounded p-2"
                        placeholder="Enter Certification Name"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-themeDarker">Institution Name (if any):</label>
                    <input
                        type="text"
                        {...register('institutionName')}
                        className="border rounded p-2"
                        placeholder="Enter Institution Name"
                    />
                </div>
            </div>
        </div>

        {/* Add other elements related to Certification section if needed */}
    </div>
)}



{CurrentPage === 4 && (
 <div className="mb-6">
 <div className="mb-4">
     <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
     <p className="text-themeDark text-sm">
         You can upload images and PDFs to showcase your work.
     </p>
 </div>

 <div className="flex gap-4">
     {[1, 2, 3].map((index) => (
         <div key={index} className="relative">
             <label
                 htmlFor={`portfolio-upload-${index}`}
                 className="cursor-pointer block overflow-hidden bg-gray-100 border rounded-md p-4"
             >
                 <span className="block text-center">Click to Upload</span>
             </label>
             <input
                 type="file"
                 id={`portfolio-upload-${index}`}
                 {...register(`portfolioFiles[${index}]`)}
                 className="hidden"
             />
             {/* Display preview if a file is uploaded */}
             {watch(`portfolioFiles[${index}]`) && (
                 <div className="mt-2">
                     {watch(`portfolioFiles[${index}]`).name}
                     {/* Add logic to display preview based on file type (image or PDF) */}
                     {/* For simplicity, you can use an <img> tag for images and a link for PDFs */}
                     {watch(`portfolioFiles[${index}]`).type.includes('image') ? (
                         <img
                             src={URL.createObjectURL(watch(`portfolioFiles[${index}]`))}
                             alt={`Preview ${index}`}
                             className="max-w-full h-auto"
                         />
                     ) : (
                         <a
                             href={URL.createObjectURL(watch(`portfolioFiles[${index}]`))}
                             target="_blank"
                             rel="noopener noreferrer"
                         >
                             Preview PDF
                         </a>
                     )}
                 </div>
             )}
         </div>
     ))}
 </div>
</div>
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
