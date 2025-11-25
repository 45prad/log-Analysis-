import { useState } from 'react';

function ApplicationSettings() {
  const [settings, setSettings] = useState({
    language: 'System',
    colorScheme: 'Indoor',
    streamGCS: 'When in Follow Me Flight Mode',
    muteAudio: false,
    clearOnStart: false,
    uiScaling: 100,
    horizontalDistance: 'Meters',
    verticalDistance: 'Meters',
    area: 'SquareMeters',
    speed: 'Meters/second',
    temperature: 'Celsius',
  });

  const settingsTabs = [
    'General',
    'Fly View',
    'Plan View',
    'Video',
    'Telemetry',
    'ADSB Server',
    'Comm Links',
    'Maps',
    'PX4 Log Transfer',
    'Remote ID',
    'Console',
    'Help',
  ];

  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <button className="text-gray-300 hover:text-white">
          &lt; Exit Application Settings
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-52 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          {settingsTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                activeTab === tab ? 'bg-yellow-500 text-black' : 'text-white'
              }`}
            >
              <div className="text-sm font-medium">{tab}</div>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-8">General</h2>

            <div className="space-y-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>System</option>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>Chinese</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Color Scheme</label>
                    <select
                      value={settings.colorScheme}
                      onChange={(e) => setSettings({ ...settings, colorScheme: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>Indoor</option>
                      <option>Outdoor</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Stream GCS Position</label>
                    <select
                      value={settings.streamGCS}
                      onChange={(e) => setSettings({ ...settings, streamGCS: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>When in Follow Me Flight Mode</option>
                      <option>Always</option>
                      <option>Never</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Mute all audio output</label>
                    <input
                      type="checkbox"
                      checked={settings.muteAudio}
                      onChange={(e) => setSettings({ ...settings, muteAudio: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Clear all settings on next start</label>
                    <input
                      type="checkbox"
                      checked={settings.clearOnStart}
                      onChange={(e) => setSettings({ ...settings, clearOnStart: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">UI Scaling</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSettings({ ...settings, uiScaling: Math.max(50, settings.uiScaling - 10) })}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-20 text-center">{settings.uiScaling}%</span>
                  <button
                    onClick={() => setSettings({ ...settings, uiScaling: Math.min(200, settings.uiScaling + 10) })}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Application Load/Save Path</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value="C:\Users\prabal\Documents\QGroundControl"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                    readOnly
                  />
                  <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">
                    Browse
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Units</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Horizontal Distance</label>
                    <select
                      value={settings.horizontalDistance}
                      onChange={(e) => setSettings({ ...settings, horizontalDistance: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>Meters</option>
                      <option>Feet</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Vertical Distance</label>
                    <select
                      value={settings.verticalDistance}
                      onChange={(e) => setSettings({ ...settings, verticalDistance: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>Meters</option>
                      <option>Feet</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Area</label>
                    <select
                      value={settings.area}
                      onChange={(e) => setSettings({ ...settings, area: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>SquareMeters</option>
                      <option>SquareFeet</option>
                      <option>Acres</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Speed</label>
                    <select
                      value={settings.speed}
                      onChange={(e) => setSettings({ ...settings, speed: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>Meters/second</option>
                      <option>Feet/second</option>
                      <option>Knots</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Temperature</label>
                    <select
                      value={settings.temperature}
                      onChange={(e) => setSettings({ ...settings, temperature: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-64"
                    >
                      <option>Celsius</option>
                      <option>Fahrenheit</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Brand Image</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm w-32">Indoor Image</label>
                    <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">
                      Browse
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm w-32">Outdoor Image</label>
                    <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">
                      Browse
                    </button>
                  </div>
                  <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">
                    Reset Images
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSettings;
