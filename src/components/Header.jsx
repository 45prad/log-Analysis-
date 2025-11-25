import { Wifi, WifiOff } from 'lucide-react';

function Header() {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        <span className="text-sm font-semibold">QGroundControl</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-300">
        <WifiOff className="w-4 h-4 text-red-400" />
        <span>Disconnected - Click to manually connect</span>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span>v2.0.8.64 bit</span>
      </div>
    </div>
  );
}

export default Header;
