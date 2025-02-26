import NotFoundImage from '../../assets/rb_5529.png';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-500 text-white">
      <div className="text-center">
        <img 
          src={NotFoundImage}
          alt="Not Found" 
          className="w-1/4 mx-auto"
        />
        <p className="mt-2 text-2xl">This page could not be found.</p>
        <p className="mt-4">Maybe you've taken a wrong turn? Don't worry... <br /> it happens to the best of us.</p>
      </div>
    </div>
  );
}

export default NotFound;
