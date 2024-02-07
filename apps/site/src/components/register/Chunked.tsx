import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

const CLOUD_NAME = "dpgc90lr3";
const UPLOAD_PRESET = "b7qldb5l";

const PortfolioSection = () => {
  const { watch, register, setValue } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState({});

  const isImage = (file) => {
    return file && file.type && file.type.startsWith('image/');
  };

  const onSubmitHandler = async (data: any) => {
    if (CurrentPage === 1) {
        setCurrentPage(2);
    }
    if (CurrentPage === 6) {
        setLoading(true);

        if (data.password !== data.confirm_password) {
            addToast('Password and Confirm Password do not match', {
                appearance: 'error',
                autoDismiss: true,
            });
            setLoading(false);
        } else {
            try {
                // Upload files to Cloudinary and get their URLs
                const fileUrls = {};
                for (const fieldName of Object.keys(uploadedFiles)) {
                    const formData = new FormData();
                    formData.append('file', uploadedFiles[fieldName]);
                    formData.append('upload_preset', UPLOAD_PRESET);
                    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, formData);
                    fileUrls[fieldName] = response.data.secure_url; // Use secure_url for HTTPS URL
                }

                // Send user data including the file URLs to MongoDB
                const userResponse = await axios.post('/users/signup', {
                    fullName: {
                        firstName: data.first_name,
                        lastName: data.last_name,
                    },
                    gender: data.gender,
                    email: data.email,
                    state: data.state,
                    location: data.location,
                    phone_number: data.phone_number,
                    designType: data.designType,
                    selectedTools: data.selectedTools,
                    selectedSkills: data.selectedSkills,
                    certificationName: data.certificationName,
                    institutionName: data.institutionName,
                    portfolioLink: data.portfolioLink,
                    isConfirmed: false,
                    password: data.password,
                    role: {
                        isCandidate: data.freelancer_role === 'candidate',
                        isEmployer: data.freelancer_role === 'employer',
                        isAdmin: data.freelancer_role === 'admin',
                    },
                    // Include the file URLs in user data
                    file1Url: fileUrls['file1'],
                    file2Url: fileUrls['file2'],
                    file3Url: fileUrls['file3'],
                });

                setLoading(false);
                if (userResponse.status === 200 || userResponse.status === 201) {
                    addToast(userResponse.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    Router.push('/login');
                    setTimeout(() => {
                        setCurrentPage(1);
                        reset();
                    }, 3000);
                }
            } catch (error: any) {
                setLoading(false);
                const errorMessage = error.response ? error.response.data.message : 'An error occurred';
                addToast(errorMessage, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
    }
};


  return (
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