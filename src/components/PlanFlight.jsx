import { Compass, AlertCircle } from 'lucide-react';
import { useState } from 'react';

function PlanFlight() {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const handleActionClick = (actionName) => {
    const messages = {
      'Mission': 'Connect to vehicle to load mission parameters',
      'Fence': 'Vehicle connection required for geofence configuration',
      'Rally': 'Establish connection to set rally points',
      'Camera': 'Connect to vehicle to access camera settings',
      'Vehicle Info': 'Vehicle connection needed to retrieve vehicle information',
      'Launch Position': 'Connect to vehicle to set launch position',
      'Rotate': 'Vehicle connection required for map rotation',
      'Zoom In': 'Connect to vehicle for detailed map operations',
      'Home': 'Vehicle connection needed to set home location',
      'Center': 'Connect to vehicle for map centering'
    };

    setWarningMessage(messages[actionName]);
    setShowWarning(true);
    
    // Auto-hide warning after 3 seconds
    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  };

  const actionButtons = [
    { icon: '↻', label: 'Rotate', action: 'Rotate' },
    { icon: '+', label: 'Zoom In', action: 'Zoom In' },
    { icon: '📍', label: 'Home', action: 'Home' },
    { icon: '⊙', label: 'Center', action: 'Center' }
  ];

  const rightPanelButtons = [
    { label: 'Mission', action: 'Mission', active: true },
    { label: 'Fence', action: 'Fence', active: false },
    { label: 'Rally', action: 'Rally', active: false }
  ];

  const dropdownButtons = [
    { label: 'Camera', action: 'Camera' },
    { label: 'Vehicle Info', action: 'Vehicle Info' },
    { label: 'Launch Position', action: 'Launch Position' }
  ];

  return (
    <div className="w-full h-full relative">
      {/* Connection Warning Popup */}
      {showWarning && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-yellow-500 border border-yellow-600 rounded-lg shadow-lg p-4 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-6 h-6 text-yellow-800 flex-shrink-0" />
            <div>
              <div className="font-semibold text-yellow-900">Connection Required</div>
              <div className="text-yellow-800 text-sm mt-1">{warningMessage}</div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between z-10 backdrop-blur-sm">
        <button className="text-gray-300 hover:text-white text-sm transition-colors">
          &lt; Exit Plan
        </button>
        <div className="flex gap-4 text-xs text-gray-400">
          <div>
            <span className="text-gray-300">Alt diff:</span> 0.0 m
          </div>
          <div>
            <span className="text-gray-300">Gradient:</span> -.-
          </div>
          <div>
            <span className="text-gray-300">Azimuth:</span> 0
          </div>
          <div>
            <span className="text-gray-300">Dist prev WP:</span> 0.0 m
          </div>
          <div>
            <span className="text-gray-300">Heading:</span> nan
          </div>
        </div>
        <div className="flex gap-4 text-xs text-gray-400">
          <div>
            <span className="text-gray-300">Distance:</span> 0 m
          </div>
          <div>
            <span className="text-gray-300">Time:</span> 00:00:00
          </div>
          <div>
            <span className="text-gray-300">Max telem dist:</span> 0 m
          </div>
        </div>
      </div>

      {/* Map Image */}
      <img
        src="/maps/default-map2.jpg"
        alt="Mission Planning Map"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to external image if local map doesn't exist
          e.target.src = "https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?auto=compress&cs=tinysrgb&w=1920";
        }}
      />

      {/* Right Side Action Buttons */}
      <div className="absolute top-16 right-4 bg-gray-800 bg-opacity-90 rounded p-4 space-y-2 backdrop-blur-sm">
        {rightPanelButtons.map((button) => (
          <button
            key={button.action}
            onClick={() => handleActionClick(button.action)}
            className={`${
              button.active 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            } px-4 py-2 rounded w-full text-sm font-medium transition-colors`}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Mission Configuration Panel */}
      <div className="absolute top-16 right-40 bg-gray-800 bg-opacity-95 rounded p-4 w-80 space-y-3 backdrop-blur-sm">
        <div className="bg-blue-900 px-3 py-2 rounded">
          <div className="text-sm font-medium mb-2">Mission Start</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-300">All Altitudes</div>
          <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors">
            <option>Relative To Launch</option>
            <option>AMSL</option>
            <option>Terrain</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-300">Initial Waypoint Alt</div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value="50.0"
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              readOnly
            />
            <span className="text-sm text-gray-400">m</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="flight-speed" 
            className="rounded focus:ring-blue-500" 
          />
          <label htmlFor="flight-speed" className="text-sm text-gray-300">
            Flight speed
          </label>
          <input
            type="number"
            value="5.0"
            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm ml-auto focus:outline-none focus:border-blue-500 transition-colors"
            readOnly
          />
          <span className="text-sm text-gray-400">m/s</span>
        </div>

        {/* Dropdown Sections */}
        {dropdownButtons.map((button) => (
          <div key={button.action} className="pt-2 border-t border-gray-700">
            <div className="text-sm font-medium mb-2">{button.label}</div>
            <button 
              onClick={() => handleActionClick(button.action)}
              className="w-full bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>▼</span>
            </button>
          </div>
        ))}
      </div>

      {/* Compass and Telemetry */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
        <div className="bg-gray-800 bg-opacity-95 rounded-lg p-3 relative w-32 h-32 backdrop-blur-sm">
          <Compass className="w-full h-full text-gray-400" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-red-500 text-4xl font-bold">N</div>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-90 px-3 py-2 rounded text-xs space-y-1 backdrop-blur-sm">
          <div className="flex gap-2">
            <span className="text-gray-300">↑</span>
            <span className="text-white">0.0 m</span>
            <span className="text-gray-300">↑</span>
            <span className="text-white">0.0 m/s</span>
            <span className="text-gray-300">⏱</span>
            <span className="text-white">00:00:00</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-300">↓</span>
            <span className="text-white">0.0 m</span>
            <span className="text-gray-300">→</span>
            <span className="text-white">0.0 m/s</span>
            <span className="text-gray-300">#</span>
            <span className="text-white">0.0 m</span>
          </div>
        </div>
      </div>

      {/* Left Side Tool Buttons */}
      <div className="absolute left-4 top-24 flex flex-col gap-2">
        {actionButtons.map((button) => (
          <button
            key={button.action}
            onClick={() => handleActionClick(button.action)}
            className="bg-gray-800 bg-opacity-90 hover:bg-gray-700 p-3 rounded text-xl transition-colors backdrop-blur-sm"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* Connection Status */}
      <div className="absolute bottom-4 left-4 bg-red-600 bg-opacity-90 px-3 py-2 rounded text-sm backdrop-blur-sm">
        <div className="text-white font-semibold">DISCONNECTED</div>
        <div className="text-gray-200 text-xs">Connect to vehicle to enable mission planning</div>
      </div>
    </div>
  );
}

export default PlanFlight;