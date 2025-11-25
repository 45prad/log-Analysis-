function VehicleConfiguration() {
  const configSections = [
    'Firmware',
    'Frame',
    'Radio',
    'Sensors',
    'Flight Modes',
    'Power',
    'Motors',
    'Safety',
    'Tuning',
    'Camera',
    'Battery',
    'Parameters',
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <button className="text-gray-300 hover:text-white">
          &lt; Exit Vehicle Configuration
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          {configSections.map((section, index) => (
            <button
              key={section}
              className={`w-full text-left px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                index === 0 ? 'bg-yellow-500 text-black' : 'text-white'
              }`}
            >
              <div className="text-sm font-medium">{section}</div>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold mb-6">Firmware Setup</h2>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Vehicle Type</div>
                  <div className="text-lg font-medium mt-1">Multi-Rotor</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Firmware Version</div>
                  <div className="text-lg font-medium mt-1">ArduCopter V4.3.5</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Autopilot</div>
                  <div className="text-lg font-medium mt-1">Pixhawk 4</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Frame Type</div>
                  <div className="text-lg font-medium mt-1">Quad X</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Firmware Update</h3>
              <p className="text-gray-400 text-sm mb-4">
                Select firmware version to update your vehicle. Make sure vehicle is connected via USB.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-medium">
                  Update Firmware
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-medium">
                  Custom Firmware
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Calibration Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Accelerometer</span>
                  <span className="text-green-400 text-sm">Calibrated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compass</span>
                  <span className="text-green-400 text-sm">Calibrated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Radio</span>
                  <span className="text-yellow-400 text-sm">Not Calibrated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ESC</span>
                  <span className="text-green-400 text-sm">Calibrated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleConfiguration;
