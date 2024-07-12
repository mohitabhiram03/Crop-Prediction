import DisplayContainer from './components/DisplayContainer';
import DetailForm from './components/DetailForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import predictContext from './utils/predictContext';
import { useState } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

function App() {
  const [predictionData, setPredictionData] = useState(null);

  return (
    <div className="bg-gray-50">
      <predictContext.Provider value={{ predictionData: predictionData, setPredictionData }}>
        <Navbar />
        <Outlet />
        <Footer />
      </predictContext.Provider>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DetailForm />,
      },
      {
        path: '/predict',
        element: <DisplayContainer />,
      },
    ],
  },
]);

export default App;
