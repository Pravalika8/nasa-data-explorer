import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/apodSlice';

const ApodCard = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const favorites = useSelector((state) => state?.apod?.favorites);
  const isFavorite = Boolean(favorites && favorites[data.date]);
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate(`/apod/${data.date}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite({ date: data.date, data }));
  };

  return (
    <>
      <div
        key={data.date}
        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl group  transform transition-transform duration-300 "
        onClick={handleClick}
      >
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 z-10 text-red-900 text-xl hover:scale-120 transition-transform duration-300"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        {!loaded && data.media_type === 'image' && <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded"></div>}
        {data.media_type === "image" && (
          <img
            src={data.url}
            alt={data.title}
            onLoad={e => setLoaded(true)}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {data.media_type === 'video' && (
          <iframe
            title={data.title}
            src={data.url}
            className="w-full h-full"
            allow="autoplay"
          />
        )}

        {/* Overlay Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-white text-lg font-semibold mb-1">{data.title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">{data.explanation?.slice(0, 100)}...</p>
          <p className="text-gray-400 text-xs mt-1">{new Date(data.date).toDateString()}</p>
        </div>
      </div>


      {/* 
    <div
      onClick={handleClick}
      className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col h-full 
              transform transition-transform duration-300 
             " >
      <div className="relative h-60 mb-2 rounded overflow-hidden bg-gray-700">
        <button
    onClick={handleFavorite}
    className="absolute top-2 right-2 z-10 text-red-500 text-xl hover:scale-110 transition-transform duration-200"
    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
  >
    {isFavorite ? <FaHeart /> : <FaRegHeart />}
  </button>
        {!loaded && data.media_type === 'image' && <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded"></div>}
        {data.media_type === 'image' && (
          <img
        src={data.url}
        onLoad={e => setLoaded(true)}
        alt={data.title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
        )}
        {data.media_type === 'video' && (
          <iframe
            title={data.title}
            src={data.url}
            className="w-full h-full"
            allow="autoplay"
          />
        )}
      </div>
      <h3 className="text-lg font-semibold">{data.title}</h3>
      
      <p className="text-gray-400 text-sm">{data.date}</p>
      <p className="text-sm text-gray-300 mt-2">
        {data.explanation?.slice(0, 100)}...
      </p>
    </div> */}
    </>
  );
};

export default ApodCard;
