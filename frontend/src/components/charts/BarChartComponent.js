import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const BarChartComponent = ({ data, label = 'value' }) => {
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow my-6">
            <h2 className="text-xl text-white font-semibold mb-4 capitalize"> BarChart - {label}</h2>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray={"3 3"} stroke="#444" />
                    <XAxis dataKey={"date"} stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={"value"} fill="#38bdf8" name={label} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartComponent;