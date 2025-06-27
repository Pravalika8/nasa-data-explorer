
export default function ChartFilter({ chartType, metricType, onChartTypeChange, onMetricTypeChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
      <div>
        <label className="text-sm text-gray-400">Chart Type</label>
        <select
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded ml-2"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-400">Metric</label>
        <select
          value={metricType}
          onChange={(e) => onMetricTypeChange(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded ml-2"
        >
          <option value="count">Count per Day</option>
          <option value="avgSpeed">Avg Speed per Day</option>
          <option value="hazardous">% Hazardous</option>
          <option value="maxDiameter">Max Diameter per Day</option>
        </select>
      </div>
    </div>
  );
}
