'use client';

import { useState } from 'react';
import VPNService from '../components/VPNService';
import Link from 'next/link';

export default function VPNPage() {
  const [vpnStatus, setVpnStatus] = useState('disconnected');
  const [connectedServer, setConnectedServer] = useState(null);

  const handleVPNStatusChange = (status, server) => {
    setVpnStatus(status);
    setConnectedServer(server);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">VPN Service</h1>
          <Link 
            href="/focus" 
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition-colors"
          >
            Back to Focus Tools
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">About Our VPN Service</h2>
          <p className="text-gray-700 mb-4">
            Our VPN service helps you maintain privacy and security while browsing the internet. 
            It encrypts your traffic and routes it through secure servers in different locations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Privacy Protection</h3>
              <p className="text-sm text-blue-700">Hide your IP address and protect your online identity</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Secure Connection</h3>
              <p className="text-sm text-green-700">Encrypt your data to prevent unauthorized access</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2">Global Access</h3>
              <p className="text-sm text-purple-700">Connect to servers in different countries</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">Important Note</h3>
            <p className="text-sm text-yellow-700">
              This is a simulated VPN service for demonstration purposes. In a production environment, 
              this would connect to actual VPN servers and provide real privacy protection.
            </p>
          </div>
        </div>

        <VPNService onStatusChange={handleVPNStatusChange} />

        {vpnStatus === 'connected' && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Connected to VPN</h2>
            <p className="text-gray-700 mb-4">
              You are currently connected to the VPN server in <strong>{connectedServer}</strong>. 
              Your internet traffic is now being routed through this server.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Tips for Using VPN</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Keep the VPN connected while browsing sensitive websites</li>
                <li>Use different servers based on your needs (speed vs. privacy)</li>
                <li>Remember that VPNs may slightly reduce your internet speed</li>
                <li>Consider using the VPN when on public Wi-Fi networks</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 