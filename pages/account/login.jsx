import { useState, useEffect, useContext } from 'react';
import { About, Login } from '/src/components';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ViewContext } from '../../pages/_app';

const LoginPage = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const { setItem, getItem } = useLocalStorage({});
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = getItem({ key: 'user' });
    // const userToken = getItem({ key: 'token' });
    if (loggedInUser) {
      router.push('/Home');
    }
  }, []);

  return (
    <div>
      <About />
      <Login />
    </div>
  );
};

export default LoginPage;
