import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const SimpleForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);
    // You can perform further actions with the form data here
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Simple Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'This field is required' })}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'This field is required' })}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'This field is required' })}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Submitted Data:</h2>
          <p><strong>First Name:</strong> {submittedData.firstName}</p>
          <p><strong>Last Name:</strong> {submittedData.lastName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleForm;
