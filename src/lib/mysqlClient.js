// MySQL API Client Utility
const API_BASE_URL = import.meta.env.VITE_MYSQL_API_URL || 'http://localhost:5000/api/cms';

export const isMySqlConfigured = () => {
  return typeof API_BASE_URL === 'string' && API_BASE_URL.trim().length > 0;
};

export const fetchAllFromMySql = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/all`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data : null;
  } catch (err) {
    console.warn('[MySQL API] Error fetching all data:', err);
    return null;
  }
};

export const saveCmsSettingToMySql = async (key, value) => {
  try {
    const res = await fetch(`${API_BASE_URL}/setting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error(`[MySQL API] Error saving setting '${key}':`, err);
    return false;
  }
};

export const upsertItemToMySql = async (table, item) => {
  try {
    const res = await fetch(`${API_BASE_URL}/collection/${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error(`[MySQL API] Error upserting to '${table}':`, err);
    return false;
  }
};

export const deleteItemFromMySql = async (table, id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/collection/${table}/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error(`[MySQL API] Error deleting from '${table}':`, err);
    return false;
  }
};
