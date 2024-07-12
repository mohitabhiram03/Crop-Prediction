import { useContext, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import predictContext from '../utils/predictContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DisplayComponent = () => {
  const [showChart, setShowChart] = useState(false);
  const { predictionData, setPredictionData } = useContext(predictContext);
  console.log(predictionData)
  const values = predictionData?.values;
  const levels = predictionData?.levels;
  const cropName = predictionData?.cropName;
  const accuracy = predictionData?.accuracy;

  const chartData = {
    labels: ['Nitrogen Level', 'Phosphorous Level', 'Potassium Level', 'Humidity', 'Temperature', 'Rainfall', 'PH Level'],
    datasets: [
      {
        label: 'Levels',
        data: values ? Object.entries(values).map(value => value[1]) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  console.log(accuracy);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <button onClick={() => setShowChart(!showChart)} className="bg-blue-600  text-white rounded-lg mx-auto px-4  py-1 m-4">
        Visualize
      </button>
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Crop Prediction Result</h2>

            <div className="w-full">
              <table className="w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">N Level (kg/ha)</th>
                    <th className="px-4 py-2 border">P Level (kg/ha)</th>
                    <th className="px-4 py-2 border">K Level (kg/ha)</th>
                    <th className="px-4 py-2 border">Humidity (%)</th>
                    <th className="px-4 py-2 border">Temperature (°C)</th>
                    <th className="px-4 py-2 border">Rainfall (mm)</th>
                    <th className="px-4 py-2 border">PH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border text-center">{values?.Nitrogen}</td>
                    <td className="px-4 py-2 border text-center">{values?.Phosphorous}</td>
                    <td className="px-4 py-2 border text-center">{values?.Potassium}</td>
                    <td className="px-4 py-2 border text-center">{values?.Humidity}</td>
                    <td className="px-4 py-2 border text-center">{values?.Temperature}</td>
                    <td className="px-4 py-2 border text-center">{values?.Rainfall}</td>
                    <td className="px-4 py-2 border text-center">{values?.PH}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-full mt-6">
              <table className="w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Nitrogen Level</th>
                    <th className="px-4 py-2 border">Phosphorous Level</th>
                    <th className="px-4 py-2 border">Potassium Level</th>
                    <th className="px-4 py-2 border">Humidity</th>
                    <th className="px-4 py-2 border">Temperature</th>
                    <th className="px-4 py-2 border">Rainfall</th>
                    <th className="px-4 py-2 border">PH Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border text-center">{levels?.NLevel}</td>
                    <td className="px-4 py-2 border text-center">{levels?.PLevel}</td>
                    <td className="px-4 py-2 border text-center">{levels?.potassiumLevel}</td>
                    <td className="px-4 py-2 border text-center">{levels?.humidityLevel}</td>
                    <td className="px-4 py-2 border text-center">{levels?.temperatureLevel}</td>
                    <td className="px-4 py-2 border text-center">{levels?.rainfallLevel}</td>
                    <td className="px-4 py-2 border text-center">{levels?.PHLevel}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {showChart && (
              <div className="mt-8">
                <Bar data={chartData} />
              </div>
            )}

            <h1 className="text-center text-4xl mt-8 text-pink-700 font-bold">Best crop to grow in this condition is {cropName}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayComponent;
