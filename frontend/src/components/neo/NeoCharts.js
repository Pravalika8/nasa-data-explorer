import { useEffect, useState } from 'react';
import BarChartComponent from '../charts/BarChartComponent';
import LineChartComponent from '../charts/LineChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import { ChartTypes, MetricTypes } from '../../constants/InputConstant';

export default function NeoCharts({ data }) {
  const [chartType, setChartType] = useState(ChartTypes.BAR);
  const [metricType, setMetricType] = useState(MetricTypes.COUNT.id);
  const [chartData, setChartData] = useState();

  const onChartTypeChange = (value) => {
    console.log('chart type: ', value);
    setChartType(value);
  }
  const onMetricTypeChange = (value) => {
    console.log('metric type', value);
    setMetricType(value);
    const chartData1 = buildChartData(data, value);
    console.log('chartData; ', chartData1);
    setChartData(chartData1);
  }

  useEffect(() => {
    const chartData1 = buildChartData(data, metricType);
    console.log('chartData; ', chartData1);
    setChartData(chartData1);
  }, [])

  console.log('neo data : ', data);

  const buildChartData = (data1, metricType1) => {
    console.log('buildChartData called: ', data && true)
    let neoPerDay = data1;
    console.log('neodata keys: ', Object.keys(data));
    if (metricType1 === MetricTypes.COUNT.id) {
      const counts = Object.entries(neoPerDay).map(([date, list]) => ({
        date,
        value: list.length,
      }));
      console.log('counts: ', counts);
      return counts;
    }
    if (metricType1 === MetricTypes.AVG_SPEED.id) {
      const avgSpeeds = Object.entries(neoPerDay).map(([date, list]) => {
        const avgSpeed =
          list.reduce((sum, obj) => {
            const speed = parseFloat(obj.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour || 0);
            return sum + speed;
          }, 0) / list.length;

        return { date, value: parseFloat(avgSpeed.toFixed(2)) };
      });
      console.log('avgspeeds: ', avgSpeeds)
      return avgSpeeds;
    }

    if (metricType1 === MetricTypes.HAZARDOUS.id) {
      let hazardous = 0;
      let nonHazardous = 0;
      Object.values(neoPerDay).forEach((list) => {
        list.forEach((obj) => {
          obj.is_potentially_hazardous_asteroid ? hazardous++ : nonHazardous++;
        });
      });

      return [
        { name: 'Hazardous', value: hazardous },
        { name: 'Non-Hazardous', value: nonHazardous },
      ];
    }

    if (metricType1 === MetricTypes.MAX_DIAMETER.id) {
      const maxDiameters = Object.entries(neoPerDay).map(([date, list]) => {
        const max = Math.max(
          ...list.map((obj) => obj.estimated_diameter.kilometers.estimated_diameter_max)
        );
        return { date, value: parseFloat(max.toFixed(3)) };
      });
      console.log('maxDiameters: ', maxDiameters);
      return maxDiameters;
    }

    return [];
  };
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow">
      <ChartFilter onChartTypeChange={onChartTypeChange} onMetricTypeChange={onMetricTypeChange} selectedChart={chartType} selectedMetric={metricType} />
      {chartType === ChartTypes.BAR && metricType !== MetricTypes.HAZARDOUS.id && (
        <BarChartComponent data={chartData} label={metricType} />
      )}

      {chartType === ChartTypes.LINE && metricType !== MetricTypes.HAZARDOUS.id && (
        <LineChartComponent data={chartData} label={metricType} />
      )}

      {chartType === ChartTypes.PIE && metricType === MetricTypes.HAZARDOUS.id && (
        <PieChartComponent data={chartData} />
      )}
    </div>
  );
}

const clsx = (baseClass, { condition, ifSatisfied, ifNotSatisfied }) => {
  let cssSelected = `${baseClass}`;
  if (condition) {
    cssSelected += ` ${ifSatisfied} `;
  } else {
    cssSelected += ` ${ifNotSatisfied} `
  }
  // console.log('condition: ', condition, cssSelected)
  return cssSelected;
}

function ChartFilter({ selectedChart, selectedMetric, onChartTypeChange, onMetricTypeChange }) {
  return (
    <div className=" items-center justify-start gap-10 flex">
      {/* Chart Type Chips */}
      <div className='flex-col '>
        <p className="text-sm font-semibold mb-1">Chart Type</p>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(ChartTypes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => onChartTypeChange(value)}
              className={clsx(
                'px-3 py-1 rounded-full text-sm font-medium border transition text-blue-600',
                {
                  condition: (selectedChart === value), ifSatisfied: 'bg-blue-50 border-blue-300'
                  , ifNotSatisfied: '  border-blue-300 hover:bg-blue-50'
                }
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Type Chips */}
      <div className='flex-col'>
        <p className="text-sm font-semibold  p-1">Metric</p>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(MetricTypes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => onMetricTypeChange(value.id)}
              className={clsx(
                'px-3 py-1 rounded-full text-sm font-medium border transition text-green-600',
                {
                  condition: (selectedMetric === value.id),
                  ifSatisfied: 'bg-green-50 border-green-300',
                  ifNotSatisfied: ' border-green-300 hover:bg-green-50'
                }
              )}
            >
              {value.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

