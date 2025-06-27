
const Loader = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center py-10 w-full text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 mb-3"></div>
      {text && (
        <p className="text-gray-400 text-sm mt-2">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
