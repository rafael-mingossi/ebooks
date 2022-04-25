import { useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './styles.module.scss';
import prisma from '../../lib/prisma';
import { ViewContext } from '../_app';
import { BookCard, MainHeader } from '/src/components';

export default function Home({ data }) {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const { setItem, getItem } = useLocalStorage({});
  const [favourites, setFavourites] = useState([]);

  const [token, setToken] = useState(getItem({ key: 'token' }));
  const [user, setUser] = useState(getItem({ key: 'user' }));

  useEffect(() => {
    const booksLocalStorage = getItem({ key: 'fav-books' });
    setFavourites(booksLocalStorage);
  }, []);

  return (
    <div>
      <MainHeader user={user} />

      <div className={styles.cards}>
        {data?.books?.map((book, index) => (
          <BookCard
            key={index}
            img={book.image}
            title={book.title}
            clicks={() => alert(index)}
            favourites={favourites}
            setFavourites={setFavourites}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/new`);
  const data = await res.json();

  // console.dir(data, { depth: null });

  // Pass data to the page via props
  return { props: { data } };
}

// export async function getServerSideProps({ req }) {
//   const book = await prisma.book.findMany({});
//   const users = await prisma.user.findMany({});

//   const books = book?.map((item) => ({
//     bookId: item?.bookId,
//     cover: item?.cover,
//     title: item?.title,
//     category: item?.category,
//     year: item?.year,
//   }));

//   //console.log(session);
//   return {
//     props: {
//       users: users,
//       books: books,
//     },
//   };
// }
