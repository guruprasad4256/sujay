import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import '../RegisterForm.module.css'; 
import { Axios } from '../utils/axiosKits';
import { useDropzone } from 'react-dropzone';

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

// ... (existing code)
// ... (existing code)

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
        setValue(fieldName, file);
    }
};

// ... (existing code)
const isImage = (file: File | undefined) => {
    return file?.type?.startsWith('image/') ?? false;
  };
  

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
        <h3 className="text-lg font-semibold mb-4">Portfolio</h3>

        <div className="flex gap-4">
            {/* Container 1 */}
            <div className="flex flex-col items-center">
                <label htmlFor="file1" className="cursor-pointer">
                    {watch('file1') ? (
                        <>
                            {isImage(watch('file1')) ? (
                                <img
                                    src={URL.createObjectURL(watch('file1'))}
                                    alt="Container 1 Preview"
                                    className="w-32 h-32 cursor-pointer"
                                />
                            ) : (
                                watch('file1').type === 'application/pdf' ? (
                                    <iframe
                                        src={URL.createObjectURL(watch('file1'))}
                                        title="PDF Preview"
                                        className="border rounded p-2 w-32 h-32 cursor-pointer"
                                    />
                                ) : (
                                    <div className="border rounded p-2 w-32 h-32 cursor-pointer">
                                        Click to Upload
                                    </div>
                                )
                            )}
                        </>
                    ) : (
                        <div className="border rounded p-2 w-32 h-32 cursor-pointer">
                            Click to Upload
                        </div>
                    )}
                </label>
                <input
                    id="file1"
                    type="file"
                    {...register('file1')}
                    onChange={(e) => handleFileChange(e, 'file1')}
                    className="hidden"
                />
            </div>

            {/* Container 2 */}
            <div className="flex flex-col items-center">
                <label htmlFor="file2" className="cursor-pointer">
                    {watch('file2') ? (
                        <>
                            {isImage(watch('file2')) ? (
                                <img
                                    src={URL.createObjectURL(watch('file2'))}
                                    alt="Container 2 Preview"
                                    className="w-32 h-32 cursor-pointer"
                                />
                            ) : (
                                watch('file2').type === 'application/pdf' ? (
                                    <iframe
                                        src={URL.createObjectURL(watch('file2'))}
                                        title="PDF Preview"
                                        className="border rounded p-2 w-32 h-32 cursor-pointer"
                                    />
                                ) : (
                                    <div className="border rounded p-2 w-32 h-32 cursor-pointer">
                                        Click to Upload
                                    </div>
                                )
                            )}
                        </>
                    ) : (
                        <div className="border rounded p-2 w-32 h-32 cursor-pointer">
                            Click to Upload
                        </div>
                    )}
                </label>
                <input
                    id="file2"
                    type="file"
                    {...register('file2')}
                    onChange={(e) => handleFileChange(e, 'file2')}
                    className="hidden"
                />
            </div>

            {/* Container 3 */}
            <div className="flex flex-col items-center">
                <label htmlFor="file3" className="cursor-pointer">
                    {watch('file3') ? (
                        <>
                            {isImage(watch('file3')) ? (
                                <img
                                    src={URL.createObjectURL(watch('file3'))}
                                    alt="Container 3 Preview"
                                    className="w-32 h-32 cursor-pointer"
                                />
                            ) : (
                                watch('file3').type === 'application/pdf' ? (
                                    <iframe
                                        src={URL.createObjectURL(watch('file3'))}
                                        title="PDF Preview"
                                        className="border rounded p-2 w-32 h-32 cursor-pointer"
                                    />
                                ) : (
                                    <div className="border rounded p-2 w-32 h-32 cursor-pointer">
                                        Click to Upload
                                    </div>
                                )
                            )}
                        </>
                    ) : (
                        <div className="border rounded p-2 w-32 h-32 cursor-pointer">
                            Click to Upload
                        </div>
                    )}
                </label>
                <input
                    id="file3"
                    type="file"
                    {...register('file3')}
                    onChange={(e) => handleFileChange(e, 'file3')}
                    className="hidden"
                />
            </div>
            
        </div>
    </div>
    
)}


