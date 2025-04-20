'use client';

import { useState, useEffect } from 'react';

export default function VPNService({ onStatusChange }) {
  const [vpnStatus, setVpnStatus] = useState('disconnected');
  const [selectedServer, setSelectedServer] = useState('us-east');
  const [connectionTime, setConnectionTime] = useState(0);
  const [dataTransferred, setDataTransferred] = useState({ up: 0, down: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [error, setError] = useState(null);

  // Available VPN servers
  const servers = [
    { id: 'us-east', name: 'US East', flag: '🇺🇸', load: 45 },
    { id: 'us-west', name: 'US West', flag: '🇺🇸', load: 62 },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', load: 38 },
    { id: 'japan', name: 'Japan', flag: '🇯🇵', load: 71 },
    { id: 'germany', name: 'Germany', flag: '🇩🇪', load: 29 },
    { id: 'singapore', name: 'Singapore', flag: '🇸🇬', load: 54 }
  ];

  // Connection timer
  useEffect(() => {
    let timer;
    if (vpnStatus === 'connected') {
      timer = setInterval(() => {
        setConnectionTime(prev => prev + 1);
        
        // Simulate data transfer
        setDataTransferred(prev => ({
          up: prev.up + Math.floor(Math.random() * 10),
          down: prev.down + Math.floor(Math.random() * 50)
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [vpnStatus]);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format data size
  const formatData = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  // Connect to VPN
  const connectVPN = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // In a real implementation, this would establish a WebRTC connection
      // or use a browser extension API to connect to a VPN server
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setVpnStatus('connected');
      setConnectionTime(0);
      setDataTransferred({ up: 0, down: 0 });
      
      // Notify parent component
      if (onStatusChange) {
        onStatusChange('connected', selectedServer);
      }
    } catch (err) {
      setError('Failed to connect to VPN server. Please try again.');
      console.error('VPN connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect from VPN
  const disconnectVPN = async () => {
    setIsDisconnecting(true);
    
    try {
      // In a real implementation, this would close the WebRTC connection
      // or use a browser extension API to disconnect from the VPN server
      
      // Simulate disconnection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVpnStatus('disconnected');
      
      // Notify parent component
      if (onStatusChange) {
        onStatusChange('disconnected', null);
      }
    } catch (err) {
      setError('Failed to disconnect from VPN server. Please try again.');
      console.error('VPN disconnection error:', err);
    } finally {
      setIsDisconnecting(false);
    }
  };

  // Change server
  const changeServer = (serverId) => {
    setSelectedServer(serverId);
    
    // If connected, disconnect and reconnect to the new server
    if (vpnStatus === 'connected') {
      disconnectVPN().then(() => {
        connectVPN();
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">VPN Service</h2>
      
      {/* Status indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full mr-2 ${
            vpnStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="font-medium">
            {vpnStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        {vpnStatus === 'connected' && (
          <div className="text-sm text-gray-600">
            Connected for: {formatTime(connectionTime)}
          </div>
        )}
      </div>
      
      {/* Server selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Select Server</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {servers.map(server => (
            <button
              key={server.id}
              onClick={() => changeServer(server.id)}
              className={`p-3 rounded-lg border text-left flex items-center justify-between ${
                selectedServer === server.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">{server.flag}</span>
                <span>{server.name}</span>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                server.load < 50 ? 'bg-green-100 text-green-800' :
                server.load < 75 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {server.load}% load
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Connection controls */}
      <div className="flex justify-center mb-6">
        {vpnStatus === 'disconnected' ? (
          <button
            onClick={connectVPN}
            disabled={isConnecting}
            className={`px-6 py-3 rounded-lg ${
              isConnecting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isConnecting ? 'Connecting...' : 'Connect to VPN'}
          </button>
        ) : (
          <button
            onClick={disconnectVPN}
            disabled={isDisconnecting}
            className={`px-6 py-3 rounded-lg ${
              isDisconnecting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        )}
      </div>
      
      {/* Data transfer stats */}
      {vpnStatus === 'connected' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Data Transfer</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Upload</div>
              <div className="font-medium">{formatData(dataTransferred.up)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Download</div>
              <div className="font-medium">{formatData(dataTransferred.down)}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Info message */}
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Note:</strong> This is a simulated VPN service for demonstration purposes.
          In a production environment, this would connect to actual VPN servers.
        </p>
        <p>
          For a real implementation, you would need to:
        </p>
        <ul className="list-disc pl-5 mt-1">
          <li>Set up VPN servers in different locations</li>
          <li>Implement WebRTC or use a browser extension API</li>
          <li>Handle secure tunneling of traffic</li>
          <li>Implement proper authentication and encryption</li>
        </ul>
      </div>
    </div>
  );
} 