import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { Header, MainHeader, Footer } from '/src/components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

const Layout = ({ children }) => {
  const { setItem, getItem } = useLocalStorage({});
  const router = useRouter();

  const [token, setToken] = useState(getItem({ key: 'token' }));
  const [user, setUser] = useState(getItem({ key: 'user' }));
  useEffect(() => {
    setUser(getItem({ key: 'user' }));
  }, [router.pathname]);

  return (
    <div className={styles.container}>
      <Head>
        <title>All Library</title>
      </Head>
      {router.pathname === '/' ||
      router.pathname === '/account/login' ||
      router.pathname === '/account/register' ? (
        <Header />
      ) : (
        <MainHeader user={user} />
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
