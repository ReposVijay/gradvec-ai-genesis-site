
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Redirect to the main HTML page
    window.location.href = '/';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting to Grad Vec AI...</h1>
        <p className="text-xl text-gray-600">Please wait while we load the website.</p>
      </div>
    </div>
  );
};

export default Index;
