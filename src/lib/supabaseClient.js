import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Helper to check if valid credentials exist
export const isSupabaseConfigured = () => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    !supabaseUrl.includes('your-supabase-project') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0 &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  );
};

// Create Supabase Client instance
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null;

/**
 * Generic Supabase DB Helper for CMS Settings (JSON Key-Value)
 */
export const fetchCmsSettingFromSupabase = async (key, fallbackValue) => {
  if (!supabase) return fallbackValue;
  try {
    const { data, error } = await supabase
      .from('cms_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error || !data) return fallbackValue;
    return data.value;
  } catch (err) {
    console.warn(`[Supabase] Error fetching setting '${key}':`, err);
    return fallbackValue;
  }
};

export const saveCmsSettingToSupabase = async (key, value) => {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('cms_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

    if (error) {
      console.error(`[Supabase] Error saving setting '${key}':`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Save setting exception '${key}':`, err);
    return false;
  }
};

/**
 * Generic Supabase DB Helpers for Collections (Projects, Team, etc.)
 */
export const fetchCollectionFromSupabase = async (tableName, fallbackArray) => {
  if (!supabase) return fallbackArray;
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error || !data || data.length === 0) return fallbackArray;
    return data;
  } catch (err) {
    console.warn(`[Supabase] Error fetching collection '${tableName}':`, err);
    return fallbackArray;
  }
};

export const upsertItemToSupabase = async (tableName, item) => {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from(tableName)
      .upsert(item);

    if (error) {
      console.error(`[Supabase] Error upserting to '${tableName}':`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Exception upserting to '${tableName}':`, err);
    return false;
  }
};

export const deleteItemFromSupabase = async (tableName, id) => {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`[Supabase] Error deleting from '${tableName}':`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Exception deleting from '${tableName}':`, err);
    return false;
  }
};
