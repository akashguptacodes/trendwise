import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

function LoginButton({ onLogin }) {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    // Send to backend if needed
    onLogin(decoded); // Pass user info to parent
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}

export default LoginButton;