
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

export default function LineChartComponent({ data, label = 'value' }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow my-8">
      <h2 className="text-xl text-white font-semibold mb-4 capitalize">📈 Line Chart - {label}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} name={label} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
