// Cloud Sync Service: Synchronizes Owner changes (Photo, College Logo, Bio, Settings)
// across all devices (Mobile Phones, Tablets, Laptops) in real-time.

const CLOUD_SYNC_URL = 'https://api.jsonstorage.net/v1/json';
const CLOUD_KEY = 'shishir_portfolio_cloud_sync_state';
const LOCAL_CACHE_KEY = 'shishir_cloud_synced_data';

export interface SyncedPortfolioData {
  ownerPhoto?: string;
  collegeLogo?: string;
  bioAnnouncement?: string;
  lastUpdated: number;
  author: string;
}

// In-memory cache
let cachedData: SyncedPortfolioData | null = null;
const syncListeners: Array<(data: SyncedPortfolioData) => void> = [];

export function subscribeCloudSync(listener: (data: SyncedPortfolioData) => void): () => void {
  syncListeners.push(listener);
  if (cachedData) {
    listener(cachedData);
  }
  return () => {
    const idx = syncListeners.indexOf(listener);
    if (idx !== -1) syncListeners.splice(idx, 1);
  };
}

function notifyListeners(data: SyncedPortfolioData) {
  cachedData = data;
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota limits
  }
  syncListeners.forEach((fn) => fn(data));
}

// Initialize from local cache immediately so UI is instant
if (typeof window !== 'undefined') {
  try {
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    if (cached) {
      cachedData = JSON.parse(cached);
    }
  } catch {
    // Ignore parse errors
  }
}

// Fetch latest cloud state on startup
export async function pullCloudSync(): Promise<SyncedPortfolioData | null> {
  if (typeof window === 'undefined') return null;

  try {
    const binId = localStorage.getItem('shishir_cloud_bin_id') || 'shishir-pokhrel-v1';
    const res = await fetch(`https://kvdb.io/2L2G6C28L9P2t37n7K62b7/${binId}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const data: SyncedPortfolioData = await res.json();
      if (data && data.lastUpdated) {
        notifyListeners(data);
        return data;
      }
    }
  } catch (err) {
    // Silent fallback to local storage
  }
  return cachedData;
}

// Push latest updates to cloud so all other devices receive them
export async function pushCloudSync(updates: Partial<SyncedPortfolioData>): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const current: SyncedPortfolioData = {
    ...cachedData,
    ...updates,
    lastUpdated: Date.now(),
    author: 'Shishir Pokhrel',
  };

  notifyListeners(current);

  try {
    const binId = localStorage.getItem('shishir_cloud_bin_id') || 'shishir-pokhrel-v1';
    const res = await fetch(`https://kvdb.io/2L2G6C28L9P2t37n7K62b7/${binId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(current),
    });
    return res.ok;
  } catch (err) {
    console.warn('Cloud sync push offline, cached locally', err);
    return false;
  }
}
