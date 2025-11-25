import { useState } from 'react';
import { FileText, MapPin, Terminal, Activity, Download } from 'lucide-react';
import LogDownload from './LogDownload';

function AnalyzeTools() {
  const [activeTab, setActiveTab] = useState('log-download');

  const tabs = [
    { id: 'log-download', icon: FileText, label: 'Log Download' },
    { id: 'geotag', icon: MapPin, label: 'GeoTag Images' },
    { id: 'mavlink-console', icon: Terminal, label: 'MAVLink Console' },
    { id: 'mavlink-inspector', icon: Activity, label: 'MAVLink Inspector' },
    { id: 'vibration', icon: Activity, label: 'Vibration' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'log-download':
        return <LogDownload />;
      case 'geotag':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">GeoTag Images</h2>
            <p className="text-gray-400">Select log file and image directory to geotag your images.</p>
            <div className="mt-6 space-y-4">
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                Browse Log File
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded ml-4">
                Browse Image Directory
              </button>
            </div>
          </div>
        );
      case 'mavlink-console':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">MAVLink Console</h2>
            <div className="bg-black rounded p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto">
              <div>MAVLink Console v2.0</div>
              <div className="mt-2 text-gray-500">Waiting for connection...</div>
            </div>
          </div>
        );
      case 'mavlink-inspector':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">MAVLink Inspector</h2>
            <p className="text-gray-400">Inspect MAVLink messages in real-time.</p>
            <div className="mt-4 bg-gray-800 rounded p-4 h-96">
              <div className="text-gray-500 text-center pt-20">No active connection</div>
            </div>
          </div>
        );
      case 'vibration':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Vibration Analysis</h2>
            <p className="text-gray-400">View vibration data from your vehicle.</p>
            <div className="mt-4 bg-gray-800 rounded p-4 h-96">
              <div className="text-gray-500 text-center pt-20">No data available</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <button className="text-gray-300 hover:text-white">
            &lt; Exit Analyze Tools
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-52 bg-gray-800 border-r border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-yellow-500 text-black' : 'text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AnalyzeTools;
