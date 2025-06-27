import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { MediaTypes } from '../../constants/InputConstant';
import Loader from '../common/Loader';

export default function MediaCard({ data, img, collectionUrl }) {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (inView && collectionUrl && !mediaUrl && data.media_type !== MediaTypes.IMAGE) {
      setLoading(true);
      axios.get(collectionUrl).then((res) => {
        const files = res.data;
        if (Array.isArray(files)) {
          setMediaUrl(files[0]);
        }
      });
      setLoading(false);
    }
  }, [inView, collectionUrl, mediaUrl]);

  const renderMedia = () => {
    if (data.media_type === MediaTypes.VIDEO) {
      return (
        <React.Fragment>
          {loading ? <Loader /> :
            <video
              src={mediaUrl || img}
              controls
              title={data.title}
              className="w-full h-52 object-cover rounded-t-md"
            />}
        </React.Fragment>
      );
    }
    return (
      <img src={img || mediaUrl} alt={data.title} className="w-full h-52 object-cover rounded-t-md" />
    );
  };
  return (
    <div
      ref={ref}
      className="rounded-lg bg-gray-900 overflow-hidden hover:bg-gray-700 hover:-translate-y-3 shadow-md hover:shadow-gray-800 transition duration-300 group">
      {renderMedia()}
      <div className="p-4 flex flex-col justify-end">
        <h3 className="text-white text-lg font-semibold mb-1">{data.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-2">{data.description?.slice(0, 100)}...</p>
        <p className="text-gray-400 text-xs mt-1">{new Date(data.date_created).toDateString()}</p>
      </div>
    </div>
  );
}
