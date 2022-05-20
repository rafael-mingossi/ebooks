import { useRouter } from 'next/router';

export function useLocalStorage() {
  const router = useRouter();
  const IS_BROWSER = typeof window !== 'undefined';
  const localStorage = IS_BROWSER ? window.localStorage : null;
  const storage = localStorage?.getItem('state');
  const setStorage = ({ storage }) => {
    localStorage?.setItem('state', JSON.stringify(storage));
  };

  const setItem = ({ key, value }) => {
    const state = localStorage?.getItem('state');
    const parsedState = JSON.parse(state ?? '{}');
    const newState = { ...parsedState, [`${key}`]: value };
    localStorage?.setItem('state', JSON.stringify(newState));
  };

  const setUserItem = ({ key, value }) => {
    const state = localStorage?.getItem('user');
    const parsedState = JSON.parse(state ?? '{}');
    const newState = { ...parsedState, [`${key}`]: value };
    localStorage?.setItem('user', JSON.stringify(newState));
  };

  const getItem = ({ key }) => {
    const state = localStorage?.getItem('state');
    const parsedState = JSON.parse(state ?? '{}');
    return parsedState?.[key];
  };

  const getUserItem = ({ key }) => {
    const state = localStorage?.getItem('user');
    const parsedState = JSON.parse(state ?? '{}');
    return parsedState?.[key];
  };

  const handleLogout = ({ key }) => {
    const state = localStorage?.getItem('user');
    const parsedState = JSON.parse(state ?? '{}');
    localStorage?.removeItem('user', key);
    router.push('/');
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    router.push('/');
  };
  return {
    storage,
    setStorage,
    setItem,
    getItem,
    handleLogout,
    setUserItem,
    getUserItem,
  };
}
