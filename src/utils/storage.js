import { INITIAL_SERVERS } from '../data/mockData';

const STORAGE_KEYS = {
  SERVERS: 'crafthost_servers_v1',
  ACTIVE_SERVER_ID: 'crafthost_active_server_id_v1',
  LANG: 'crafthost_lang_v1'
};

export const getStoredServers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SERVERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SERVERS, JSON.stringify(INITIAL_SERVERS));
      return INITIAL_SERVERS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading servers from storage', err);
    return INITIAL_SERVERS;
  }
};

export const saveStoredServers = (servers) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVERS, JSON.stringify(servers));
  } catch (err) {
    console.error('Error saving servers to storage', err);
  }
};

export const getStoredActiveServerId = () => {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_SERVER_ID) || null;
};

export const setStoredActiveServerId = (id) => {
  if (id) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SERVER_ID, id);
  } else {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SERVER_ID);
  }
};

export const getStoredLang = () => {
  return localStorage.getItem(STORAGE_KEYS.LANG) || 'tr';
};

export const setStoredLang = (lang) => {
  localStorage.setItem(STORAGE_KEYS.LANG, lang);
};
