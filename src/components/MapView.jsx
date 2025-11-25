import { Compass, AlertCircle } from 'lucide-react';
import { useState } from 'react';

function MapView() {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const handleActionClick = (actionName) => {
    const messages = {
      'Takeoff': 'Vehicle connection required to set takeoff location',
      'Waypoint': 'Please establish vehicle connection before adding waypoints',
      'ROI': 'Connect to vehicle to define Region of Interest',
      'Pattern': 'Vehicle connection needed for flight pattern configuration',
      'Return': 'Return-to-home requires active vehicle connection',
      'Center': 'Vehicle connection required for map centering'
    };

    setWarningMessage(messages[actionName]);
    setShowWarning(true);
    
    // Auto-hide warning after 3 seconds
    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  };

  const actionButtons = [
    { icon: '📍', label: 'Takeoff', action: 'Takeoff' },
    { icon: '➕', label: 'Waypoint', action: 'Waypoint' },
    { icon: '🎯', label: 'ROI', action: 'ROI' },
    { icon: '📐', label: 'Pattern', action: 'Pattern' },
    { icon: '↩', label: 'Return', action: 'Return' },
    { icon: '⊙', label: 'Center', action: 'Center' }
  ];

  return (
    <div className="w-full h-full relative">
      {/* Use image from public folder */}
      <img
        src="/maps/default-map.jpg"
        alt="Mission Map"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to external image if local map doesn't exist
          e.target.src = "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/3:2/w_1920,c_limit/GoogleMapTA.jpg";
        }}
      />

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

      {/* Selected Waypoint Info */}
      <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 px-3 py-2 rounded text-sm backdrop-blur-sm">
        <div className="text-gray-300">Selected Waypoint</div>
        <div className="text-white">Alt diff: 0.0 m</div>
        <div className="text-white">Gradient: -.-</div>
      </div>

      {/* Mission Info */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="bg-gray-800 bg-opacity-90 px-3 py-2 rounded text-sm backdrop-blur-sm">
          <div className="text-gray-300">Total Mission</div>
          <div className="text-white">Distance: 0 m</div>
          <div className="text-white">Time: 00:00:00</div>
        </div>
        <div className="bg-gray-800 bg-opacity-90 px-3 py-2 rounded text-sm backdrop-blur-sm">
          <div className="text-gray-300">Max telem dist: 0 m</div>
        </div>
      </div>

      {/* Compass and Telemetry */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
        <div className="bg-gray-800 bg-opacity-95 rounded-lg p-3 relative w-32 h-32 backdrop-blur-sm">
          <Compass className="w-full h-full text-gray-400" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-red-500 text-4xl font-bold">N</div>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-300">
            S
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-300">
            W
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-300">
            E
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

      {/* Action Buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {actionButtons.map((button) => (
          <button
            key={button.action}
            onClick={() => handleActionClick(button.action)}
            className="bg-gray-800 bg-opacity-90 hover:bg-gray-700 p-3 rounded text-xs backdrop-blur-sm transition-colors duration-200"
          >
            <div>{button.icon}</div>
            <div className="mt-1">{button.label}</div>
          </button>
        ))}
      </div>

      {/* Navigation Info */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        <div className="text-gray-300 text-xs mb-1">Azimuth: 0 | Dist prev WP: 0.0 m | Heading: nan</div>
      </div>

      {/* Connection Status */}
      <div className="absolute bottom-4 left-4 bg-red-600 bg-opacity-90 px-3 py-2 rounded text-sm backdrop-blur-sm">
        <div className="text-white font-semibold">DISCONNECTED</div>
        <div className="text-gray-200 text-xs">Connect to vehicle to enable mission planning</div>
      </div>
    </div>
  );
}

export default MapView;