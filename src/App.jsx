import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapView from './components/MapView';
import AnalyzeTools from './components/AnalyzeTools';
import PlanFlight from './components/PlanFlight';
import VehicleConfiguration from './components/VehicleConfiguration';
import ApplicationSettings from './components/ApplicationSettings';

function App() {
  const [currentView, setCurrentView] = useState('map');

  const renderView = () => {
    switch (currentView) {
      case 'map':
        return <MapView />;
      case 'analyze':
        return <AnalyzeTools />;
      case 'plan':
        return <PlanFlight />;
      case 'vehicle':
        return <VehicleConfiguration />;
      case 'settings':
        return <ApplicationSettings />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="flex-1 relative">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default App;
