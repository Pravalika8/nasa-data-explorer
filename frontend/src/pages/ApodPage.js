import { useContext, useEffect, useState } from 'react';
import nasaService from '../services/nasaService';
import ApodCard from '../components/apod/ApodCard';
import Loader from '../components/common/Loader';
import { setApodResults } from '../redux/apodSlice';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import SearchComponent from '../components/SearchComponent';
import NoData from '../components/common/NoData';
import { AlertContext } from '../contexts/context';
import { AlertType, InputTypes } from '../constants/InputConstant';
import handleResponse from '../helpers/responseHelper';


export default function ApodPage() {
  const [apodData, setApodData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ startDate: new Date(), endDate: new Date() });
  const { setMessage, setType } = useContext(AlertContext);
  const [loaderTitle, setLoaderTitle] = useState();
  const dispatch = useDispatch();
  const fetchApods = async () => {
    try {
      setLoading(true);
      setError(undefined);
      const startDate = dayjs(selectedDates.startDate).format('YYYY-MM-DD');
      const endDate = dayjs(selectedDates.endDate).format('YYYY-MM-DD');
      console.log('start: ', startDate, ' end: ', endDate)
      setLoaderTitle(`Loading data between ${startDate} - ${endDate}`)
      const response = await nasaService.getApod({ startDate, endDate });
      handleResponse(response, setMessage, setType, (data) => {
        setApodData(Array.isArray(data) ? data : [data]);
        dispatch(setApodResults(data));
      });
    } catch (err) {
      setMessage('Unable to load data');
      setType(AlertType.ERROR);
      setApodData([]);
    } finally {
      setLoading(false);
      setLoaderTitle('')
    }
  };

  useEffect(() => {
    console.log('use effect fetching')
    fetchApods();
  }, [])

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl text-white font-semibold mb-4">Astronomy Picture of the Day (APOD)</h2>
      <p className="text-sm text-gray-300 text-start mb-6 mx-auto">
        The APOD is a daily NASA project showcasing breathtaking images or videos of our universe,
        often accompanied by a detailed scientific explanation by professional astronomers.
        Use the search options below to explore space imagery by date or range, and save your favorites!
      </p>
      <SearchComponent type={InputTypes.DATE_RANGE} onClickHandler={fetchApods} input={selectedDates} setInput={setSelectedDates} />
      {loading ? <Loader text={loaderTitle} /> :
        apodData && apodData.length > 0 ?
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {apodData.map((item, idx) => (
              <ApodCard key={idx} data={item} />
            ))}</div> : <NoData message={error} />}
    </div>
  );
}