{CurrentPage === 4 && (
    <div className="mb-6">
      
        <div className="mb-6">
            <label className="block mb-2 text-themeDarker">Portfolio Link</label>
            <input
                className={`appearance-none block w-full !p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50`}
                type="url"
                {...register('portfolioLink')}
                placeholder="Enter Your Portfolio Link (Optional)"
            />
        </div>

        {/* Back and Next Step Buttons */}
        <div className="flex gap-4">
            <button
                onClick={() => setCurrentPage(3)}
                className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
            >
                Back
            </button>
            <button
                onClick={() => setCurrentPage(5)}
                className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
            >
                Next Step
            </button>
        </div>
    </div>
)}
{CurrentPage === 5 && (
    <div className="mb-6">
       

        {/* Are You Currently Employed? */}
        <div className="mb-4 flex items-center">
            <label className="block mb-2 text-themeDarker mr-2">
                Employed?
            </label>
            <div className="flex items-center">
                <input
                    type="radio"
                    id="employedYes"
                    value="Yes"
                    {...register('currentlyEmployed')}
                    className="hidden"
                />
                <label
                    htmlFor="employedYes"
                    className="mr-2 bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-2.5 py-1.5 text-center cursor-pointer rounded text-xs"
                >
                    Yes
                </label>
                <input
                    type="radio"
                    id="employedNo"
                    value="No"
                    {...register('currentlyEmployed')}
                    className="hidden"
                />
                <label
                    htmlFor="employedNo"
                    className="bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-2.5 py-1.5 text-center cursor-pointer rounded text-xs"
                >
                    No
                </label>
            </div>
        </div>

        {/* Additional Fields if Employed */}
        {watch('currentlyEmployed') === 'Yes' && (
            <>
                {/* Total Work Experience */}
                <div className="mb-4 flex items-center space-x-4">
    <label className="block mb-2 text-themeDarker mr-2 text-sm">
        Exp.
    </label>
    <div className="flex items-center space-x-2">
        {/* Choose Year */}
        <div className="mr-2">
            <label htmlFor="totalExperienceYear" className="block text-themeDarker text-xs">
                Yr
            </label>
            <input
                id="totalExperienceYear"
                type="number"
                {...register('totalExperienceYear')}
                className="appearance-none w-10 p-2 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50 text-xs"
                placeholder="Yr"
            />
        </div>
        {/* Choose Month */}
        <div>
            <label htmlFor="totalExperienceMonth" className="block text-themeDarker text-xs">
                Mo
            </label>
            <input
                id="totalExperienceMonth"
                type="number"
                {...register('totalExperienceMonth')}
                className="appearance-none w-10 p-2 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50 text-xs"
                placeholder="Mo"
            />
        </div>
    </div>
    <div className="mb-6">
        <label className="block mb-2 text-themeDarker text-sm">
            State and Location
        </label>
        <div className="flex gap-2">
            <div className="w-1/2">
                <select
                    className={`appearance-none block w-full p-2 leading-5 text-coolGray-900 border ${
                        errors?.state
                            ? '!border-red-500'
                            : 'border-gray'
                    } rounded-lg focus:outline-none focus:ring-2 ${
                        errors?.state
                            ? 'ring-red-500'
                            : 'focus:ring-themePrimary focus:ring-opacity-50'
                    } text-xs`}
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
                    className={`appearance-none block w-full p-2 leading-5 text-coolGray-900 border ${
                        errors?.location
                            ? '!border-red-500'
                            : 'border-gray'
                    } rounded-lg focus:outline-none focus:ring-2 ${
                        errors?.location
                            ? 'ring-red-500'
                            : 'focus:ring-themePrimary focus:ring-opacity-50'
                    } text-xs`}
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
</div>


                {/* Job Title and Department */}
                <div className="flex gap-2 mb-4">
                    {/* Job Title */}
                    <div>
                        <label className="block mb-2 text-themeDarker text-xs">
                            Title
                        </label>
                        <input
                            type="text"
                            {...register('jobTitle')}
                            className={`appearance-none w-28 p-2 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                errors?.jobTitle
                                    ? '!border-red-500'
                                    : 'border-gray'
                            } focus:ring-themePrimary focus:ring-opacity-50 text-xs`}
                            placeholder="Title"
                        />
                        {errors?.jobTitle && (
                            <span className="text-red-600 text-xss italic">
                                Required
                            </span>
                        )}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block mb-2 text-themeDarker text-xs">
                            Dept.
                        </label>
                        <input
                            type="text"
                            {...register('department')}
                            className={`appearance-none w-28 p-2 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                errors?.department
                                    ? '!border-red-500'
                                    : 'border-gray'
                            } focus:ring-themePrimary focus:ring-opacity-50 text-xs`}
                            placeholder="Dept."
                        />
                      
                    </div>
                </div>

                {/* Industry Type Dropdown, Date of Joining, and CTC/Stipend */}
                <div className="flex gap-2 mb-4">
                    {/* Industry Type */}
                   {/* Industry Type Dropdown */}
<div className="mb-6">
    <label className="block mb-2 text-themeDarker">
        Industry Type
    </label>
    <select
        {...register('industryType')}
        className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
    >
        <option value="Type 1">Type 1</option>
        <option value="Type 2">Type 2</option>
        <option value="Type 3">Type 3</option>
        <option value="Type 4">Type 4</option>
        <option value="Type 5">Type 5</option>
        <option value="Type 6">Type 6</option>
        <option value="Type 7">Type 7</option>
        <option value="Type 8">Type 8</option>
        <option value="Type 9">Type 9</option>
        <option value="Type 10">Type 10</option>
        <option value="Custom">Custom</option>
    </select>
</div>

{/* Additional Input for Custom Industry Type */}
{watch('industryType') === 'Custom' && (
    <div className="mb-6">
        <label className="block mb-2 text-themeDarker">
            Custom Industry Type
        </label>
        <input
            type="text"
            {...register('customIndustryType')}
            className={`appearance-none block w-full p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                errors?.customIndustryType
                    ? '!border-red-500'
                    : 'border-gray'
            } focus:ring-themePrimary focus:ring-opacity-50`}
            placeholder="Enter Custom Industry Type"
        />
        {errors?.customIndustryType && (
            <span className="text-red-600 text-xss italic">
                Custom Industry Type is required
            </span>
        )}
    </div>
)}


                    {/* Date of Joining */}
                    <div>
                        <label className="block mb-2 text-themeDarker text-xs">
                            Joining
                        </label>
                        <input
                            type="date"
                            {...register('dateOfJoining')}
                            className={`appearance-none w-32 p-2 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                errors?.dateOfJoining
                                    ? '!border-red-500'
                                    : 'border-gray'
                            } focus:ring-themePrimary focus:ring-opacity-50 text-xs`}
                        />
                        {errors?.dateOfJoining && (
                            <span className="text-red-600 text-xss italic">
                                Required
                            </span>
                        )}
                    </div>

                    {/* CTC/Stipend */}
                    <div>
                        <label className="block mb-2 text-themeDarker text-xs">
                            CTC
                        </label>
                        <input
                            type="text"
                            {...register('ctcStipend')}
                            className={`appearance-none w-32 p-2 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                                errors?.ctcStipend
                                    ? '!border-red-500'
                                    : 'border-gray'
                            } focus:ring-themePrimary focus:ring-opacity-50 text-xs`}
                            placeholder="CTC"
                        />
                        {errors?.ctcStipend && (
                            <span className="text-red-600 text-xss italic">
                                Required
                            </span>
                        )}
                    </div>
                </div>

                {/* Reason For Change */}
                <div className="mb-4">
                    <label className="block mb-2 text-themeDarker text-xs">
                        Reason
                    </label>
                    <textarea
                        {...register('reasonForChange')}
                        className={`resize-none appearance-none w-full p-2 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                            errors?.reasonForChange
                                ? '!border-red-500'
                                : 'border-gray'
                        } focus:ring-themePrimary focus:ring-opacity-50 text-xs`}
                        placeholder="Reason"
                    />
                    {errors?.reasonForChange && (
                        <span className="text-red-600 text-xss italic">
                            Required
                        </span>
                    )}
                </div>
            </>
        )}

{/* Have you worked Before? */}
{watch('currentlyEmployed') === 'No' && (
    <div className="mb-6 flex items-center">
        <label className="block mb-2 text-themeDarker mr-4">
            Have you worked before?
        </label>

        <input
            type="radio"
            id="workedBeforeYes"
            value="Yes"
            {...register('workedBefore')}
            className="hidden"
        />
        <label
            htmlFor="workedBeforeYes"
            className="mr-2 bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded"
        >
            Yes
        </label>

        <input
            type="radio"
            id="workedBeforeNo"
            value="No"
            {...register('workedBefore')}
            className="hidden"
        />
        <label
            htmlFor="workedBeforeNo"
            className="bg-themePrimary/20 text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded"
        >
            No
        </label>
    </div>
)}

{/* Additional Fields if Worked Before */}
{watch('workedBefore') === 'Yes' && (
    <div className="mb-6 flex items-center flex-wrap">
        {/* Section 0: Prev Department and Prev Job Title */}
        <div className="flex items-center space-x-4">
            {/* Prev Department */}
            <div className="flex items-center space-x-4">
                <label htmlFor="prevDepartment" className="block mb-2 text-themeDarker">
                    Prev Department
                </label>
                <input
                    id="prevDepartment"
                    type="text"
                    {...register('prevDepartment')}
                    className="appearance-none block w-40 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                    placeholder="Enter Prev Department"
                />
            </div>

            {/* Prev Job Title */}
            <div className="flex items-center space-x-4">
                <label htmlFor="prevJobTitle" className="block mb-2 text-themeDarker">
                    Prev Job Title
                </label>
                <input
                    id="prevJobTitle"
                    type="text"
                    {...register('prevJobTitle')}
                    className="appearance-none block w-40 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                    placeholder="Enter Prev Job Title"
                />
            </div>
        </div>

        {/* Section 1: Total Work Experience */}
        <div className="flex items-center space-x-4 mt-4">
            <label className="block mb-2 text-themeDarker">
                Total Work Experience
            </label>
            {/* Choose Year */}
            <div className="mr-4">
                <label htmlFor="totalExperienceYear" className="block text-themeDarker">
                    Years
                </label>
                <input
                    id="totalExperienceYear"
                    type="number"
                    {...register('totalExperienceYear')}
                    className="appearance-none block w-20 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                    placeholder="Years"
                />
            </div>
            {/* Choose Month */}
            <div>
                <label htmlFor="totalExperienceMonth" className="block text-themeDarker">
                    Months
                </label>
                <input
                    id="totalExperienceMonth"
                    type="number"
                    {...register('totalExperienceMonth')}
                    className="appearance-none block w-20 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                    placeholder="Months"
                />
            </div>
        </div>

        {/* Section 2: Previous Job Type and Previous Company Name */}
        <div className="flex items-center space-x-4 mt-4">
            {/* Previous Job Type */}
            <div className="flex items-center space-x-4">
                <label htmlFor="previousJobType" className="block mb-2 text-themeDarker">
                    Previous Job Type
                </label>
                <select
                    id="previousJobType"
                    {...register('previousJobType')}
                    className="appearance-none block w-28 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Freelancer">Freelancer</option>
                </select>
            </div>

            {/* Previous Company Name */}
            <div className="flex items-center space-x-4">
                <label htmlFor="previousCompanyName" className="block mb-2 text-themeDarker">
                    Previous Company Name
                </label>
                <input
                    id="previousCompanyName"
                    type="text"
                    {...register('previousCompanyName')}
                    className="appearance-none block w-40 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                    placeholder="Enter Company Name"
                />
            </div>
        </div>

        {/* Section 3: Industry Type */}
        <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="industryType" className="block mb-2 text-themeDarker">
                Industry Type
            </label>
            <select
                id="industryType"
                {...register('industryType')}
                className="appearance-none block w-28 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
            >
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="Type 3">Type 3</option>
                <option value="Type 4">Type 4</option>
                <option value="Custom">Custom</option>
            </select>

            {/* LDCTC */}
            <div className="flex items-center space-x-4">
                <label htmlFor="ldctc" className="block mb-2 text-themeDarker">
                    LDCTC
                </label>
                <input
                    id="ldctc"
                    type="text"
                    {...register('ldctc')}
                    className="appearance-none block w-20 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                    placeholder="Enter LDCTC"
                />
            </div>

            {/* Custom Industry Type */}
            {watch('industryType') === 'Custom' && (
                <div className="flex items-center space-x-4">
                    <label htmlFor="customIndustryType" className="block mb-2 text-themeDarker">
                        Custom Industry Type
                    </label>
                    <input
                        id="customIndustryType"
                        type="text"
                        {...register('customIndustryType')}
                        className="appearance-none block w-40 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                        placeholder="Enter Custom Industry Type"
                    />
                </div>
            )}
        </div>
        <div className="flex gap-6 mt-4">
            <div className="w-1/2">
                <label htmlFor="state" className={`block mb-2 text-themeDarker ${errors?.state ? 'text-red-600' : ''}`}>
                    State
                </label>
                <select
                    id="state"
                    {...register('state', { required: true })}
                    className={`appearance-none block w-full p-3 leading-5 text-coolGray-900 border ${errors?.state ? 'border-red-500' : 'border-gray'} rounded-lg focus:outline-none focus:ring-2 ${errors?.state ? 'ring-red-500' : 'focus:ring-themePrimary focus:ring-opacity-50'}`}
                    onChange={(e) => setSelectedState(e.target.value)}
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
                <label htmlFor="location" className={`block mb-2 text-themeDarker ${errors?.location ? 'text-red-600' : ''}`}>
                    Location
                </label>
                <select
                    id="location"
                    {...register('location', { required: true })}
                    className={`appearance-none block w-full p-3 leading-5 text-coolGray-900 border ${errors?.location ? 'border-red-500' : 'border-gray'} rounded-lg focus:outline-none focus:ring-2 ${errors?.location ? 'ring-red-500' : 'focus:ring-themePrimary focus:ring-opacity-50'}`}
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
        {/* Section 4: Reason For Change */}
        <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="reasonForChange" className="block mb-2 text-themeDarker">
                Reason For Change
            </label>
            <textarea
                id="reasonForChange"
                {...register('reasonForChange')}
                className="resize-none appearance-none block w-40 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-themePrimary focus:ring-opacity-50"
                placeholder="Enter Reason For Change"
            />
        </div>

        {/* Section 5: State and Location */}
       
    </div>
)}


{/* Section 6: Relevant Experience (if 'No' is selected for 'Have you worked before?') */}
{watch('workedBefore') === 'No' && (
    <div className="mb-6 flex items-center">
        <label className="block mb-2 text-themeDarker mr-4">
            Do you have any Relevant experience?
        </label>

        <input
            type="text"
            id="relevantExperience"
            {...register('relevantExperience')}
            className={`appearance-none block w-64 p-3 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
                errors?.relevantExperience
                    ? '!border-red-500'
                    : 'border-gray'
            } focus:ring-themePrimary focus:ring-opacity-50`}
            placeholder="Enter Relevant experience"
        />
        {errors?.relevantExperience && (
            <span className="text-red-600 text-xss italic">
                Relevant experience is required
            </span>
        )}
    </div>
)}

   {/* Back and Next Step Buttons */}
   <div className="flex gap-2">
            <button
                onClick={() => setCurrentPage(4)}
                className="inline-block !py-2 px-4 mb-4 w-full duration-300 ease-in-out text-xs text-white font-normal text-center leading-5 bg-themePrimary rounded-md hover:bg-black"
            >
                Back
            </button>
            <button
                onClick={() => setCurrentPage(6)}
                className="inline-block !py-2 px-4 mb-4 w-full duration-300 ease-in-out text-xs text-white font-normal text-center leading-5 bg-themePrimary rounded-md hover:bg-black"
            >
                Next Step
            </button>
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
