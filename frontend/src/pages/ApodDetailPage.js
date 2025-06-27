import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import nasaService from '../services/nasaService';
import Loader from '../components/common/Loader';
import { useSelector } from 'react-redux';
import { AlertContext } from '../contexts/context';
import handleResponse from '../helpers/responseHelper';

export default function ApodDetailPage() {
  const { date } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setMessage, setType } = useContext(AlertContext);
  const dataFromRedux = useSelector((state) => state.apod?.results[date])

  useEffect(() => {
    loadApodDetails();
  }, [date, dataFromRedux]);

  const loadApodDetails = async () => {
    try {
      console.log('apodDetailPage date:', date);
      setLoading(true);
      if (dataFromRedux) {
        console.log('loading data from redux for date: ', date)
        setData(Array.isArray(dataFromRedux) ? dataFromRedux[0] : dataFromRedux)
        setLoading(false);
      } else {
        const response = await nasaService.getApod({ date });
        console.log('apod detail response from server: ', response);
        handleResponse(response, setMessage, setType, (data) => {
          setData(Array.isArray(data) ? data[0] : data);
        });
      }
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader text="Loading APOD details..." />;

  if (!data) return <p className="text-center text-gray-300">No data found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-400 mb-4">{data.date}</p>

      {data.media_type === 'image' && (
        <img src={data.url} alt={data.title} className="rounded shadow mb-6 w-full hover:animate-pulse" />
      )}
      {data.media_type === 'video' && (
        <iframe
          title={data.title}
          src={data.url}
          className="w-full h-96 rounded shadow mb-6"
          allow="autoplay"
        />
      )}
      <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
    </div>
  );
}
