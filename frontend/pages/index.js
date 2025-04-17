import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">RBAC App Home</h1>
      
      {/* Button to go to Register page */}
      <button
        onClick={handleRegisterClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go to Register
      </button>
      
      {/* Button to go to Login page */}
      <button
        onClick={handleLoginClick}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Go to Login
      </button>
    </div>
  );
}
