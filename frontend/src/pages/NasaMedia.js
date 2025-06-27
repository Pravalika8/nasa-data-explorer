import React, { useContext, useState } from 'react';
import { FaImages, FaVideo, FaStar } from 'react-icons/fa';
import MediaResults from '../components/media/MediaResults';
import Loader from '../components/common/Loader'
import SearchComponent from '../components/SearchComponent';
import { AlertType, InputTypes } from '../constants/InputConstant';
import nasaService from '../services/nasaService';
import TabsComponent from '../components/TabsComponent';
import handleResponse from '../helpers/responseHelper';
import { AlertContext } from '../contexts/context';

export default function NasaMedia() {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([])
  const { setMessage, setType } = useContext(AlertContext);
  const tabs = [
    { id: 'all', label: 'All', icon: <FaStar /> },
    { id: 'image', label: 'Images', icon: <FaImages /> },
    { id: 'video', label: 'Videos', icon: <FaVideo /> },
  ];

  const fetchMediaData = async () => {
    try {
      setLoading(true);
      const searchQuery = searchText.trim();
      let mediaQuery = selectedTypes.join(',');
      const response = await nasaService.getMedia(searchQuery, mediaQuery);
      handleResponse(response, setMessage, setType, (data) => {
        if (!data?.collection?.items || data?.collection?.items.length === 0) {
          setMessage('No data found!');
          setType(AlertType.SUCCESS);
        }
        setMediaData(data?.collection?.items || []);
        setFilteredData(filterDataByTabId(activeTab, data?.collection?.items || []));
      });
    } catch (err) {
      setMessage('Unable to load data');
      setType(AlertType.ERROR);
      setFilteredData([]);
      setMediaData([]);
    } finally {
      setLoading(false);
    }
  }

  const handleTabClick = (tabId) => {
    try {
      setLoading(true);
      setActiveTab(tabId);
      setFilteredData(filterDataByTabId(tabId, mediaData));
    } finally {
      setLoading(false);
    }
  }

  const filterDataByTabId = (tabId, data) => {
    console.log(`selected tab: ${tabId}`, data.length);
    if (tabId === "all") {
      return data;
    }
    const filteredList = [];
    data.forEach(item => {
      if (item.data[0].media_type === tabId) {
        filteredList.push(item);
      }
    });
    console.log('filteredData: ', filteredList.length);
    return filteredList;
  }
  return (
    <div className="p-6 relative">
      <h2 className="text-2xl text-white font-semibold mb-4">NASA Image & Video Library</h2>
      <p className="text-sm text-gray-300 mb-6 mx-auto">
        Explore NASA’s vast multimedia archive, featuring images, videos from decades of space exploration.
        Search by keyword to discover incredible content—from moon landings and Mars missions to stunning Hubble imagery.
      </p>
      <SearchComponent type={InputTypes.TEXT} onClickHandler={fetchMediaData} input={searchText} setInput={setSearchText} />
      {mediaData && mediaData.length > 0 && <React.Fragment>
        <TabsComponent handleTabClick={handleTabClick} activeTab={activeTab} tabs={tabs} />
        <MediaResults mediaData={filteredData} />
      </React.Fragment>
      }
      {loading && <Loader />}
    </div>
  );
}
