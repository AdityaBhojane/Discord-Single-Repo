import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex h-screen text-white bg-hero-login bg-cover bg-no-repeat">
      <div className="w-full max-w-2xl mx-auto my-auto bg-[#36393F] rounded-md shadow-lg p-8">
      {children}
      </div>
    </div>
  );
};

export default Auth;
