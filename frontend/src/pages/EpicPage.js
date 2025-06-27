import { useContext, useEffect, useState } from 'react';
import Loader from '../components/common/Loader';
import { AlertType, InputTypes } from '../constants/InputConstant';
import SearchComponent from '../components/SearchComponent';
import dayjs from 'dayjs';
import NoData from '../components/common/NoData';
import nasaService from '../services/nasaService'
import { AlertContext } from '../contexts/context';
import handleResponse from '../helpers/responseHelper';
import { useDispatch, useSelector } from 'react-redux';
import { setEpicResults } from '../redux/epicSlice';

const EpicPage = () => {
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const { setMessage, setType } = useContext(AlertContext);
  const dataFromRedux = useSelector((state) => state.epic?.results)
  const dispatch = useDispatch();
  const fetchImages = async () => {
    setLoading(true);
    try {
      console.log('datafromredux', dataFromRedux);
      const startDate = selectedDate.startDate && dayjs(selectedDate.startDate).format('YYYY-MM-DD');
      if (dataFromRedux && Object.keys(dataFromRedux).length > 0 && dataFromRedux[startDate]) {
        console.log('serving epic from redux');
        setImages(dataFromRedux[startDate]);
        return true;
      } else {
        const response = await nasaService.getEpic(startDate);
        handleResponse(response, setMessage, setType, (data) => {
          setImages(data || []);
          if (data && data.length > 0) {
            const firstImage = data[0];
            const imageDate = dayjs(firstImage.date).format('YYYY-MM-DD');
            dispatch(setEpicResults({ date: imageDate, data: data }));
          }
        });
      }
    } catch (err) {
      setImages([])
      setMessage('Unable to load data');
      setType(AlertType.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);


  return (
    <div className="max-w-6xl mx-auto mt-4 px-4 py-8">
      <h2 className="text-2xl text-white font-semibold mb-4">EPIC Eath Images</h2>
      <p className="text-sm text-gray-300 text-start mx-auto mb-6">
        The EPIC (Earth Polychromatic Imaging Camera) instrument aboard the DSCOVR satellite captures full-disc images of Earth from the L1 point.
        Here you can explore high-resolution images of Earth taken on selected dates.
      </p>

      <SearchComponent type={InputTypes.DATE_RANGE} asSingle={true} onClickHandler={fetchImages} input={selectedDate} setInput={setSelectedDate} />
      {loading ? (
        <Loader />
      ) : images.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {images.map((img) => (
            <EpicCard key={img.identifier} data={img} />
          ))}
        </div>
      ) : (
        <NoData message='no epic images found' />
      )}
    </div>
  );
};


const EpicCard = ({ data }) => {
  const [year, month, day] = data.date.split(' ')[0].split('-');
  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${data.image}.jpg`;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      <img
        src={imageUrl}
        alt={data.caption}
        className="w-full h-fit object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-2">
        <h2 className="text-sm font-semibold">{data.caption}</h2>
        <div className='flex items-center mt-1 justify-between'>
          <span className="text-sm text-gray-400">{data.date} </span>
          <span className="text-sm text-gray-400">  Lat: {data.centroid_coordinates.lat.toFixed(2)}, Lon: {data.centroid_coordinates.lon.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default EpicPage;