import React, { useState } from 'react'
import { InputTypes } from '../constants/InputConstant';
import DateRangePicker from './DateRangePicker';

const SearchComponent = ({ type, onClickHandler, placeholder, input, setInput, asSingle }) => {
  const [loading, setLoading] = useState(false)
  console.log('type: ', type)
  const handleClick = async () => {
    try {
      setLoading(true);
      await onClickHandler();
    } finally {
      setLoading(false)
    }
  }
  return (
    <React.Fragment>
      <div className="flex items-center p-2 gap-2 mb-6 max-w-3xl w-full">
        {type === InputTypes.TEXT && <input
          type={type}
          placeholder={placeholder || "Search e.g. Mars, Galaxy, Apollo..."}
          className="px-4 py-2 rounded bg-gray-800 text-white w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        />}
        {type === InputTypes.DATE_RANGE && <DateRangePicker setSelectedDates={setInput} asSingle={asSingle} />}
        <button
          onClick={handleClick}
          disabled={loading || (!input) || (type === InputTypes.DATE_RANGE && !input?.startDate)}
          className="bg-blue-500 disabled:bg-blue-300 disabled:opacity-10 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
    </React.Fragment>
  )
}

export default SearchComponent;