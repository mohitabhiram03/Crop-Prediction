import { useContext, useRef } from 'react';
import useWeather from '../utils/useWeather';
import predictContext from '../utils/predictContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const DetailForm = () => {
  const nitrogenRef = useRef(null);
  const phosphorousRef = useRef(null);
  const potassiumRef = useRef(null);
  const temperatureRef = useRef(null);
  const humidityRef = useRef(null);
  const pHRef = useRef(null);
  const rainfallRef = useRef(null);

  const { predictionData, setPredictionData } = useContext(predictContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const nitrogenValue = nitrogenRef?.current.value;
    const phosphorousValue = phosphorousRef?.current.value;
    const potassiumValue = potassiumRef?.current.value;
    const temperatureValue = temperatureRef?.current.value;
    const humidityValue = humidityRef?.current.value;
    const pHValue = pHRef?.current.value;
    const rainfallValue = rainfallRef?.current.value;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' },
      body: JSON.stringify({
        Nitrogen: nitrogenValue,
        Phosphorous: phosphorousValue,
        Potassium: potassiumValue,
        Temperature: temperatureValue,
        Humidity: humidityValue,
        PH: pHValue,
        Rainfall: rainfallValue,
      }),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/data', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setPredictionData(responseData);
      navigate('/predict');
    } catch (error) {
      console.error('Error:', error);
    }

    console.log({
      Nitrogen: nitrogenValue,
      Phosphorous: phosphorousValue,
      Potassium: potassiumValue,
      Temperature: temperatureValue,
      Humidity: humidityValue,
      PH: pHValue,
      Rainfall: rainfallValue,
    });
  };
  const { weatherData, error } = useWeather();

  if (!weatherData) {
    return <Loader />;
  }

  console.log(weatherData);

  return (
    <div className="mx-auto my-10 max-w-md p-8 bg-white shadow-2xl rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-6">Details Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nitrogen</label>
            <input
              ref={nitrogenRef}
              type="number"
              step="any"
              min="1"
              max="200"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="Nitrogen in soil (Kg per hectare)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">Phosphorous</label>
            <input
              ref={phosphorousRef}
              type="number"
              step="any"
              min="1"
              max="200"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="Phosphorous in soil (Kg per hectare)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Potassium</label>
            <input
              ref={potassiumRef}
              type="number"
              step="any"
              min="1"
              max="200"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="Potassium in soil (Kg per hectare)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Temperature</label>
            <input
              ref={temperatureRef}
              type="number"
              step="any"
              min="1"
              max="65"
              value={weatherData?.current?.temp_c || ''}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="Temperature in degree"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Humidity</label>
            <input
              ref={humidityRef}
              type="number"
              step="any"
              min="1"
              max="100"
              value={weatherData?.current?.humidity || ''}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="Humidity in percentage"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">PH</label>
            <input
              ref={pHRef}
              type="number"
              step="any"
              min="1"
              max="14"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="PH from 1-14"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rainfall</label>
            <input
              ref={rainfallRef}
              type="number"
              step="any"
              min="1"
              max="1000"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              placeholder="Rainfall in mm"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailForm;
