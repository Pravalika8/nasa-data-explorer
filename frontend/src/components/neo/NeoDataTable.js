import { useState } from 'react';

export default function NeoDataTable({ data }) {
  const [expandedDate, setExpandedDate] = useState(null);

  const toggle = (date) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  if (!data || Object.keys(data).length === 0) {
    return <p className="text-center text-gray-500">No data found.</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {Object.entries(data).map(([date, asteroids]) => (
        <div key={date} className=" rounded shadow-sm">
          <button
            onClick={() => toggle(date)}
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-800 hover:bg-gray-700 transition"
          >
            <span className="font-semibold text-blue-800">{date} ({asteroids.length})</span>
            <span className="text-gray-600">{expandedDate === date ? '▲' : '▼'}</span>
          </button>

          {expandedDate === date && (
            <div className="bg-gray-900 px-4 py-3 space-y-2">
              {asteroids.map((neo, index) => {
                const velocity = parseFloat(
                  neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour || 0
                ).toFixed(2);
                const diameter = (
                  (neo.estimated_diameter.meters.estimated_diameter_min +
                    neo.estimated_diameter.meters.estimated_diameter_max) /
                  2
                ).toFixed(2);

                return (
                  <div
                    key={neo.id || index}
                    className="border-b-2 hover:bg-gray-700 hover:text-white border-gray-800 text-gray-600 p-3 text-sm shadow-sm hover:shadow-md transition items-center  justify-between flex gap-6"
                  >
                    <span className="font-medium">{neo.name}</span>
                    <span>Speed: {velocity} km/h</span>
                    <span>Size: {diameter} m </span>
                    {neo.is_potentially_hazardous_asteroid ? (
                      <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">
                        Hazardous
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs transition-transform hover:scale-105">
                        nonHazardous </span>
                    )}

                    <a
                      href={neo.nasa_jpl_url}
                      className="text-blue-500 underline mt-1 inline-block"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on NASA JPL →
                    </a>


                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
