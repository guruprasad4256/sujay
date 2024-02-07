import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  state: string;
  location: string;
  phone_number: string;
  designType: string;
  selectedTools: string;
  selectedSkills: string;
  certificationName: string;
  institutionName: string;
  portfolioLink: string;
  confirm_password: string;
  password: string;
}

const CLOUD_NAME = "dpgc90lr3";
const UPLOAD_PRESET = "b7qldb5l";

const PortfolioSection: React.FC = () => {
  const { watch, register, setValue } = useForm<FormData>();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | undefined>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const isImage = (file: File): boolean => {
    return file && file.type && file.type.startsWith('image/');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setValue(fieldName, file);

      if (!uploadedFiles[fieldName]) {
        setUploadedFiles(prevState => ({
          ...prevState,
          [fieldName]: file
        }));
      } else {
        console.log(`${fieldName} has already been uploaded.`);
      }
    }
  };

  const onSubmitHandler = async (data: FormData) => {
    setLoading(true);
    try {
      // Upload files to Cloudinary and get their URLs
      const fileUrls: Record<string, string> = {};
      for (const fieldName of Object.keys(uploadedFiles)) {
        const file = uploadedFiles[fieldName];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', UPLOAD_PRESET);
          const response: AxiosResponse<any> = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, formData);
          fileUrls[fieldName] = response.data.secure_url; // Use secure_url for HTTPS URL
        }
      }

      // Send user data including the file URLs to MongoDB
      const userResponse = await axios.post('/users/signup', {
        ...data,
        isConfirmed: false,
        role: {
          isCandidate: data.freelancer_role === 'candidate',
          isEmployer: data.freelancer_role === 'employer',
          isAdmin: data.freelancer_role === 'admin',
        },
        // Include the file URLs in user data
        ...fileUrls,
      });

      setLoading(false);
      if (userResponse.status === 200 || userResponse.status === 201) {
        toast.success(userResponse.data.message);
        setTimeout(() => {
          // Reset form and navigate to login page
        }, 3000);
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response ? error.response.data.message : 'An error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mb-6">
      <ToastContainer />
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
          {/* Include similar code for Container 2 as in Container 1 */}
        </div>

        {/* Container 3 */}
        <div className="flex flex-col items-center">
          {/* Include similar code for Container 3 as in Container 1 */}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
