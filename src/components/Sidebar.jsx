import { Plane, Menu, Settings, Wrench, Navigation } from 'lucide-react';

function Sidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'map', icon: Navigation, label: 'Takeoff', subLabel: '' },
    { id: 'plan', icon: Plane, label: 'Plan Flight', subLabel: '' },
    { id: 'analyze', icon: Menu, label: 'Analyze Tools', subLabel: '' },
    { id: 'vehicle', icon: Wrench, label: 'Vehicle Configuration', subLabel: '' },
    { id: 'settings', icon: Settings, label: 'Application Settings', subLabel: 'QGroundControl Version\nv2.0.8 64 bit' },
  ];

  return (
    <div className="w-48 bg-gray-800 border-r border-gray-700 flex flex-col">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex items-center gap-3 px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
              isActive ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'text-white'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <div className="text-left">
              <div className="text-sm font-medium">{item.label}</div>
              {item.subLabel && (
                <div className="text-xs opacity-75 whitespace-pre-line mt-1">
                  {item.subLabel}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default Sidebar;
