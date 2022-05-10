import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import prisma from '../../lib/prisma';
import { ViewContext } from '../_app';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { category } from '../../utils/category';

import {
  BookCard,
  CatCard,
  SearchBar,
  MarqueeWrapper,
  Header,
} from '/src/components';

export default function Home({ data }) {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const [favourites, setFavourites] = useState([]);
  const { setItem, getItem } = useLocalStorage({});

  useEffect(() => {
    const booksLocalStorage = getItem({ key: 'fav-books' });
    setFavourites(booksLocalStorage);
  }, []);

  return (
    <div className={styles.main}>
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

      <h1 className={styles.title}>POPULAR TECH CATEGORIES</h1>
      <div className={styles.line} />
      <div className={styles.categories}>
        {category.map((cat) => (
          <CatCard
            key={cat?.id}
            img1={cat?.img1}
            img2={cat?.img2}
            img3={cat?.img3}
            title={cat?.title}
            link={cat?.link}
          />
        ))}
      </div>

      <h1 className={styles.title}>OTHER BOOKS CATEGORIES</h1>
      <div className={styles.line} />
      <div className={styles.categories}>
        <CatCard img1='/css1.png' img2='/css2.png' img3='/css3.png' />
        <CatCard img1='/css1.png' img2='/css2.png' img3='/css3.png' />
        <CatCard img1='/css1.png' img2='/css2.png' img3='/css3.png' />
        <CatCard img1='/css1.png' img2='/css2.png' img3='/css3.png' />
        <CatCard img1='/css1.png' img2='/css2.png' img3='/css3.png' />
        <CatCard img1='/css1.png' img2='/css2.png' img3='/css3.png' />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  //const res = await fetch(`https://api.itbook.store/1.0/search/de/1`);
  const res = await fetch(`https://api.itbook.store/1.0/new`);
  const data = await res.json();

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
      'X-RapidAPI-Key': 'c680d2ddabmsh84d9167c6748786p1f401fjsn82c5cb17e43b',
    },
  };

  // const suspense = await fetch(
  //   'https://hapi-books.p.rapidapi.com/week/suspense',
  //   options
  // );

  // const susData = await suspense.json();

  // console.log('sus -->', susData);
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
