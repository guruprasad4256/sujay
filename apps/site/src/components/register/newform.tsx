// RegisterForm.tsx

import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { Axios } from '../utils/axiosKits';
import RegistrationPopup from './RegistrationPopup'; // Import the new component

const RegisterForm: React.FC = () => {
  // ... (existing state and functions)

  const [showPopup, setShowPopup] = useState(false);

  // ... (existing code)

  const onSubmitHandler = async (data: any) => {
    if (CurrentPage === 1) {
      // If on the first page, open the popup
      setShowPopup(true);
    } else if (CurrentPage === 2) {
      // ... (existing code for page 2)
    } else if (CurrentPage === 3) {
      // ... (existing code for page 3)
    }
  };

  // ... (existing code)

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
        {/* ... (existing code) */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
          >
            {loading ? 'Please wait...' : 'Next Step'}
          </button>
        </div>
      </form>
      {/* Show the popup component if the state is true */}
      {showPopup && (
        <RegistrationPopup onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default RegisterForm;
