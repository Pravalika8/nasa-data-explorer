import React, { useContext, useEffect, useState } from 'react';
import NeoDataTable from '../components/neo/NeoDataTable';
import NeoCharts from '../components/neo/NeoCharts';
import TabsComponent from '../components/TabsComponent';
import { FaChartBar, FaInfoCircle } from 'react-icons/fa';
import SearchComponent from '../components/SearchComponent';
import { AlertType, InputTypes } from '../constants/InputConstant';
import nasaService from '../services/nasaService';
import dayjs from 'dayjs';
import Loader from '../components/common/Loader';
import { AlertContext } from '../contexts/context';
import handleResponse from '../helpers/responseHelper';


const tabs = [
  { id: 'data', label: 'data', icon: <FaInfoCircle /> },
  { id: 'charts', label: 'charts', icon: <FaChartBar /> },
]
export default function NeoPage() {
  const [activeTab, setActiveTab] = useState('data');
  const [neoData, setNeoData] = useState([]);
  const [selectedDates, setSelectedDates] = useState({ startDate: new Date(), endDate: new Date() });
  const { setMessage, setType } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  const isDateDiffGreaterThan7 = (startDate, endDate) => {
    const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 7;
  };
  const fetchNeos = async () => {
    try {
      setLoading(true);
      console.log('selected dates: ', selectedDates)
      const startDate = selectedDates.startDate && dayjs(selectedDates.startDate).format('YYYY-MM-DD');
      const endDate = selectedDates.endDate && dayjs(selectedDates.endDate).format('YYYY-MM-DD');
      if (!startDate || !endDate) {
        setMessage('StartDate and EndDate are required!');
        setType(AlertType.ERROR);
        return false;
      }
      if (isDateDiffGreaterThan7(startDate, endDate)) {
        setMessage('Date range should not be greater than 7 days!');
        setType(AlertType.ERROR);
        return false;
      }
      console.log('start: ', startDate, ' end: ', endDate)
      const response = await nasaService.getNeo({ startDate, endDate });
      handleResponse(response, setMessage, setType, (data) => setNeoData(data?.near_earth_objects || {}))
    } catch (err) {
      console.log('error', err);
      setMessage('Unable to load data');
      setType(AlertType.ERROR);
      setNeoData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeos();
  }, []);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl text-white font-semibold mb-4">Near Earth Objects (NEO) Tracker</h2>
      <p className="text-sm text-gray-300 text-start mb-6 mx-auto">
        Track asteroids and comets that come close to Earth! NASA’s NEO data provides details about the size, speed, approach distance,
        and potential hazard level of these objects. Use the search below to explore NEOs by date range upto 7 days and visualize them through interactive charts and insights.
      </p>
      <SearchComponent type={InputTypes.DATE_RANGE} onClickHandler={fetchNeos} input={selectedDates} setInput={setSelectedDates} />

      {loading ? <Loader /> :
        <React.Fragment>
          {neoData && Object.keys(neoData).length > 0 && <>
            < TabsComponent activeTab={activeTab} handleTabClick={handleTabClick} tabs={tabs} />
            {activeTab === 'data' ? (
              <NeoDataTable data={neoData} />
            ) : (
              <NeoCharts data={neoData} />
            )} </>}
        </React.Fragment>
      }
    </div>
  );
}
