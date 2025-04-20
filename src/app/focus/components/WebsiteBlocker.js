'use client';

import { useState, useEffect } from 'react';

export default function WebsiteBlocker({ onBlockTimeUpdate }) {
  const [blockedSites, setBlockedSites] = useState([]);
  const [newSite, setNewSite] = useState('');
  const [isBlocking, setIsBlocking] = useState(false);
  const [blockStartTime, setBlockStartTime] = useState(null);
  const [blockDuration, setBlockDuration] = useState(30); // Default 30 minutes
  const [showOverlay, setShowOverlay] = useState(false);
  const [bypassCount, setBypassCount] = useState(0);
  const [bypassUntil, setBypassUntil] = useState(null);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [activeFilters, setActiveFilters] = useState({
    adult: false,
    social: false,
    entertainment: false,
    gaming: false,
    shopping: false
  });
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategorySites, setNewCategorySites] = useState('');
  const [filteringMode, setFilteringMode] = useState('browser'); // 'browser', 'dns', 'vpn'
  const [isFilteringActive, setIsFilteringActive] = useState(false);
  const [filteringStatus, setFilteringStatus] = useState('inactive');
  const [filteringStats, setFilteringStats] = useState({
    blockedRequests: 0,
    totalRequests: 0,
    lastBlocked: null
  });

  // Predefined site lists for different categories
  const categorySites = {
    adult: [
      'pornhub.com', 'xvideos.com', 'redtube.com', 'youporn.com', 'xhamster.com',
      'brazzers.com', 'onlyfans.com', 'adultfriendfinder.com', 'ashleymadison.com'
    ],
    social: [
      'facebook.com', 'instagram.com', 'twitter.com', 'tiktok.com', 'snapchat.com',
      'pinterest.com', 'reddit.com', 'tumblr.com', 'linkedin.com'
    ],
    entertainment: [
      'youtube.com', 'netflix.com', 'hulu.com', 'disneyplus.com', 'hbomax.com',
      'amazon.com/primevideo', 'peacocktv.com', 'paramountplus.com', 'apple.com/tv'
    ],
    gaming: [
      'steam.com', 'epicgames.com', 'roblox.com', 'minecraft.net', 'ea.com',
      'ubisoft.com', 'playstation.com', 'xbox.com', 'nintendo.com'
    ],
    shopping: [
      'amazon.com', 'ebay.com', 'walmart.com', 'target.com', 'bestbuy.com',
      'etsy.com', 'aliexpress.com', 'wish.com', 'wayfair.com'
    ]
  };

  // DNS filter lists (simulated for mobile app)
  const dnsFilterLists = {
    adult: [
      'adult-content-filter.com', 'porn-filter.net', 'nsfw-dns-block.org',
      'adult-content-dns.com', 'restricted-content-filter.net'
    ],
    malware: [
      'malware-filter.com', 'phishing-dns-block.org', 'security-filter.net',
      'threat-block-dns.com', 'safe-browsing-filter.org'
    ],
    gambling: [
      'gambling-filter.com', 'betting-dns-block.org', 'casino-filter.net',
      'lottery-dns-block.com', 'gaming-restriction-filter.org'
    ]
  };

  useEffect(() => {
    let timer;
    if (isBlocking && blockStartTime) {
      timer = setInterval(() => {
        const currentElapsed = Math.floor((Date.now() - blockStartTime) / (1000 * 60));
        setElapsedMinutes(currentElapsed);
        
        if (currentElapsed >= blockDuration) {
          stopBlocking();
        } else {
          onBlockTimeUpdate(currentElapsed);
        }
      }, 60000); // Update every minute
    }
    return () => clearInterval(timer);
  }, [isBlocking, blockStartTime, blockDuration, onBlockTimeUpdate]);

  // Check if current site should be blocked
  useEffect(() => {
    if (isBlocking && typeof window !== 'undefined') {
      const currentHost = window.location.hostname;
      
      // Check manually added sites
      const manuallyBlocked = blockedSites.some(site => 
        currentHost.includes(site.replace('www.', '').toLowerCase())
      );
      
      // Check category-based blocking
      let categoryBlocked = false;
      
      // Check predefined categories
      Object.entries(activeFilters).forEach(([category, isActive]) => {
        if (isActive && categorySites[category]) {
          const isInCategory = categorySites[category].some(site => 
            currentHost.includes(site.replace('www.', '').toLowerCase())
          );
          if (isInCategory) categoryBlocked = true;
        }
      });
      
      // Check custom categories
      customCategories.forEach(category => {
        const sites = category.sites.split(',').map(site => site.trim());
        const isInCategory = sites.some(site => 
          currentHost.includes(site.replace('www.', '').toLowerCase())
        );
        if (isInCategory) categoryBlocked = true;
      });
      
      // Check if we're in a bypass period
      const isBypassed = bypassUntil && Date.now() < bypassUntil;
      
      if ((manuallyBlocked || categoryBlocked) && !isBypassed) {
        setShowOverlay(true);
        // Update filtering stats
        setFilteringStats(prev => ({
          ...prev,
          blockedRequests: prev.blockedRequests + 1,
          totalRequests: prev.totalRequests + 1,
          lastBlocked: currentHost
        }));
      } else {
        setShowOverlay(false);
        // Update filtering stats
        setFilteringStats(prev => ({
          ...prev,
          totalRequests: prev.totalRequests + 1
        }));
      }
    } else {
      setShowOverlay(false);
    }
  }, [isBlocking, blockedSites, bypassUntil, activeFilters, customCategories]);

  const addSite = () => {
    if (newSite && !blockedSites.includes(newSite)) {
      // Clean up the site name (remove http://, https://, www. etc.)
      const cleanSite = newSite
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '');
      
      setBlockedSites([...blockedSites, cleanSite]);
      setNewSite('');
    }
  };

  const removeSite = (site) => {
    setBlockedSites(blockedSites.filter(s => s !== site));
  };

  const toggleFilter = (category) => {
    setActiveFilters({
      ...activeFilters,
      [category]: !activeFilters[category]
    });
  };

  const addCustomCategory = () => {
    if (newCategory && newCategorySites) {
      setCustomCategories([
        ...customCategories,
        {
          name: newCategory,
          sites: newCategorySites
        }
      ]);
      setNewCategory('');
      setNewCategorySites('');
    }
  };

  const removeCustomCategory = (index) => {
    setCustomCategories(customCategories.filter((_, i) => i !== index));
  };

  const startBlocking = () => {
    setIsBlocking(true);
    setBlockStartTime(Date.now());
    setElapsedMinutes(0);
    onBlockTimeUpdate(0);
  };

  const stopBlocking = () => {
    setIsBlocking(false);
    setBlockStartTime(null);
    setShowOverlay(false);
  };

  const requestBypass = () => {
    // Allow 5 minutes of access
    const bypassTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    setBypassUntil(Date.now() + bypassTime);
    setBypassCount(prev => prev + 1);
    setShowOverlay(false);
    
    // Show a message about the bypass
    alert(`You've been granted 5 minutes of access. The block will resume after that.`);
    
    // Set a timer to re-enable the overlay
    setTimeout(() => {
      setBypassUntil(null);
      if (isBlocking) {
        setShowOverlay(true);
      }
    }, bypassTime);
  };

  const formatTimeLeft = () => {
    if (!blockStartTime) return '';
    
    const totalSeconds = blockDuration * 60;
    const elapsedSeconds = elapsedMinutes * 60;
    const remainingSeconds = totalSeconds - elapsedSeconds;
    
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Mobile app specific functions
  const activateDNSFiltering = () => {
    // In a real mobile app, this would configure the device's DNS settings
    // For this web app, we'll simulate the behavior
    setFilteringMode('dns');
    setIsFilteringActive(true);
    setFilteringStatus('active');
    
    // Show a notification about DNS filtering being activated
    alert('DNS filtering activated. This would configure your device to use our secure DNS servers in a mobile app.');
  };

  const activateVPNFiltering = () => {
    // In a real mobile app, this would set up a VPN configuration
    // For this web app, we'll simulate the behavior
    setFilteringMode('vpn');
    setIsFilteringActive(true);
    setFilteringStatus('active');
    
    // Show a notification about VPN filtering being activated
    alert('VPN filtering activated. This would set up a secure VPN connection in a mobile app.');
  };

  const deactivateFiltering = () => {
    setIsFilteringActive(false);
    setFilteringStatus('inactive');
    
    // Show a notification about filtering being deactivated
    alert('Content filtering deactivated.');
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Website Blocker</h2>
        
        {/* Mobile App Filtering Modes */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Mobile App Filtering</h3>
          <p className="text-sm text-gray-600 mb-4">
            In a mobile app, these options would enable system-level content filtering.
          </p>
          
          <div className="flex flex-col space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Current Mode:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                filteringStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {filteringStatus === 'active' ? filteringMode.toUpperCase() : 'Inactive'}
              </span>
            </div>
            
            <div className="flex justify-center space-x-2">
              <button
                onClick={activateDNSFiltering}
                disabled={isFilteringActive}
                className={`px-4 py-2 rounded-lg ${
                  isFilteringActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Activate DNS Filtering
              </button>
              
              <button
                onClick={activateVPNFiltering}
                disabled={isFilteringActive}
                className={`px-4 py-2 rounded-lg ${
                  isFilteringActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Activate VPN Filtering
              </button>
              
              <button
                onClick={deactivateFiltering}
                disabled={!isFilteringActive}
                className={`px-4 py-2 rounded-lg ${
                  !isFilteringActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Deactivate Filtering
              </button>
            </div>
          </div>
          
          {isFilteringActive && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium mb-2">Filtering Statistics</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-left">
                  <span className="text-gray-600">Blocked Requests:</span>
                  <span className="ml-2 font-medium">{filteringStats.blockedRequests}</span>
                </div>
                <div className="text-left">
                  <span className="text-gray-600">Total Requests:</span>
                  <span className="ml-2 font-medium">{filteringStats.totalRequests}</span>
                </div>
                <div className="text-left">
                  <span className="text-gray-600">Block Rate:</span>
                  <span className="ml-2 font-medium">
                    {filteringStats.totalRequests > 0
                      ? Math.round((filteringStats.blockedRequests / filteringStats.totalRequests) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-gray-600">Last Blocked:</span>
                  <span className="ml-2 font-medium">
                    {filteringStats.lastBlocked || 'None'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <input
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              placeholder="Enter website (e.g., facebook.com)"
              className="px-4 py-2 border rounded-lg w-64"
            />
            <button
              onClick={addSite}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Site
            </button>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            {[15, 30, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => setBlockDuration(mins)}
                className={`px-4 py-2 rounded-lg ${
                  blockDuration === mins
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        {/* Content Filtering Categories */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Content Filtering</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {Object.entries(activeFilters).map(([category, isActive]) => (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Custom Categories */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-medium mb-2">Custom Categories</h4>
            <div className="flex flex-col space-y-2 mb-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name (e.g., News)"
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                value={newCategorySites}
                onChange={(e) => setNewCategorySites(e.target.value)}
                placeholder="Sites (comma-separated, e.g., cnn.com, bbc.com)"
                className="px-4 py-2 border rounded-lg"
              />
              <button
                onClick={addCustomCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Category
              </button>
            </div>
            
            {customCategories.length > 0 && (
              <div className="space-y-2">
                {customCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                    <div>
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({category.sites.split(',').length} sites)
                      </span>
                    </div>
                    <button
                      onClick={() => removeCustomCategory(index)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Blocked Sites</h3>
          <div className="space-y-2">
            {blockedSites.map((site) => (
              <div key={site} className="flex items-center justify-center space-x-2">
                <span className="text-gray-700">{site}</span>
                <button
                  onClick={() => removeSite(site)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {!isBlocking ? (
            <button
              onClick={startBlocking}
              disabled={blockedSites.length === 0 && !Object.values(activeFilters).some(v => v) && customCategories.length === 0}
              className={`px-6 py-3 rounded-lg ${
                blockedSites.length === 0 && !Object.values(activeFilters).some(v => v) && customCategories.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Start Blocking
            </button>
          ) : (
            <button
              onClick={stopBlocking}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Stop Blocking
            </button>
          )}
        </div>
        
        {isBlocking && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">
              Blocking active for {elapsedMinutes} minutes
            </p>
            <p className="text-sm text-gray-500">
              Time remaining: {formatTimeLeft()}
            </p>
          </div>
        )}
      </div>
      
      {/* Blocking Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-6">
          <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Website Blocked</h3>
            <p className="text-gray-300 mb-6">
              This website is currently blocked to help you stay focused.
            </p>
            <div className="mb-6">
              <p className="text-gray-400">Time remaining: {formatTimeLeft()}</p>
              <p className="text-gray-400">Bypasses used: {bypassCount}</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={requestBypass}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Request 5-Minute Bypass
              </button>
              <button
                onClick={stopBlocking}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Stop Blocking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 