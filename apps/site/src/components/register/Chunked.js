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

  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
        setValue(fieldName, file);

        // Upload file to Cloudinary only if it hasn't been uploaded before
        if (!uploadedFiles[fieldName]) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, formData);

                // Update state to mark the file as uploaded
                setUploadedFiles(prevState => ({
                    ...prevState,
                    [fieldName]: response.data.secure_url // Store the Cloudinary URL
                }));

                console.log('Cloudinary response:', response.data);
            } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
            }
        }
    }
};


  
const onSubmitHandler = async (data) => {
  setLoading(true);
  try {
      const formDataToSend = {
          ...data,
          // Include the Cloudinary URLs for uploaded files
          file1: uploadedFiles['file1'],
          file2: uploadedFiles['file2'],
          file3: uploadedFiles['file3'],
          isConfirmed: false,
          role: {
              isCandidate: data.freelancer_role === 'candidate',
              isEmployer: data.freelancer_role === 'employer',
              isAdmin: data.freelancer_role === 'admin',
          },
      };

      const response = await axios.post('/users/signup', formDataToSend);
      setLoading(false);
      if (response.status === 200 || response.status === 201) {
          addToast(response.data.message, {
              appearance: 'success',
              autoDismiss: true,
          });
          Router.push('/login');
          setTimeout(() => {
              setCurrentPage(1);
              reset();
          }, 3000);
      }
  } catch (error) {
      setLoading(false);
      addToast(error.response.data.message, {
          appearance: 'error',
          autoDismiss: true,
      });
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
