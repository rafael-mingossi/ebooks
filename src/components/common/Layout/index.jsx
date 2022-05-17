import styles from './styles.module.scss';
import { useState, useEffect, useContext } from 'react';
import { Header, MainHeader, Footer } from '/src/components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { ViewContext } from '../../../../pages/_app';

const Layout = ({ children }) => {
  const { setItem, getItem } = useLocalStorage({});
  const [viewContext, setViewContext] = useContext(ViewContext);
  const router = useRouter();

  const [token, setToken] = useState(getItem({ key: 'token' }));
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(viewContext?.user);
    // setUser(getItem({ key: 'user' }));
  }, [router.pathname, children]);

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
