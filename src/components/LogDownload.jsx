import { Download, RefreshCw, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

function LogDownload() {
  const [logs, setLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState(new Set());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCredentials, setAuthCredentials] = useState({
    username: '',
    password: ''
  });
  const [authError, setAuthError] = useState('');
  const [pendingDownload, setPendingDownload] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Default credentials
  const defaultUsername = 'admin123';
  const defaultPassword = 'admin123';

  // Pre-defined log files with static information
  const availableLogFiles = [
    {
      filename: 'battery_diagnostics_flight12.ulg',
      size: '2.3 MB',
      date: '2024-01-15 14:30:25'
    },
    {
      filename: 'drone_flight_2025-11-16_01.ulg',
      size: '1.8 MB',
      date: '2024-01-14 09:15:42'
    },
    {
      filename: 'failsafe_event_flight19.ulg',
      size: '0.9 MB',
      date: '2024-01-13 16:45:18'
    },
    {
      filename: 'fc_telemetry_capture_run07.ulg',
      size: '3.1 MB',
      date: '2024-01-12 11:20:33'
    },
    {
      filename: 'gps_track_flight_27.ulg',
      size: '1.5 MB',
      date: '2024-01-11 13:55:07'
    },
    {
      filename: 'aerologalpha.ulg',
      size: '2.7 MB',
      date: '2024-01-10 08:40:51'
    },
    {
      filename: 'missionAlpha.ulg',
      size: '4.2 MB',
      date: '2024-01-09 15:25:29'
    },
    {
      filename: 'px4_missionlog_2025-11-16.ulg',
      size: '1.9 MB',
      date: '2024-01-08 10:35:44'
    },
    {
      filename: 'uav_flightpath_record_2025_001.ulg',
      size: '3.5 MB',
      date: '2024-01-07 12:50:16'
    },
    {
      filename: '15-04-logs.ulg',
      size: '2.1 MB',
      date: '2024-01-06 17:05:38'
    }
  ];

  // Check if file exists by making a HEAD request
  const checkFileExists = async (filename) => {
    try {
      const response = await fetch(`/logs/${filename}`, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error(`Error checking file ${filename}:`, error);
      return false;
    }
  };

  // Initialize logs
  useEffect(() => {
    const initializeLogs = async () => {
      setIsRefreshing(true);
      
      const logsWithInfo = await Promise.all(
        availableLogFiles.map(async (fileInfo, index) => {
          const exists = await checkFileExists(fileInfo.filename);
          
          return {
            id: index + 1,
            date: fileInfo.date,
            size: fileInfo.size,
            status: exists ? 'Complete' : 'Missing',
            filename: fileInfo.filename,
            exists: exists
          };
        })
      );
      
      setLogs(logsWithInfo);
      setIsRefreshing(false);
    };

    initializeLogs();
  }, []);

  const handleDownload = (log) => {
    if (!log.exists) {
      alert(`File ${log.filename} not found in the logs directory.`);
      return;
    }

    // Create download link to file in public/logs folder
    const link = document.createElement('a');
    link.href = `/logs/${log.filename}`;
    link.download = log.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkDownload = () => {
    if (selectedLogs.size === 0) return;
    
    selectedLogs.forEach(logId => {
      const log = logs.find(l => l.id === logId);
      if (log && log.exists) {
        // Add small delay to avoid browser blocking multiple downloads
        setTimeout(() => handleDownload(log), 100);
      }
    });
  };

  const handleDownloadWithAuth = (log = null) => {
    setPendingDownload(log);
    setShowAuthModal(true);
    setAuthError('');
    setAuthCredentials({ username: '', password: '' });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    if (authCredentials.username === defaultUsername && authCredentials.password === defaultPassword) {
      setAuthError('');
      setShowAuthModal(false);
      
      if (pendingDownload === 'bulk') {
        handleBulkDownload();
      } else if (pendingDownload) {
        handleDownload(pendingDownload);
      }
      
      setPendingDownload(null);
      setAuthCredentials({ username: '', password: '' });
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleAuthCancel = () => {
    setShowAuthModal(false);
    setPendingDownload(null);
    setAuthError('');
    setAuthCredentials({ username: '', password: '' });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const existingLogs = logs.filter(log => log.exists);
      setSelectedLogs(new Set(existingLogs.map(log => log.id)));
    } else {
      setSelectedLogs(new Set());
    }
  };

  const handleSelectLog = (logId, checked) => {
    const newSelected = new Set(selectedLogs);
    if (checked) {
      newSelected.add(logId);
    } else {
      newSelected.delete(logId);
    }
    setSelectedLogs(newSelected);
  };

  // const handleRefresh = async () => {
  //   setIsRefreshing(true);
    
  //   const refreshedLogs = await Promise.all(
  //     logs.map(async (log) => {
  //       const exists = await checkFileExists(log.filename);
  //       return {
  //         ...log,
  //         status: exists ? 'Complete' : 'Missing',
  //         exists: exists
  //       };
  //     })
  //   );
    
  //   setLogs(refreshedLogs);
    
  //   // Clear selection of missing files
  //   const newSelected = new Set(selectedLogs);
  //   refreshedLogs.forEach(log => {
  //     if (!log.exists && newSelected.has(log.id)) {
  //       newSelected.delete(log.id);
  //     }
  //   });
  //   setSelectedLogs(newSelected);
    
  //   setIsRefreshing(false);
  // };

  const isAllSelected = logs.length > 0 && selectedLogs.size === logs.filter(log => log.exists).length;

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Authentication Modal - keep this part the same */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Authentication Required</h3>
              <button 
                onClick={handleAuthCancel}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={authCredentials.username}
                  onChange={(e) => setAuthCredentials({
                    ...authCredentials,
                    username: e.target.value
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={authCredentials.password}
                  onChange={(e) => setAuthCredentials({
                    ...authCredentials,
                    password: e.target.value
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              {authError && (
                <div className="mb-4 text-red-400 text-sm">
                  {authError}
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleAuthCancel}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Log Download</h2>
        <p className="text-gray-400 text-sm">
          Log Download allows you to download binary log files from your vehicle.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          <span className="font-semibold text-white">Id</span>
          <span className="ml-8">Date</span>
          <span className="ml-24">Size</span>
          <span className="ml-16">Status</span>
        </div>
        <div className="flex gap-2">
          <button 
            // onClick={handleRefresh}
            disabled={isRefreshing}
            className={`bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm flex items-center gap-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={() => handleDownloadWithAuth('bulk')}
            disabled={selectedLogs.size === 0}
            className={`px-4 py-2 rounded text-sm flex items-center gap-2 ${
              selectedLogs.size === 0 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Download className="w-4 h-4" />
            Download ({selectedLogs.size})
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">
            Cancel
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-800 rounded">
        <table className="w-full">
          <thead className="bg-gray-750 sticky top-0">
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-sm">
                <input 
                  type="checkbox" 
                  className="rounded" 
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  disabled={logs.length === 0}
                />
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm">Id</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Filename</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Size</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 px-4 text-center text-gray-400">
                  {isRefreshing ? 'Scanning for log files...' : 'No log files available. Click Refresh to scan for logs.'}
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className={`border-b border-gray-700 hover:bg-gray-750 transition-colors ${
                    !log.exists ? 'opacity-50' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={selectedLogs.has(log.id)}
                      onChange={(e) => handleSelectLog(log.id, e.target.checked)}
                      disabled={!log.exists}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm">{log.id}</td>
                  <td className="py-3 px-4 text-sm font-mono text-blue-300">
                    {log.filename}
                  </td>
                  <td className="py-3 px-4 text-sm">{log.date}</td>
                  <td className="py-3 px-4 text-sm">{log.size}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={log.exists ? "text-green-400" : "text-red-400"}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDownloadWithAuth(log)}
                      disabled={!log.exists}
                      className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${
                        log.exists 
                          ? 'bg-blue-600 hover:bg-blue-500' 
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-3 h-3" />
                      {log.exists ? 'Download' : 'Missing'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogDownload;