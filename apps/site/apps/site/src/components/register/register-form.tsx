// Import statements...
import styles from '../RegisterForm.module.css'; 
// Import statements...
import RegisterForm from './form'; // Adjust the path based on your project structure
import AutoScrollSectio from './AutoScrollSection';

  const RegisterPage = () => {
    return (
      <div className={styles.registerPage}>
        <div className={styles.autoScrollContainer}>
          <AutoScrollSectio />
        </div>
  
        {/* Registration Form Section */}
       
        <div className={styles.registrationSection}>
          <RegisterForm />
        </div>
      </div>
    );
  };
  
  export default RegisterPage;
  