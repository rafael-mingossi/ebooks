import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './styles.module.scss';
import prisma from '../../lib/prisma';
import { ViewContext } from '../_app';
import {
  BookCard,
  MainHeader,
  SearchBar,
  MarqueeWrapper,
} from '/src/components';

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
    <div className={styles.main}>
      <MainHeader user={user} />

      <h1 className={styles.title}>LAST ADDED</h1>
      <MarqueeWrapper>
        {data?.books?.map((book, index) => (
          <div className={styles.marquee} key={index}>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <Link href={`book/${book.isbn13}`}>
              <img src={book.image} className={styles.img} />
            </Link>
          </div>
        ))}
      </MarqueeWrapper>

      <SearchBar placeholder='Enter a book title, ISBN' data={data} />

      <div className={styles.cards}>
        {data?.books?.map((book, index) => (
          <BookCard
            key={index}
            img={book.image}
            title={book.title}
            // clicks={() => alert(index)}
            isbn13={book.isbn13}
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
  //const res = await fetch(`https://api.itbook.store/1.0/search/de/1`);
  const res = await fetch(`https://api.itbook.store/1.0/new`);
  const data = await res.json();

  //console.log(data);
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
