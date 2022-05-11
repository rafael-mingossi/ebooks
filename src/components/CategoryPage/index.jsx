import styles from './styles.module.scss';
import { BookCard } from '/src/components';
import { useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const Category = ({ category, url }) => {
  const [favourites, setFavourites] = useState([]);
  const { setItem, getItem } = useLocalStorage({});

  useEffect(() => {
    const booksLocalStorage = getItem({ key: 'fav-books' });
    setFavourites(booksLocalStorage);
  }, []);

  return (
    <div className={styles.cards}>
      {category?.books?.map((book, index) => (
        <BookCard
          key={index}
          img={book.image}
          title={book.title}
          // clicks={() => alert(index)}
          isbn13={book.isbn13}
          favourites={favourites}
          setFavourites={setFavourites}
          index={index}
          url={url}
        />
      ))}
    </div>
  );
};

export default Category;
