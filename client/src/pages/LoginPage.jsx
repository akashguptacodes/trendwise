import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginButton from '../components/auth/LoginButton';
import useAuth from '../hooks/useAuth';

function LoginPage() {
  const { user, login, logout } = useAuth();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg p-6 rounded-lg text-center w-full max-w-sm">
          {user ? (
            <>
              <p className="mb-4">Welcome, {user.name}</p>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Login to Comment</h2>
              <LoginButton onLogin={login} />
            </>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
