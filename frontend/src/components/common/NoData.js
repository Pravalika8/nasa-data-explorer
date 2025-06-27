
export default function NoData({ message = 'No data found!' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
      {/* <FaRegSadTear size={64} className="mb-4 text-blue-400 animate-bounce" /> */}
      <p className="text-xl font-medium">{message}</p>
    </div>
  );
}
